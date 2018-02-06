//server.js
'use strict';

//import dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var port = process.env.PORT || 5000;
var Users = require('./model/user');
var Accounts = require('./model/accounts');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 res.setHeader('Cache-Control', 'no-cache');
 next();
});


router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

// GET for accounts
  router.route('/accounts').get(function(req, res) {
    Accounts.find(function(err, accounts) {
      if (err)
      res.send(err);
      res.json(accounts)
    });
  })

// GET account for a user
  router.route('/accounts/:userId').get(function(req, res) {
    Accounts.find({userId: req.params.userId})
    .then(function (acc){
      res.json(acc);
    });
  })

//POST for accounts
   router.post(('/accounts'), function(req, res) {
    var account = new Accounts();
    account.userId = req.body.userId;
    account.accountType = req.body.accountType;
    account.currentBalance = req.body.currentBalance;
    account.availableBalance = req.body.availableBalance;
    account.save(function(err) {
    if (err)
    res.send(err);
    res.json({ message: 'Account successfully added!'});
    });
    });

// GET for users
  router.route('/users').get(function(req, res) {
    Users.find(function(err, users) {
      if (err)
      res.send(err);
      res.json(users)
    });
  })

 //POST new users to the database
 router.post(('/users'), function(req, res) {
   var user = new Users();
   user.userId = req.body.userId;
   user.password = req.body.password;
   user.save(function(err) {
     if (err)
     res.send(err);
     res.json({ message: 'User successfully added!' });
   });
  });

  app.use('/api', router);

  //starts the server and listens for requests
  app.listen(port, function() {
    console.log(`api running on port ${port}`);
  });

  //db config
  mongoose.connect('mongodb://sarthakatb:sa1991ab@ds121898.mlab.com:21898/atb');
