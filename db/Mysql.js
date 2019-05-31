const mysql = require('mysql');
var express = require('express');
var app = express.Router();

app.post('/clientes', function(req, res) {
  
  function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
      host     : '10.3.79.235',
      user     : 'datasaude',
      password : 'sau09*123data',
      database : 'datasaude'
    });
    
    connection.query(sqlQry, function(error, results, fields){
      if(error){
        res.json(error);
      }else{
        res.json(results);
        connection.end();
      }
        
    });

  }
  execSQLQuery('SELECT a.Regio, a.bitos as "M", b.Regio, b.bitos as "F" FROM DataSus_Line_Ano_Obitos_Mas_TodasIdades_2013_convertido a JOIN DataSus_Line_Ano_Obitos_Fem_TodasIdades_2013_convertido b ON (a.Regio = b.Regio) where a.Regio <> "Total";', res); 
})

module.exports = app;





