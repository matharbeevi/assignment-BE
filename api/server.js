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
//app.use(bodyParser.urlencoded({extended: false }));
 
app.use(cors());
app.use(express.static(path.join(__dirname,'../dist/assignment-BE')));
app.use(function(err, req, res, next) {
return res.send({ "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG });
});
 
//app.use('/article', articleRoute);

var version=process.env.version || "1.0"
app.get('/getversion',function(req,res){
    console.log('Version '+version);
    res.status(200).json({version:version})
  });

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
    app.post('/business/add',(req, res) => {
      let data = {
        reference: req.body.reference, 
        account_no: req.body.account_no, 
        description: req.body.description, 
        start_bal: req.body.start_bal, 
        mutation: req.body.mutation, 
        end_bal: req.body.end_bal};
      let sql = "INSERT INTO transaction SET ?";
      let query = conn.query(sql, data,(err, results) => {
        if(err){
            res.status(400).json(err);
        } else {
            console.log('results', results);
            res.status(200).json(results);
        }
      });
    });
     
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
next();
});
 
/*first API to check if server is running*/
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '../dist/index.html'));
})
 
const port = process.env.PORT || 4000;
 
server.listen(port,function(){
console.log('app listening on port: '+port);
});
 
