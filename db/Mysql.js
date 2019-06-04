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
app.post('/column', function(req, res) {
  
  function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection(optionConection);
    
    connection.query(sqlQry, function(error, results, fields){
      if(error){
        res.json(error);
      }else{
        res.json(results);
        console.log(results);
        connection.end();
      }
        
    });

  }
  execSQLQuery('SELECT a.Regio, a.bitos as "M", b.bitos as "F" FROM DataSus_Line_Ano_Obitos_Mas_TodasIdades_2013_convertido a JOIN DataSus_Line_Ano_Obitos_Fem_TodasIdades_2013_convertido b ON (a.Regio = b.Regio) where a.Regio <> "Total";', res); 
})

app.post('/geo', function(req, res) {
  
  function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection(optionConection);
    
    connection.query(sqlQry, function(error, results, fields){
      if(error){
        res.json(error);
      }else{
        res.json(results);
        console.log(results);
        connection.end();
      }
        
    });

  }
  execSQLQuery('select regio, Taxa_mortalidade,Mdia_permanncia from DataSus_Geo_TM_Regiao_MDP_TodasIdades_2013_convertido a where Regio <> "Total";', res); 
})

app.post('/line', function(req, res) {
  
  function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection(optionConection);
    
    connection.query(sqlQry, function(error, results, fields){
      if(error){
        res.json(error);
      }else{
        res.json(results);
        console.log(results);
        connection.end();
      }
        
    });

  }
  execSQLQuery('SELECT ROUND(sum((a.bitos / a.Dias_permanncia) * 100), 2) as "M", ROUND(sum((b.bitos / b.Dias_permanncia) * 100), 2) as "F" FROM DataSus_Line_Ano_Obitos_Mas_TodasIdades_2013_convertido a join DataSus_Line_Ano_Obitos_Fem_TodasIdades_2013_convertido b on (a.regio = b.regio)where a.Regio = "Total";', res); 
})

app.post('/pie', function(req, res) {
  
  function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection(optionConection);
    
    connection.query(sqlQry, function(error, results, fields){
      if(error){
        res.json(error);
      }else{
        res.json(results);
        console.log(results);
        connection.end();
      }
        
    });

  }
  execSQLQuery('select a.bitos as "10a14" from DataSus_Pie_Idade_Obito_10a14_2013_convertido a where Regio = "Total";', res); 
})

module.exports = app;





