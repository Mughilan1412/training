const http = require('http');
const fs = require('fs');

// 1️⃣ Load defaults from appsettings.json
let config = JSON.parse(fs.readFileSync('appsettings.json', 'utf8'));

// 2️⃣ Override with environment variables if present
if (process.env.Environment) {
  config.Environment = process.env.Environment;
}

if (process.env.Database__ConnectionString) {
  // We use double underscore (__) to mimic nested property overriding
  config.Database.ConnectionString = process.env.Database__ConnectionString;
}

if (process.env.AllowedHosts) {
  config.AllowedHosts = process.env.AllowedHosts;
}

// 3️⃣ Create HTTP server to show config
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(config, null, 2)); // Pretty print JSON
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
