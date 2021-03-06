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
    });
}


function queryItemID(id, quantity) {
    var query = connection.query("SELECT * FROM products WHERE item_id=?", [id], function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
            if (quantity > res[i].stock_quantity) {
                console.log("Insuffiecient quantity!");
            }
            if (quantity <= res[i].stock_quantity) {
                let newQuanity = res[i].stock_quantity - quantity;
                console.log("remaining product: " + newQuanity);
                console.log("Sufficient quantity, your order was successfully placed!");
                console.log("ORDER DETAILS");
                connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity: newQuanity},{item_id: res[i].item_id]);
                console.log("Your order comes out to : $" + (res[i].price * quantity));
            }
        }
        connection.end();
    });
}

function buyProducts() {
    let order_product_ID;
    let order_units;
    prompt.start();
    prompt.get([{
        name: 'product_ID',
        required: true
    }, {
        name: 'Units',
        required: true
    }], function (err, result) {
        order_product_ID = result.product_ID;
        order_units = result.Units;
        console.log('Order details:');
        console.log('  product_ID requested: ' + result.product_ID);
        console.log('  Units requested: ' + result.Units);
        queryItemID(order_product_ID, order_units);
    });
}
buyProducts();