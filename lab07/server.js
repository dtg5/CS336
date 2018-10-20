/**
 * This implements some examples using jQuery and AJAX.
 */

const express = require("express")
const app = express();
const http_status = require("http-status-codes");
const bodyParser = require("body-parser")

const HOST = "localhost";
const PORT = 3000;

app.use(express.static( __dirname ))

app.get('/', (req, res) => res.redirect("http://localhost:3000/public/lab07.html"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});

app.get("/hello", function(req, res) {
    res.send({"content" : "Ground control to " + req.query.name});
});
