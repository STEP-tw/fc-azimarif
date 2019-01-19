const fs = require('fs');
const { displayGuestBookPage, saveComment } = require('./guestBook.js');
const { Express } = require('./express.js');
const { Comment } = require('./comment.js');
const app = new Express();
const comment = new Comment();
const ROOT_DIR = './public';
const HOME_PAGE = '/index.html'

const requestHandler = (req, res) => {
  let url = getURL(req);
  readURLData(url, res);
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
  let statusCode = 200;
  fs.readFile(filePath, (error, content) => {
    if (error) {
      content = PAGE_NOT_FOUND;
      statusCode = 404;
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
