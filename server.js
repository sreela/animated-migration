//var http = require("http");
//var fs = require("fs");
//var path = require("path");
//var mime = require("mime");
//
//function send404(response) {
//    response.writeHead(404, {"Content-type" : "text/plain"});
//    response.write("Error 404: resource not found");
//    response.end();
//}
//
//function sendPage(response, filePath, fileContents) {
//    response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
//    response.end(fileContents);
//}
//
//function serverWorking(response, absPath) {
//    fs.exists(absPath, function(exists) {
//        if (exists) {
//            fs.readFile(absPath, function(err, data) {
//                if (err) {
//                    send404(response)
//                } else {
//                    sendPage(response, absPath, data);
//                }
//            });
//        } else {
//            send404(response);
//        }
//    });
//}
//var server = http.createServer(function(request, response) {
//    var filePath = false;
//
//    if (request.url == '/') {
//        filePath = "dist/index.html";
//    } else {
//        filePath = "dist" + request.url;
//    }
//
//    var absPath = "./" + filePath;
//    serverWorking(response, absPath);
//});
//var port_number = server.listen(process.env.PORT || 3000);
//
////server(port_number);
//
////http.createServer(function(request, response) {
////    response.writeHead(200, {"Content-Type": "text/plain"});
////    response.write("It's alive!");
////    response.end();
////}).listen(3000);

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/dist'));

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('index');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});