const net = require('net');
const { PORT } = require('../constants');
const { printFiles, getFile } = require('./fileReader');

let fileNames = [];

const server = net.createServer();

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

server.on('connection', (conn) => {
  console.log('Client has connected!');
  conn.setEncoding('utf8');
  conn.write('Hello sir! \n');
  // write to connection what is currently present in servers files folder.
  conn.write('Current files available to download: \n');

  printFiles((error, files) => {
    if (error) {
      conn.write('Apologies, something went wrong trying to parse through my files...');
      return;
    }
    fileNames = files;
    conn.write(files.join(', '));
  });

  conn.on('data', (data) => {
    console.log(`Client said: ${data}`);
    const requestArray = data.split(' ');

    // Index 1 should be file name.
    if (!fileNames.includes(requestArray[1])) {
      conn.write('You requested an invalid file. Files available: \n');
      conn.write(fileNames.join(', '));
      return;
    }

    const filePath = `./Files/${requestArray[1]}`;

    getFile(filePath, (err, responseBody) => {
      if (err) {
        conn.write('Error reading file on our end.');
        return;
      }

      conn.write('\n');
      conn.write(responseBody);
      conn.write('\n');
    });
  });


});