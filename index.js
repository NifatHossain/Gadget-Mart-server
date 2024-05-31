let mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "gadget_mart",
});
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("success");
  }
});

//create functions
app.post("/adduser", function (req, res) {
  console.log("here-----");

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  console.log("user", user);

  connection.query(
    `INSERT INTO users (name, email, user_pass) VALUES ('${user.name}','${user.email}', '${user.password}');`,
    function (err, result) {
      if (err) {
        console.log("err", err);
        // res.json({
        //     error: err.sqlMessage,
        // })
        res.send(err);
      } else {
        console.log("result", result);
        res.json({
          result: result,
        });
      }
    }
  );
});
app.post("/addnewphone", function (req, res) {
  console.log("here-----");

  const phoneData = {
    productModel: req.body.productModel,
    productBrand: req.body.productBrand,
    productImage: req.body.productImage,
    productPrice: req.body.productPrice,
    network: req.body.network,
    sim: req.body.sim,
    displayType: req.body.displayType,
    displaySize: req.body.displaySize,
    displayResolution: req.body.displayResolution,
    os: req.body.os,
    chipset: req.body.chipset,
    memory: req.body.memory,
    rearCamera: req.body.rearCamera,
    selfieCamera: req.body.selfieCamera,
    battery: req.body.battery,
    sensors: req.body.sensors,
    adminEmail: req.body.adminEmail,
  };

  console.log("phonedata:", phoneData);
  const sql = `INSERT INTO phones (productModel,productBrand,productImage,productPrice,network,sim,displayType,displaySize,displayResolution,os,chipset,memory,rearCamera,selfieCamera,battery,sensors,adminEmail) VALUES ('${phoneData.productModel}','${phoneData.productBrand}','${phoneData.productImage}','${phoneData.productPrice}','${phoneData.network}','${phoneData.sim}','${phoneData.displayType}','${phoneData.displaySize}','${phoneData.displayResolution}','${phoneData.os}','${phoneData.chipset}','${phoneData.memory}','${phoneData.rearCamera}','${phoneData.selfieCamera}','${phoneData.battery}','${phoneData.sensors}','${phoneData.adminEmail}')`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.post("/addcurrentuser", function (req, res) {
  console.log("here-----");

  const user = {
    email: req.body.email,
  };

  console.log("user", user);

  var sql = `delete from currentuser`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    // console.log(result)
    res.send(result);
  });

  connection.query(
    `INSERT INTO currentuser(email) VALUES ('${user.email}');`,
    function (err, result) {
      if (err) {
        console.log("err", err);
        res.json({
          error: err.sqlMessage,
        });
      } else {
        console.log("result", result);
        // res.json({
        //     result: result,

        // })
      }
    }
  );
});

app.get("/allusers/:email", function (req, res) {
  const email = req.params.email;

  var sql = `select * from users where email='${email}'`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    // console.log(res)
    res.send(result);
  });

  // })
});

//Api to find admin by email
app.get("/admins/:email", function (req, res) {
  const email = req.params.email;

  var sql = `select * from admins where email='${email}'`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    // console.log(res)
    res.send(result);
  });

  // })
});
//ApI to get all phones from db
app.get("/allphones", function (req, res) {
  var sql = "select * from phones";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error);
    }
    // console.log(res)
    res.send(result);
  });
});
//API to get a phone by its id
app.get("/allphones/:id", (req, res) => {
  const reqId = req.params.id;
  const sql = `select * from phones where id=${reqId}`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

//seving orders in mysql
app.post("/allorders", (req, res) => {
  const productId = req.body.productId;
  const productBrand = req.body.productBrand;
  const productModel = req.body.productModel;
  const productPrice = req.body.productPrice;
  const userEmail = req.body.userEmail;
  const sql = `insert into orders (productId, productBrand, productModel, productPrice, customerEmail) values('${productId}','${productBrand}','${productModel}','${productPrice}','${userEmail}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/addnewwatch', function (req, res) {
    console.log("here-----");

    const watchData = {
        productModel:req.body.productModel,
        productBrand:req.body.productBrand,
        productImage:req.body.productImage,
        productPrice:req.body.productPrice,
        callingFeature:req.body.callingFeature,
        chargingTime:req.body.chargingTime,
        displayDetails:req.body.displayDetails,
        waterProof:req.body.waterProof,
        batteryLife:req.body.batteryLife,
        os:req.body.os,
        features:req.body.features,
        sensors:req.body.sensors,
        adminEmail:req.body.adminEmail
    };

    console.log("watchdata:", watchData);
    const sql= `INSERT INTO watches (productModel,productBrand,productImage,productPrice,callingFeature,chargingTime,displayDetails,waterProof,batteryLife,os,sensors,features,adminEmail) VALUES ('${watchData.productModel}','${watchData.productBrand}','${watchData.productImage}','${watchData.productPrice}','${watchData.callingFeature}','${watchData.chargingTime}','${watchData.displayDetails}','${watchData.waterProof}','${watchData.batteryLife}','${watchData.os}','${watchData.sensors}','${watchData.features}','${watchData.adminEmail}')`
    connection.query(sql,(error,result)=>{
        if(error){
            console.log(error)
        }
        res.send(result)
    })
        
    // })
});



app.listen(3000);


