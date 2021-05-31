const database = require('./database');
const files = require('./constants')
config = (() => {
    class config {
        constructor() {}
    }
    let environment = process.env.NODE_ENV === void 0 ? 'local' : process.env.NODE_ENV;
    config.database = {
        host: database[environment].host,
        port: database[environment].port,
        database: database[environment].database
    }

    config.files_path = {
        upload_path: files[environment].upload_path,
        profile_path: files[environment].profile_path
    }

    config.credentials = {
        secret: files[environment].secret
    }
    return config;
}).call(this)

module.exports = config