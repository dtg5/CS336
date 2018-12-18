/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var mongoURL = 'mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds017185.mlab.com:17185/cs336_dtg5'

var db;

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'app/css')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function(req, res) {
  db.collection("cs336").find({}).toArray(function(err, docs) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(docs);
  });
});

app.post('/api/comments', function(req, res) {
  var newComment = {
    id: Date.now(),
    author: req.body.author,
    text: req.body.text,
  };
  db.collection("cs336").insertOne(newComment, function(err, result) {
    if (err) throw err;
    db.collection("cs336").find({}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
  });
});

MongoClient.connect(mongoURL, function(err, dbConnection) {
        if (err) throw err;
        db = dbConnection;
});

console.log(mongoURL);

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});