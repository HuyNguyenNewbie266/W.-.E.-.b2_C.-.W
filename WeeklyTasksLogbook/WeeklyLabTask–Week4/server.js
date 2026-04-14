const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url == '/') {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html><body><p>This is home Page.</p></body></html>");
    res.write("Made by Nguyen Tan Huy - GCS230465");
    res.end();
  }

  else if (req.url == '/student') {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html><body><p>This is student Page.</p></body></html>");
    res.write("Made by Nguyen Tan Huy - GCS230465");
    res.end();
  }
  else if (req.url == '/admin') {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<html><body><p>This is admin Page.</p></body></html>");
    res.write("Made by Nguyen Tan Huy - GCS230465");
    res.end();
  }

  else if (req.url == '/data') {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: 'Hello World JSON' }));
    res.write("\nMade by Nguyen Tan Huy - GCS230465");
    res.end();
  }

  else res.end("Invalid request!");
});
server.listen(8000);
console.log('Node.js web server at port 8000 is running');
console.log('Nguyen Tan Huy - GCS230465');