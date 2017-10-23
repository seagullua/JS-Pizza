/**
 * Created by chaika on 02.02.16.
 */
var fs = require('fs');
var ejs = require('ejs');


exports.PizzaMenu_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/PizzaMenu_OneItem.ejs', "utf8"));

exports.PizzaCart_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/PizzaCart_OneItem.ejs', "utf8"));

exports.Orders = ejs.compile(fs.readFileSync('./Frontend/templates/Orders.ejs', "utf8"));

exports.EmptyCart = ejs.compile(fs.readFileSync('./Frontend/templates/EmptyCart.ejs', "utf8"));

exports.GeneralSum = ejs.compile(fs.readFileSync('./Frontend/templates/GeneralSum.ejs', "utf8"));

exports.PizzaCount = ejs.compile(fs.readFileSync('./Frontend/templates/PizzaCount.ejs', "utf8"));

exports.PizzaName = ejs.compile(fs.readFileSync('./Frontend/templates/PizzaName.ejs', "utf8"));

exports.PizzaMenu = ejs.compile(fs.readFileSync('./Frontend/templates/PizzaMenu.ejs', "utf8"));