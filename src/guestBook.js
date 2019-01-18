const fs = require('fs');
const { GUEST_PAGE, GUEST_PAGE_FOOTER } = require('./htmlTemplates.js');

const displayGuestBookPage = function(request, response) {
  let userComments = '';
  fs.readFile('./src/data.json', 'utf-8', (err, content) => {
    if (!err) {
      userComments = getUserComments(content).join('');
    }
    let guestBookPage = GUEST_PAGE + userComments + GUEST_PAGE_FOOTER;

    response.write(guestBookPage);
    response.end();
  });
};

const addComment = function(request, response) {
  let content = '';
  request.on('data', chunk => {
    content += chunk;
  });

  request.on('end', () => {
    content += '&datetime=' + new Date().toLocaleString();
    let userComments = JSON.stringify(getUserData(content));
    fs.appendFile('./src/data.json', userComments + ',', 'utf-8', err => {
      displayGuestBookPage(request, response);
    });
  });
};

const getUserData = function(content) {
  let args = {};
  const splitKeyValue = pair => pair.split('=');
  const assignKeyValueToArgs = ([key, value]) => (args[key] = value);
  content
    .split('&')
    .map(splitKeyValue)
    .forEach(assignKeyValueToArgs);
  return args;
};

const getUserComments = function(content) {
  let userData = content.slice(0, -1);
  let userComments = JSON.parse(`[${userData}]`);
  return userComments.reverse().map(res => createRow(res));
};

const createRow = function(data) {
  return `<tr><td>${data.name}</td> <td> ${data.comment} </td> <td> ${
    data.datetime
  }</td></tr>`;
};

module.exports = { displayGuestBookPage, addComment };
