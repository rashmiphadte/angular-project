const express = require('express')
const app = express()
const fs = require("fs")
var cors = require('cors')
const port = process.env.PORT || 3003


router = require('./routes/')(app);
require("./db/database")

const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(express.json())
app.use(cors())
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})