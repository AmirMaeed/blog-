const mongoose = require("mongoose");
require("dotenv").config(); // Load .env file

const connectDB = async () => {
    try {
        await mongoose.connect(const mongoose = require('mongoose');

 const connectdb= mongoose.connect('mongodb+srv://amirmajeed:Amir4905@cluster0.rnpnmd2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ MongoDB Connected Successfully');
}).catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
});

module.exports = connectdb;I, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
