var express = new require('express');
var app = express();
var mysql = new require('mysql');
// var port = 8080;
// var path = new require('path');


// const sequelize = require('./sequelize');
// const Customer = require('./models/Customer');
// const Shipper = require('./models/Shipper');
// const Product = require('./models/Product');
// sequelize.sync({ force: true }) // `force: true` sẽ xóa bảng cũ và tạo lại
//     .then(() => {
//         console.log('Database & tables created!');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

// async function migrate() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection successfully.');

//         await sequelize.sync({ force: true });
//         console.log('All models were synchronized successfully.');
//     } catch (error) {
//         console.error('Unconnect to the database:', error);
//     } finally {
//         await sequelize.close();
//     }
// }

// migrate();


var con = mysql.createConnection({
    host: 'localhost',
    user: 'thien',
    password: 'thienhuu098',
    database: 'mydb'
});
// con.connect(function (err) {
//     if (err) throw err;
//     console.log('Connected!');
// });


async function createTable() {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'thien',
        password: 'thienhuu098',
    });


    try {
        //tạo databse
        // await con.query('CREATE DATABASE IF NOT EXISTS mydb');
        //chọn database
        await con.query('USE mydb');
        // Tạo bảng Customers
        await con.query(
            `CREATE TABLE IF NOT EXISTS Customers (
                Id INT AUTO_INCREMENT PRIMARY KEY,
                Name NVARCHAR(50),
                ContactName NVARCHAR(50),
                Country NVARCHAR(50)
            )`);

        // Tạo bảng Shippers
        await con.query(
            `CREATE TABLE IF NOT EXISTS Shippers (
                Id INT AUTO_INCREMENT PRIMARY KEY,
                Name NVARCHAR(50)
            )`);

        // Tạo bảng Products
        await con.query(
            `CREATE TABLE IF NOT EXISTS Products (
                Id INT AUTO_INCREMENT PRIMARY KEY,
                Name NVARCHAR(50),
                UnitPrice BIGINT
            )`);

        // Tạo bảng Orders
        await con.query(
            `CREATE TABLE IF NOT EXISTS Orders (
                Id INT AUTO_INCREMENT PRIMARY KEY,
                CustomerId INT,
                OrderDate DATE,
                ShipperId INT,
                FOREIGN KEY (CustomerId) REFERENCES Customers(Id),
                FOREIGN KEY (ShipperId) REFERENCES Shippers(Id)
            )`);

        // Tạo bảng OrderDetails
        await con.query(
            `CREATE TABLE IF NOT EXISTS OrderDetails (
                Id INT AUTO_INCREMENT PRIMARY KEY,
                OrderId INT,
                ProductId INT,
                Quantity INT,
                Price BIGINT,
                FOREIGN KEY (OrderId) REFERENCES Orders(Id),
                FOREIGN KEY (ProductId) REFERENCES Products(Id)
            )`);

        console.log('Đã tạo table!');
    } catch (err) {
        console.error('Lỗi: ', err);
    } finally {
        await con.end();
    }

}


async function insertData() {
    var sql = "INSERT INTO customers (ID, name, ContactName, Country) VALUES ('12', 'Huy', 'NguyenHuy', 'vietnam')";
    await con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
    con.end();
}

async function selectData() {
    con.query("SELECT * FROM customers", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    con.end();
}

// createTable();
// insertData();
selectData();

// app.get('/', function (req, res) {
//     // res.send('Hello World!');
//     res.sendFile(path.join(__dirname + '/demo.html'));
// });

// var server = app.listen(port, function () {
//     console.log('Server listening on http://localhost:' + port);
// });
