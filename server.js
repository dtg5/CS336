/* React, Express, Node, Mongo, jQuery, OH MY
 * 
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 * (Edited by Daniel Garcia for CS336)
 */

// Server Variables and Requirements
  var shell = require('node-powershell');
  let credentials = {password:'pfail', user:'ufail'};
  let newComment = {id:null, author:null, text:null};

  var path = require('path');
  var express = require('express');
  var bodyParser = require('body-parser');
  let app = {exp: express()}; 
  var MongoClient = require('mongodb').MongoClient

  let database = {db:null}
  var APP_PATH = path.join(__dirname, 'dist');

// Error Checking:
(function() {
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        console.log('spawn called');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawn = mySpawn;
})();

// Powershell:
if (process.env.MY_ENV!="heroku") {
  function psSetup() {
    var ps = new shell({
      executionPolicy: 'Bypass',
      noProfile: true
    });
    ps.addCommand('"&" + $env:MONGO_PASSWORD + "&" + $env:MONGO_USER + "&"');
    ps.invoke().then(output => {
      str = output.toString().split('&');
      credentials = {password:str[1], user:str[2]};
      mongoUrl(credentials.password,credentials.user)
        // miscExpress();  <-- Ignore these.
        // appUse1();
        // appGet1();
        // appPost();
        // appGet2();
        // appPut();
        // appDelete();
        // appUse2();
      appListen();
    })
    .catch(err => {
      console.log(err);
      ps.dispose();
    });
  };
  try {
      psSetup();
    }
  catch(err) {
      console.log('Powershell environment variables not set, checking Unix environment...')
  };
};

// Unix:
  function uxSetup() {
    mongoUrl(process.env.MONGO_PASSWORD, process.env.MONGO_USER);
      // miscExpress();  <-- Ignore these.
      // appUse1();
      // appGet1();
      // appPost();
      // appGet2();
      // appPut();
      // appDelete();
      // appUse2();
    appListen();
  };
  try {
    uxSetup();
  }
  catch(err) {
    console.log('Unix environment variables not set, checking Powershell environment...')
  };

// Express clutter:
  // function miscExpress() {
    app.exp.set('port', (process.env.PORT || 3000));

    app.exp.use('/', express.static(path.join(APP_PATH)));
    app.exp.use(bodyParser.json());
    app.exp.use(bodyParser.urlencoded({extended: true}));
  // }

  // Additional middleware which will set headers that we need on each request.
  // function appUse1() {
    app.exp.use(function(req, res, next) {
      // Set permissive CORS header - this allows this server to be used only as
      // an API server in conjunction with something like webpack-dev-server.
      res.setHeader('Access-Control-Allow-Origin', '*');

      // Disable caching so we'll always get the latest comments.
      res.setHeader('Cache-Control', 'no-cache');
      next();
    });
  // }

  // function appGet1() { 
    app.exp.get('/api/comments', function(req, res) {
      database.db.collection("comments").find({}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
      });
    });
  // }

  // function appPost() {
    app.exp.post('/api/comments', function(req, res) {
      newComment = {
        id: Date.now(),
        author: req.body.author,
        text: req.body.text,
      };
      database.db.collection("comments").insertOne(newComment, function(err, result) {
        if (err) throw err;
        database.db.collection("comments").find({}).toArray(function(err, docs) {
          if (err) throw err;
          res.json(docs);
        });
      });
      // NOTE: In this implementation we rely on a database. Some other 
      // approaches (e.g. UUIDs) can help ensure a globally unique id.
      // We'll treat Date.now() as unique-enough for our purposes.
    });
  // }

  // function appGet2() {
    app.exp.get('/api/comments/:id', function(req, res) {
      database.db.collection("comments").find({"id": Number(req.params.id)}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
      });
    });
  // }

  // function appPut() {
    app.exp.put('/api/comments/:id', function(req, res) {
      var updateId = Number(req.params.id);
      var update = req.body;
      database.db.collection('comments').updateOne(
        { id: updateId },
        { $set: update },
        function(err, result) {
          if (err) throw err;
          database.db.collection("comments").find({}).toArray(function(err, docs) {
              if (err) throw err;
              res.json(docs);
          });
        }
      );
    });
  // }

  // function appDelete() {
    app.exp.delete('/api/comments/:id', function(req, res) {
      database.db.collection("comments").deleteOne(
        {'id': Number(req.params.id)},
        function(err, result) {
          if (err) throw err;
          database.db.collection("comments").find({}).toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
          });
        }
      );
    });
  // }

  // function appUse2() {
    // Send all routes/methods not specified above to the app root.
    app.exp.use('*', express.static(APP_PATH));
  // }

  function appListen() {
    app.exp.listen(app.exp.get('port'), function() {
      console.log('Server started: http://localhost:' + app.exp.get('port') + '/');
    });
  }

// Our one MongoDB function:
  function mongoUrl(password, user) {
    user = user || 'cs336';
    var mLab = 'mongodb://' + user + ':' +
      password + '@ds111568.mlab.com:11568/dtg5_cs336';
    MongoClient.connect(mLab, function (err, client) {
        if (err) throw err;
        database.db = client;
    });
  }
