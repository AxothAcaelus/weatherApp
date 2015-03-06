var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "html/";
http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);
  //console.log(urlObj);
  if(urlObj.pathname.indexOf("getcity") > -1) {
    console.log('getcity: ' + urlObj.query.city);
    var regex = new RegExp("^" + urlObj.query.city);
    var jsonResponse = [];

    fs.readFile('utahCities.dat.txt', function (err, data) {
      if(err) throw err;
      var cities = data.toString().split("\n");
      for(var i = 0; i < cities.length; i++) {
        var result = cities[i].search(regex);
        if(result != -1) {
          jsonResponse.push({city:cities[i]});
        }
      }
      res.writeHead(200);
      res.end(JSON.stringify(jsonResponse));
      //console.log(JSON.stringify(jsonResponse));
    });    
  } else {
    
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err,data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      } else {
        res.writeHead(200);
        res.end(data);
      }
    }); 
  }
}).listen(80);