var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');



// var dbuser = 'centralnew';
// 	var dbpassword = 'K3VrMfSBFW77';
// 	var dbname = 'central_portal';
// 	// var url = 'mongodb://'+dbuser+':'+dbpassword+'@backup.hohtechlabs.com:27017/'+dbname;
// 	//var url = 'mongodb://'+dbuser+':'+dbpassword+'@10.9.1.108:27017/'+dbname;
// 	var url = 'mongodb://adm:%3DY%5E%7DbF%26g%5BqY%5D@backup.hohtechlabs.com:27017/admin?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false';

// mongoose.connect(url, { useNewUrlParser: true })
// .then(() =>  console.log('central portal connection successful on UAT'))
// .catch((err) => console.error(err));

 var dbuser = 'almususer';
 var dbpassword = '=Y^}bF&g[qY]';
 var dbname = 'almus';

//var dbname = 'almus';
//127.0.0.1
var url = 'mongodb://' + dbuser + ':' + encodeURIComponent(dbpassword) + '@127.0.0.1:27017/' + dbname;
//var url = 'mongodb://localhost:27017/' + dbname;

//connectURL = 'mongodb://'+dbuser+':'+encodeURIComponent(dbpassword)+'@10.9.1.108:27017/'+dbname;
console.log(url)
mongoose.connect(url, { useNewUrlParser: true })
	.then(() => console.log('almus connection successful on localhost'))
	.catch((err) => console.error(err));
//mongoose.connect('mongodb://localhost:27017/' + dbname);
mongoose.Promise = global.Promise;

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/teriff');
//var folderRouter = require('./routes/folderdir');
//var subfolderRouter = require('./routes/subfolderdir');
//var uploadfileRouter = require('./routes/upload');
//var createfileRouter = require('./routes/createupload');


var app = express();
app.use(cors())
app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public')); 
app.use('/uploads', express.static('uploads'));

app.use('/', indexRouter);

// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
//app.use('/teriff', usersRouter);
//app.use('/folderdir', folderRouter);
//app.use('/subfolderdir', subfolderRouter);
//app.use('/upload', uploadfileRouter);
//app.use('/createupload', createfileRouter) ;

app.listen(3300, function () {
	console.log("Running RestHub on port" + '3300');
});

module.exports = app;
