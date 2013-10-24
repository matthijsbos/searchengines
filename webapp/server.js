
 var express = require("express");
 var http = require('http');
 var app = express();
 var url = require('url');
 
 /* serves main page */
 app.get("/", function(req, res) {
    res.sendfile('index.html')
 });
 
  app.get("/search", function(req, res) { 
	  var options = {
		  host: 'localhost',
	  	  port: 8983,
	  	  path: '/solr/collection1/select' + req.url.substr(req.url.indexof('?')),
	  	  method: 'GET',
	          headers: req.headers
  	};

	  console.log("search: " + req.query.q);
	  http.get(options, function(innerresult) {
		innerresult.pipe(res);
	  });

  });
 
 /* serves all the static files */
 app.get(/^(.+)$/, function(req, res){ 
     console.log('static file request : ' + req.params);
     res.sendfile( __dirname + req.params[0]); 
 });
 
 var port = process.env.PORT || 5000;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
