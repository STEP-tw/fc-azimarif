const fs = require('fs');
const { getUserComments } = require('./guestBook.js');
const {
  ROOT_DIR,
  HOME_PAGE,
  STATUS_OK,
  STATUS_NOT_FOUND
} = require('./constants.js');
const { Express } = require('./express.js');
const { Comment } = require('./comment.js');
const app = new Express();
const comment = new Comment();

const requestHandler = (request, response) => {
  const url = getURL(request);
  readURLData(url, response);
};

const getURL = function (request) {
  let url = ROOT_DIR + request.url;
  if (request.url == '/') {
    url = ROOT_DIR + HOME_PAGE;
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
  let statusCode = STATUS_OK;
  fs.readFile(filePath, (error, content) => {
    if (error) {
      content = PAGE_NOT_FOUND;
      statusCode = STATUS_NOT_FOUND;
    }
    sendResponse(response, content, statusCode);
  });
};

const loadUserComments = function () {
  comment.load();
}

const displayComments = function (request, response) {
  let userComments = getUserComments(comment.getData());
  sendResponse(response, userComments, STATUS_OK);
}

const writeCommments = function (request, response) {
  let content = '';
  request.on('data', (chunk) => content = content + chunk);
  request.on('end', () => {
    const userComment = JSON.parse(content);
    comment.add(userComment);
    displayComments(request, response);
  });
}

loadUserComments();
app.get('/comments', displayComments);
app.post('/comments', writeCommments);
app.use(requestHandler);

module.exports = app.requestListener.bind(app);
