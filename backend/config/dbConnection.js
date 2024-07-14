const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Database connection established, DATABASE NAME '${db.connection.name}'`)
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;