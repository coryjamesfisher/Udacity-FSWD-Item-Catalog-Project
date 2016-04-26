var http = require("http"),
  url = require("url"),
  fs = require("fs");

// Port from arg default 8000
const PORT = process.argv[2] || 8000;

function handleRequest(request, response){

    // If there is an extension verify the file exists
    if (/\.[a-z]+$/.exec(request.url)) {
       
        try {
	    fs.statSync("htdocs" + request.url);
        } catch (e) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.end("404 Not Found\n");
            return;
        }
    }

    // If the path is js then set content type to js and filename to the url
    if (/^\/js\//.exec(request.url)) {
        contentType = "text/javascript";
        filename = "htdocs" + request.url;
    } else {

        // All other paths yield index.html
        contentType = "text/html";
        filename = "htdocs/index.html";
    }

    response.writeHead(200, {"Content-Type": contentType});

    // Read in the file and write it to the response
    fs.readFile(filename, "binary", function(err, file) {
        if (err) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.end(err + "\n");
        }

        response.writeHead(200, {"Content-Type": contentType});
        response.write(file, "binary");
        response.end();
    });
}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
