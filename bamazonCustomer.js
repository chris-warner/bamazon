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


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    queryAllProducts();
});


function queryAllProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}

function buyProducts() {
    prompt.start();

    prompt.get([{
        name: 'product_ID',
        required: true
    }, {
        name: 'Units',
        hidden: false,
        required: true
    }], function (err, result) {
        console.log('Command-line input received:');
        console.log('  product_ID: ' + result.product_ID);
        console.log('  Units: ' + result.Units);
    });
}

buyProducts();