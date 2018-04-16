// Modules
const http = require("http");

// Create server
http
  .createServer((request, response) => {
    // Enable CORS
    response.setHeader("Access-Control-Allow-Origin", "*");

    response.end("Hello from HTTP Server");

    // Start the server
  })
  .listen(3333, () => {
    console.log("Server running");
  });
