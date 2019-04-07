var mysql = require("mysql");
var prompt = require('prompt');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});


    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    queryAllProducts();
  });


  function  queryAllProducts() {  
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }
  
  function buyProducts() {
    prompt.start();
    prompt.get([{
       name: 'productID',
       required: true
    }}
    ], function (err, result) {

  }