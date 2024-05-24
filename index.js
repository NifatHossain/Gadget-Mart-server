let mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nifatassignment2'
});
connection.connect(
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('success');
        }
    }
);
// hello world