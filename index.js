const express = require('express');
const app = express();
const path = require('path');

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname, '../index.html'));
    // res.sendFile("./index.html");
});

// app.get('/', function(req, res){
//     res.sendFile('index.html');
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));