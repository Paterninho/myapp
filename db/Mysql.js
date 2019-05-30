const mysql = require('mysql');
function execSQLQuery(sqlQry, res){
const connection = mysql.createConnection({
  host     : '10.3.79.235',
  user     : 'datasaude',
  password : 'sau09*123data',
  database : 'datasaude'
});

connection.query(sqlQry, function(error, results, fields){
    if(error){ 
      console.log(error);
    }else{
    console.log(results);
    connection.end();
    console.log('executou!');
    }
});
}

execSQLQuery('select regio, Taxa_mortalidade,Mdia_permanncia from DataSus_Geo_TM_Regiao_MDP_TodasIdades_2013_convertido a where Regio <> "Total"');


