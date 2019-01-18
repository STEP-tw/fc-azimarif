const { GUEST_PAGE, GUEST_PAGE_FOOTER } = require('./htmlTemplates.js');

const displayGuestBookPage = function(comment, request, response) {
  let userComments = getUserComments(comment.getComments()).join('');
  let guestBookPage = GUEST_PAGE + userComments + GUEST_PAGE_FOOTER;
  response.write(guestBookPage);
  response.end();
};

const saveComment = function(comment, request, response) {
  let content = '';
  request.on('data', chunk => {
    content += chunk;
  });

  request.on('end', () => {
    content += '&datetime=' + new Date().toLocaleString();
    let userComment = getUserData(content);
    comment.addComment(userComment);
    displayGuestBookPage(comment, request, response);
  });
};

const getUserData = function(content) {
  let args = {};
  const splitKeyValue = pair => pair.split('=');
  const assignKeyValueToArgs = ([key, value]) => (args[key] = value);
  content.split('&').map(splitKeyValue).forEach(assignKeyValueToArgs);
  return args;
};

const getUserComments = function(content) {
  let userComments = content;
  return userComments.reverse().map(comment => createRow(comment));
};

const createRow = function(data) {
  return `<tr><td>${data.name}</td> <td> ${data.comment} </td> <td> ${data.datetime}</td></tr>`;
};

module.exports = { displayGuestBookPage, saveComment };
