const mongoose = require('mongoose');

 const connectdb= mongoose.connect('mongodb+srv://amirmajeed:Amir4905@cluster0.rnpnmd2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ MongoDB Connected Successfully');
}).catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
});

module.exports = connectdb;
