const fs = require('fs');

const app = (req, res) => {
  let url = getURL(req);
  readURLData(url, res);
};

const getURL = function (request) {
  let url = './public' + request.url;
  if (request.url == '/') {
    url = './public/index.html';
  }
  return url;
};

const sendResponse = function (response, content, code) {
  response.statusCode = code;
  response.write(content);
  response.end();
};

const readURLData = function (filePath, response) {
  const PAGE_NOT_FOUND = `<html><img style="margin-left:220px;" src="/images/error.jpg"></html>`;
  let statusCode = 200;
  fs.readFile(filePath, (error, content) => {
    if (error) {
      content = PAGE_NOT_FOUND;
      statusCode = 404;
    }
    sendResponse(response, content, statusCode);
  });
};

// Export a function that can act as a handler

module.exports = app;
