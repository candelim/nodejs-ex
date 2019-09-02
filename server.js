//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var app     = express();
var eps     = require('ejs');
var ipadd   = require('ip');
 
//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
//var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
//var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP;
var ip    = ipadd.address();
var name = process.env.MYNAME;
/*
var mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL;
var mongoURLLabel = "";
if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
  var mongoHost = process.env[mongoServiceName + "_SERVICE_HOST"];
  var mongoPort = process.env[mongoServiceName + "_SERVICE_PORT"];
  var mongoUser = process.env.MONGODB_USER
  if (mongoHost && mongoPort && process.env.MONGODB_DATABASE) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (process.env.MONGODB_USER && process.env.MONGODB_PASSWORD) {
      mongoURL += process.env.MONGODB_USER + ':' + process.env.MONGODB_PASSWORD + '@';
    }
    // Provide UI label that excludes user id and pw

    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + process.env.MONGODB_DATABASE;
    mongoURL += mongoHost + ':' + mongoPort + '/' + process.env.MONGODB_DATABASE;
  }
}
var db = null;
var dbDetails = new Object();

var initDb = function(callback) {
  if (mongoURL == null) return;

  var mongodb = require('mongodb');  
  if (mongodb == null) return;

  mongodb.connect(mongoURL, function(err, conn) {
    if (err) {
      callback(err);
      return;
    }

    db = conn;
    dbDetails.databaseName = db.databaseName;
    dbDetails.url = mongoURLLabel;
    dbDetails.type = 'MongoDB';

    console.log("Connected to MongoDB at: " + mongoURL);
  });
};
*/

app.get('/', function (req, res) {
/*
 if (db) {
    //var col = db.collection('counts');
    // Create a document with request IP and current time of request
    db.counts.insertOne({ip: req.ip, date: Date.now()});
    db.counts.count(function(err, count){
      //res.render('index.html', { pageCountMessage : count, dbInfo: dbDetails });
      res.render('index', {port: port, ip: ip});
    });
  } else {
    //res.render('index.html', { pageCountMessage : null});
    res.render('index', {port: port, ip: ip});
  }
*/
  res.render('index', {port: port, ip: ip});
});

/*
app.get('/pagecount', function (req, res) {
  if (db) {
    db.counts.count(function(err, count ){
      res.send('{ pageCount: ' + count +'}');
    });
  } else { 
    res.send('{ pageCount: -1 }');
  }
});
*/
app.get('/name', function(req, res) {
  res.send('{ Hola: ' + name + ' }');
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

/*
initDb(function(err){
  console.log('Error connecting to Mongo. Message:\n'+err);
});
*/

app.listen(port, ip);
console.log('Server running on ' + ip + ':' + port);
