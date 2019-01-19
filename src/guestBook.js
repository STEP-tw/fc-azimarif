const { GUEST_PAGE, GUEST_PAGE_FOOTER } = require('./htmlTemplates.js');
const KEYS_SEPERATOR = '&';
const KEY_VALUE_SEPERATOR = '=';
const SPACE = ' ';
const PATTERN_TO_REPLACE = new RegExp(/\+/, "g");

const displayGuestBookPage = function(comment, request, response) {
  let userComments = getUserComments(comment.getComments()).join(SPACE);
  let guestBookPage = GUEST_PAGE + userComments + GUEST_PAGE_FOOTER;
  response.write(guestBookPage);
  response.end();
};

const saveComment = function(comment, request, response) {
  let content = '';
  request.on('data', chunk => { content += chunk; });

  request.on('end', () => {
    content = content + KEYS_SEPERATOR + 'datetime' + KEY_VALUE_SEPERATOR + new Date().toLocaleString();
    let userComment = getUserData(content);
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

const createRow = function (data) {
  let { name, comment } = decodeUserData(data);
  return `<tr><td>${ data.datetime }</td> 
  <td> ${ name } </td> 
  <td> ${ comment }</td></tr>`;
};

const decodeUserData = function (data) {
  let name = decodeURIComponent(data.name.replace(PATTERN_TO_REPLACE, SPACE));
  let comment = decodeURIComponent(data.comment.replace(PATTERN_TO_REPLACE, SPACE));
  return { name, comment };
}

module.exports = { displayGuestBookPage, saveComment };
