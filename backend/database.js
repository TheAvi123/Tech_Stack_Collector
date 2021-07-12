var mongoose = require('mongoose');

require('dotenv').config();

const connectionString = process.env.TSC_DB_URI;

class Database {
    constructor() {
        this.connectToDB();
    }

    connectToDB() {
        console.log("Attempting to connect to DB...");
        mongoose.connect(
            connectionString
        ).then(() => {
            console.log("Successfully connected to DB!")
        }).catch(err => {
            console.log("Failed to establish connection to DB.")
            console.log(err);
        });
    }
}

module.exports = new Database();