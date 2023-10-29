const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async ()=>{
    try{
        await mongoose.connect(db);
        console.log('MongoDB connected which is hosted by Mr Udai')

    } catch(err){
        console.error(err.message);
        // Exit process failure..
        process.exit(1);
    }
}

module.exports = connectDB;