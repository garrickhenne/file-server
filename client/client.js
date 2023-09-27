const net = require('net');

const options = {
  host: 'localhost',
  port: 10001
};


const connection = net.createConnection(options);
connection.setEncoding('utf8');

const server = connection.on('data', (data) => {
  console.log('Server says:', data);
});

connection.on('close', () => {
  console.log('Server has shut down.');
  process.exit();
});

process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
  data = data.trim();
  console.log(`Sending request for: ${data}`);
  server.write(`GET ${data} HTTP/1.1\r\n`);
  server.write(`\r\n`);
});