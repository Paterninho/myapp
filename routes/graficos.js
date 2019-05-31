var express = require('express');
const mysql = require('mysql');
var app = express.Router();

app.get('/clientes', (req, res) =>{
    mysql.execSQLQuery('select regio, Taxa_mortalidade,Mdia_permanncia from DataSus_Geo_TM_Regiao_MDP_TodasIdades_2013_convertido a where Regio <> "Total"', res);
  
    res.json({ message: 'Funcionando!' });
})


