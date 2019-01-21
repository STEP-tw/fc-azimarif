const fs = require('fs');
const { displayGuestBookPage, saveComment } = require('./guestBook.js');
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

const getURL = function(request) {
  let url = ROOT_DIR + request.url;
  if (request.url == '/') {
    url = ROOT_DIR + HOME_PAGE;
  }
  return url;
};

const sendResponse = function(response, content, code) {
  response.statusCode = code;
  response.write(content);
  response.end();
};

const readURLData = function(filePath, response) {
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

const loadUserComments = function(){
  comment.readCommentFromFile();
}

loadUserComments();
app.get('/guestBook.html', displayGuestBookPage.bind(null, comment));
app.post('/guestBook.html', saveComment.bind(null, comment));
app.use(requestHandler);

module.exports = app.requestListener.bind(app);
