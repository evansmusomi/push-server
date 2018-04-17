// Modules
const http = require("http");
const push = require("./push");

// Create server
http
  .createServer((request, response) => {
    // Enable CORS
    response.setHeader("Access-Control-Allow-Origin", "*");

    // Get request vars
    const { url, method } = request;

    // Subscribe
    if (method === "POST" && url.match(/^\/subscribe\/?/)) {
      let body = [];
      // Read body stream
      request.on("data", chunk => body.push(chunk)).on("end", () => {
        // Parse subscription body to object
        let subscription = JSON.parse(body.toString());

        // Store subscription for push notifications
        push.addSubscription(subscription);

        response.end("Subscribed");
      });

      // Public Key
    } else if (url.match(/^\/key\/?/)) {
      response.end(push.getKey());

      // Push Notification
    } else if (method === "POST" && url.match(/^\/push\/?/)) {
      let body = [];
      // Read body stream
      request.on("data", chunk => body.push(chunk)).on("end", () => {
        // Send notification with POST body
        push.send(body.toString());

        response.end("Push Sent");
      });

      // Not Found
    } else {
      response.status = 404;
      response.end("Error: Unknown Request");
    }

    // Start the server
  })
  .listen(3333, () => {
    console.log("Server running");
  });
