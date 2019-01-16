const fs = require('fs');

const pageNotFound = `<html><img style="margin-left:220px;" src="./images/error.jpg"></html>`;

const app = (req, res) => {
  let url = getURL(req);
  readURLData(url, res);
};

const getURL = function(request) {
  let url = '.' + request.url;
  if (request.url == '/') {
    url = './index.html';
  }
  return url;
};

const sendResponse = function(response, content, code) {
  response.statusCode = code;
  response.write(content);
  response.end();
};

const readURLData = function(filePath, response) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      return sendResponse(response, pageNotFound, 404);
    }
    return sendResponse(response, content, 200);
  });
};

// Export a function that can act as a handler

module.exports = app;
