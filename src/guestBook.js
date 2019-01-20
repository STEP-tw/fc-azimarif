const { GUEST_PAGE, GUEST_PAGE_FOOTER } = require('./htmlTemplates.js');
const {
  KEYS_SEPERATOR,
  KEY_VALUE_SEPERATOR,
  SPACE,
  PLUS_REGEXP
} = require('./constants.js');

const displayGuestBookPage = function(comment, request, response) {
  const userComments = getUserComments(comment.getComments()).join(SPACE);
  const guestBookPage = GUEST_PAGE + userComments + GUEST_PAGE_FOOTER;
  response.write(guestBookPage);
  response.end();
};

const saveComment = function(comment, request, response) {
  let content = '';
  request.on('data', chunk => { content = content + chunk; });
  request.on('end', () => {
    const dateTime = new Date().toLocaleString();
    content = content + KEYS_SEPERATOR + 'datetime' + KEY_VALUE_SEPERATOR + dateTime;
    const userComment = getUserData(content);
    comment.addComment(userComment);
    displayGuestBookPage(comment, request, response);
  });
};

const getUserData = function(content) {
  let args = {};
  const splitKeyValue = pair => pair.split(KEY_VALUE_SEPERATOR);
  const assignKeyValueToArgs = ([key, value]) => (args[key] = value);
  content.split(KEYS_SEPERATOR).map(splitKeyValue).forEach(assignKeyValueToArgs);
  return args;
};

const getUserComments = function(content) {
  return content.map(comment => createRow(comment));
};

const createRow = function(data) {
  const { name, comment } = decodeUserData(data);
  return `<tr><td>${data.datetime}</td> 
  <td> ${name} </td> 
  <td> ${comment}</td></tr>`;
};

const decodeUserData = function(data) {
  const name = decodeURIComponent(data.name.replace(PLUS_REGEXP, SPACE));
  const comment = decodeURIComponent(data.comment.replace(PLUS_REGEXP, SPACE));
  return { name, comment };
};

module.exports = { displayGuestBookPage, saveComment };
