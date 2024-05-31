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
    database: 'gadget_mart'
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

app.post('/adduser', function (req, res) {
    console.log("here-----");

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    console.log("user", user);

    connection.query(`INSERT INTO users (name, email, user_pass) VALUES ('${user.name}','${user.email}', '${user.password}');`,
        function (err, result) {
            if (err) {
                console.log("err", err);
                // res.json({
                //     error: err.sqlMessage,
                // })
                res.send(err)
            } else {
                console.log("result", result);
                res.json({
                    result: result,

                })
            }
        }
    );
})

app.post('/addcurrentuser', function (req, res) {
    console.log("here-----");

    const user = {
        email: req.body.email
    };

    console.log("user", user);

    var sql= `delete from currentuser`;
        connection.query(sql,(error,result)=>{
            if(error){
                console.log(error)
            }
            // console.log(result)
            res.send(result)
        })

    connection.query(`INSERT INTO currentuser(email) VALUES ('${user.email}');`,
        function (err, result) {
            if (err) {
                console.log("err", err);
                res.json({
                    error: err.sqlMessage,
                })
            } else {
                console.log("result", result);
                // res.json({
                //     result: result,

                // })
            }
        }
    );
})

app.get('/allusers/:email', function (req, res) {
    const email= req.params.email;
    
    var sql= `select * from users where email='${email}'`;
    connection.query(sql,(error,result)=>{
        if(error){
            console.log(error)
        }
        // console.log(res)
        res.send(result)
    })
        
    // })
});

//Api to find admin by email
app.get('/admins/:email', function (req, res) {
    const email= req.params.email;
    
    var sql= `select * from admins where email='${email}'`;
    connection.query(sql,(error,result)=>{
        if(error){
            console.log(error)
        }
        // console.log(res)
        res.send(result)
    })
        
    // })
});



app.listen(3000);

