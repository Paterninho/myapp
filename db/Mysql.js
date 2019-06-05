const mysql = require('mysql');
var express = require('express');
var app = express.Router();
var optionConection = {
  // host     : '10.3.79.235',
  // user     : 'datasaude',
  // password : 'sau09*123data',
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'datasaude'
};
var results;
function execSQLQuery(sqlQry){
  const connection = mysql.createConnection(optionConection);

  return new Promise((resolve, reject)=>{
    connection.query(sqlQry, (err, results)=>{
      if (err){
        return reject(err);
      }
      resolve(results);
    });
  });

  
}

function getAllTables(typeGraph, res){
  var tables = "";
  var sql = " Select ";
  var where = "";
  if (typeGraph == 'pie'){
    var query = 'select a.bitos as "10a14" from DataSus_Pie_Idade_Obito_10a14_2013_convertido a where Regio = "Total"';
    execSQLQuery(query).then((results)=> {console.log(results); res.json(results)}).catch((err)=> {res.json(err)}); 
  } else {
    var query = 'SELECT a.table_name as "F", '+
    'b.table_name as "M", '+
 'SUBSTRING(a.table_name, 41, 4) as "anos" '+
'FROM information_schema.tables a, '+
    'information_schema.tables b '+
'WHERE a.table_schema = "datasaude" '+
' and a.table_schema = b.table_schema'+
' and a.table_name like "%fem%"'+
' and b.table_name like "%mas%"'+
 ` and a.table_name like "%${typeGraph == 'columns' ? 'line' : typeGraph}%"`+
` and b.table_name like "%${typeGraph == 'columns' ? 'line' : typeGraph}%"`+
' and SUBSTRING(a.table_name, 41, 4) = SUBSTRING(b.table_name, 41, 4)';
  }

  
  execSQLQuery(query).then(function(results){
    for (const i of results) {
     if (typeGraph == 'line'){
      if (results.indexOf(i) != 0){
        sql += ", ";
        where += " and ";
      }
       sql += `ROUND(sum((a${results.indexOf(i)}.bitos / a${results.indexOf(i)}.Dias_permanncia) * 100), 2) as "M${results.indexOf(i)}", ROUND(sum((b${results.indexOf(i)}.bitos / b${results.indexOf(i)}.Dias_permanncia) * 100), 2) as "F${results.indexOf(i)}"`
       where += ` a${results.indexOf(i)}.Regio = "Total"`
      }
    if (typeGraph == 'columns'){
      if (results.indexOf(i) != 0){
        sql += ", ";
        where += " and ";
      }
       sql += `a${results.indexOf(i)}.Regio, a${results.indexOf(i)}.bitos as "M${results.indexOf(i)}", b${results.indexOf(i)}.bitos as "F${results.indexOf(i)}"`
       where += ` a${results.indexOf(i)}.Regio = "Total"`
      }
  
    }
    sql += " from "+ tables + " where "+ where;
    console.log(typeGraph + " " + sql)
    execSQLQuery(sql).then((results)=> {console.log(results); res.json(results)}).catch((err)=> {res.json(err)}); 
  });
}

app.post('/column', function(req, res) {
  getAllTables('columns', res);
})

app.post('/line', function(req, res) {
  getAllTables('line', res);
})

app.post('/pie', function(req, res) {
  getAllTables('pie', res);
})

module.exports = app;