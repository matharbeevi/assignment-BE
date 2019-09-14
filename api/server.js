let app = require('express')(),
server = require('http').Server(app),
//use bodyParser middleware
bodyParser = require('body-parser')
express = require('express'),
cors = require('cors'),
http = require('http'),
//use path module
path = require('path');
//use mysql database
const mysql = require('mysql');
 
//Create connection
const conn = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'Robabank',
     multipleStatements: true
    });
     
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));
 
app.use(cors());
 
app.use(function(err, req, res, next) {
return res.send({ "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG });
});
 
//app.use('/article', articleRoute);

//route for homepage
app.get('/transac',(req, res) => {
      let sql = "SELECT * FROM transaction ";
      let query = conn.query(sql, (err, results) => {
        if(err){
            res.status(400).json(err);
        } else {
            console.log('results', results);
            res.status(200).json(results);
        }
      });
    });
     
    //route for insert data
    app.post('/save',(req, res) => {
      let data = {product_name: req.body.product_name, product_price: req.body.product_price};
      let sql = "INSERT INTO product SET ?";
      let query = conn.query(sql, data,(err, results) => {
        if(err) throw err;
        res.redirect('/');
      });
    });
     
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
next();
});
 
/*first API to check if server is running*/
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '../server/client/dist/index.html'));
})
 
 
server.listen(3000,function(){
console.log('app listening on port: 3000');
});
 
