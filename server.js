require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// Middleware imports
const verifyToken = require("./middleware/jwtMiddleware");
const db = require("./config/db");

// Connect to MongoDB
db();

// Set up the JWT authentication middleware
app.use(cookieParser());

// Middleware to set `res.locals.user` globally, based on the token
app.use((req, res, next) => {
  const token = req.cookies.token;  // Access token from cookies
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Use environment variable for secret
      res.locals.user = decoded;  // Set the user in res.locals for all views
    } catch (err) {
      res.locals.user = null;  // If token is invalid, set user to null
    }
  } else {
    res.locals.user = null;  // If no token, set user to null
  }
  next();
});


// Set up views
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Import routes
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');
const postRoutes = require("./routes/postRoutes");
const contactRoutes = require("./routes/contact.js");
const searchRoutes = require("./routes/search.js");

// Routes
app.use('/', userRoutes);
app.use('/', teamRoutes);
app.use('/', postRoutes);

// Public Pages
app.get("/", (req, res) => res.render("index", { user: res.locals.user }));  // Pass user to view
app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));

// Home Page: Fetch All Posts
const Post = require("./models/postModel");
const User = require("./models/userModel");

app.get("/", async (req, res) => {
  // Fetch posts or any other data you want to render
  res.render("index", { user: res.locals.user });
});

app.get('/about', (req, res) => {
  res.render('about', { user: res.locals.user });
});

app.get('/team', (req, res) => {
  res.render('team', { user: res.locals.user });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.use("/", contactRoutes);

// User list route
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.render("user", { users });
});

app.use("/", searchRoutes);

// Logo page
app.get("/logo", async (req, res) => {
  res.render("logo");
});

// Catch-all for 404 errors
app.use((req, res) => {
  res.status(404).render("404");
});

// Start the server
app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
