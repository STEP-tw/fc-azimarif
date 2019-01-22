const { SPACE, PLUS_REGEXP } = require('./constants.js');

const getUserComments = function (content) {
  return content.reduce((result, comment) => result + createRow(comment), SPACE);
};

const createRow = function (data) {
  const { name, comment, dateTime } = decodeUserData(data);
  let commentTime = new Date(dateTime).toLocaleString();
  return `<tr><td>${commentTime}</td> 
  <td> ${name} </td> 
  <td> ${comment}</td></tr>`;
};

const decodeUserData = function (data) {
  let args = {};
  Object.keys(data).forEach(key => {
    args[key] = decodeURIComponent(data[key].replace(PLUS_REGEXP, SPACE));
  });
  return args;
};

module.exports = { getUserComments };
