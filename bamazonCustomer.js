var inquirer = require("inquirer");
var mySQL = require("mysql");
var env = require("dotenv").config();
var chalk = require("chalk");

var connection = mySQL.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQL_PSWD,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    queryAllproducts();
});

function queryAllproducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log(chalk.red("--------------Welcome to Bamazon--------------"));
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].price);
        }
        console.log(chalk.red("---------------------------------------------"));

        askUser();
    });
}

function askUser() {
    var total;
    var quantity;
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What item would you like to purchase?\nEnter id number:",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "amount",
            type: "input",
            message: "How many would you like?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answer) {
        connection.query("SELECT id, price, stock_quantity FROM products WHERE id = " + answer.id, function (err, res) {
            if (err) throw err;
            quantity = res[0].stock_quantity;
            var p = res[0].price;
            total = p * answer.amount;

        });
        var updateP = [
            "UPDATE products",
            "SET stock_quantity = stock_quantity - ?",
            "WHERE id = ?"
        ].join(" ");
        connection.query(updateP, [answer.amount, answer.id],
            function (error) {
                if (error) throw error;
                if (quantity > 0) {
                    console.log("Your order is placed.\nYour total is: " + total);
                    connection.end();
                } else {
                    console.log("Sold Out");
                    connection.end();
                }
            }
        );
    });

}
