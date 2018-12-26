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
    askUser();
});

function askUser() {
    inquirer.prompt({
        name: "Menu",
        type: "list",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "Exit"
        ]
    }).then(function (answer) {
        switch (answer.Menu) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLow();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            case "Exit":
                connection.end();
                break;
        }
    });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {

        console.log(chalk.red("--------------Products for Sale--------------"));
        console.log("id | product name | price | quantity\n");

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }

        console.log(chalk.red("---------------------------------------------"));

        askUser();
    });
}

function viewLow() {
    connection.query("SELECT id, product_name, stock_quantity FROM products WHERE stock_quantity BETWEEN 0 AND 5", function (err, res) {

        console.log(chalk.red("--------------Low Inventory--------------"));
        console.log("id | product name | quantity\n");

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].stock_quantity);
        }

        console.log(chalk.red("---------------------------------------------"));

        askUser();
    });
}

function addInventory() {
    connection.query("SELECT id, product_name, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        console.log(chalk.red("--------------Update Inventory--------------"));
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].stock_quantity);
        }
        console.log(chalk.red("---------------------------------------------"));
        updatePrompt();
    });
}

function updatePrompt() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What item would you like to update?\nEnter id number:",
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
            message: "How many would you like to add?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answer) {
        var updateP = [
            "UPDATE products",
            "SET stock_quantity = stock_quantity + ?",
            "WHERE id = ?"
        ].join(" ");

        connection.query(updateP, [answer.amount, answer.id],
            function (err) {
                if (err) throw err;
                console.log("Product has been udated.");
                askUser();
            });
    });
}

function addProduct() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter name of product you would like to add:",
        },
        {
            name: "department",
            type: "input",
            message: "Enter department name:",
        },
        {
            name: "price",
            type: "input",
            message: "Enter price:",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "Enter stock quantity:",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answer) {
        var addP = [
            "INSERT INTO products(product_name, department_name, price, stock_quantity)",
            "VALUES(?, ?, ?, ?)",
        ].join(" ");
        connection.query(addP, [answer.name, answer.department, answer.price, answer.quantity], function (err) {
            if (err) throw err;
            console.log("Product has been added.");
            askUser();
        });
    });
}