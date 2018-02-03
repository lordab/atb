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
//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

// GET for users
  router.route('/users').get(function(req, res) {
    console.log('req', req, res);
    Users.find(function(err, users) {
      if (err)
      res.send(err);
      res.json(users)
    });
  })

 //POST new users to the database
 .post(function(req, res) {
   console.log('post', req, res);
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
