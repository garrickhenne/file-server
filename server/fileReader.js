const fs = require('fs');

const printFiles = (callback) => {
  fs.readdir('./Files', (err, files) => {
    callback(err, files);
  });
};

const getFile = (path, callback) => {
  fs.readFile(path, (err, data) => {
    callback(err, data);
  });
};

module.exports = {
  printFiles,
  getFile
};