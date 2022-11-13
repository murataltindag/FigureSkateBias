var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var mysql = require('mysql2');


var connection = mysql.createConnection({
                host: '34.173.114.36',
                user: 'root',
                password: '123',
                database: 'skaters'
});

connection.connect;

var app = express();
 
// set up ejs view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '../public'));

app.use(session({ 
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(flash());
 
/* GET home page, respond by rendering index.ejs */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Contact-Us' });
});
 
// this code is executed when a user clicks the form submit button
app.post('/contact-us', function(req, res, next) {
  var f_name = req.body.f_name;
  var l_name = req.body.l_name; 
  var email = req.body.email;
  var jobtitle = req.body.jobtitle;
    console.log(f_name);
 
  var sql = `INSERT INTO employees (employeeNumber, lastName, firstName, extension, email, officeCode, reportsTo, jobTitle) VALUES (1800,'${l_name}','${f_name}',"123",'${email}',"3",1216, '${jobtitle}')`;

console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
    req.flash('success', 'Data added successfully!');
    res.redirect('/');
  });
});
 

app.get('/test', function(request, response){
    connection.query('select * from employees limit 5', function(error, results){
        if ( error ){
            response.status(400).send('Error in database operation');
        } else {
            response.send(results);
        }
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 
// port must be set to 3000 because incoming http requests are routed from port 80 to port 8$
app.listen(80, function () {
    console.log('Node app is running on port 80');
});
 
module.exports = app;

