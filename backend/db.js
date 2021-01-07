// const mysql = require('mysql');
// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_ROOT_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
//   port: process.env.MYSQL_PORT
// });
// exports.pool = pool;

const mongoose = require("mongoose");
var mongoDB = 'mongodb://localhost:27017/UserLogDB';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', function(){
  console.log('MongoDB connection error');
});
db.once('open', function(){
  console.log('Connected!');
});
module.exports = mongoose;