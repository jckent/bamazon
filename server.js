var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
	host:"localhost",
	PORT:3306,
	user:"root",
	password:"W3stw00d0n3!",
	database:"bamazon"
});

connection.connect(function(err){
	if(err)throw err;
	console.log("connected as id" + connection.threadId);
});

var displayProducts = function(){
	var query = "Select * FROM products";
	connection.query(query, function(err, res){
		if(err) throw err;
		var displayTable = new Table ({
			head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
			colWidths: [10,25,25,10,15]
		});
		for(var i = 0; i < res.length; i++){
			displayTable.push(
				[res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
		}
		console.log(displayTable.toString());
		purchasePrompt();
	});
}

function purchasePrompt(){
	inquirer.prompt([
	{
		name: "ID",
		type: "input",
		message:"What item do you want to buy (enter ID)?",
		filter:Number
	},
	{
		name:"Quantity",
		type:"input",
		message:"How many?",
		filter:Number
	},

 ]).then(function(answers){
 	var quantityRequested = answers.Quantity;
 	var IDrequested = answers.ID;
 	purchaseOrder(IDrequested, quantityRequested);
 });
};

function purchaseOrder(ID, amtNeeded){
	connection.query('Select * FROM products WHERE item_id = ' + ID, function(err,res){
		if(err){console.log(err)};
		if(amtNeeded <= res[0].stock_quantity){
			var totalCost = res[0].price * amtNeeded;
			console.log("Your order is ready to go!");
			console.log("Your total for: " + amtNeeded + " " +res[0].product_name + " is " + totalCost + " and all of your privacy!");

			connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amtNeeded + "WHERE item_id = " + ID);
		} else{
			console.log("We don't have enough of those in stock. Pease try real Amazon instead.");
		};
		displayProducts();
	});
};

displayProducts();