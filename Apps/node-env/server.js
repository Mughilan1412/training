const http = require('http');
const fs = require('fs');

// 1️⃣ Load defaults from appsettings.json
let config = JSON.parse(fs.readFileSync('appsettings.json', 'utf8'));

// 2️⃣ Override with environment variables if present
if (process.env.Environment) {
  config.Environment = process.env.Environment;
}

if (process.env.Database__ConnectionString) {
  config.Database.ConnectionString = process.env.Database__ConnectionString;
}

if (process.env.AllowedHosts) {
  config.AllowedHosts = process.env.AllowedHosts;
}

// 3️⃣ Create HTTP server to show config as HTML
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  let html = `
    <html>
    <head>
      <title>Configured Environment Variables</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; }
        .var { margin: 5px 0; }
        b { color: #0066cc; }
      </style>
    </head>
    <body>
      <h1>Configured Environment Variables</h1>
      <div class="var"><b>Environment:</b> ${config.Environment}</div>
      <div class="var"><b>Database:ConnectionString:</b> ${config.Database.ConnectionString}</div>
      <div class="var"><b>AllowedHosts:</b> ${config.AllowedHosts}</div>
    </body>
    </html>
  `;

  res.end(html);
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
