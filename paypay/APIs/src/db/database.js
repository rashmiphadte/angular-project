const mongoose = require('mongoose');
const config = require("../config");

const connectionUrl = 'mongodb://' + config.database.host + ':' + config.database.port + '/' + config.database.database;

mongoose.connect(connectionUrl, {
    useNewUrlParser: true
}).then((res) => {
    return console.log("connected to database")
}).catch((error) => {
    console.error(error);
    return process.exit();
})