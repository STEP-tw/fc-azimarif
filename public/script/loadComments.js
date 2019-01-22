const getRefreshButton = document => document.getElementById('refreshButton');
const getCommentSection = document => document.getElementById('commentSection');
const getSubmitButton = document => document.getElementById('btnSubmit');
const getNameTextBox = document => document.getElementById('txtName');
const getCommentTextArea = document => document.getElementById('txtComment');
const EMPTY_STRING = '';
const URL = '/comments';

const loadComments = function (document) {
  fetch(URL)
    .then(response => response.text())
    .then(data => getCommentSection(document).innerHTML = data);
};

const getInputData = function (document) {
  let name = getNameTextBox(document).value;
  let comment = getCommentTextArea(document).value;
  return { name, comment };
};

const clearInputFields = function (document) {
  getNameTextBox(document).value = EMPTY_STRING;
  getCommentTextArea(document).value = EMPTY_STRING;
};

const sendComments = function (document) {
  const { name, comment } = getInputData(document);
  fetch(URL, {
    method: 'POST',
    body: JSON.stringify({ name, comment, dateTime: new Date() })
  })
    .then(response => response.text())
    .then(data => getCommentSection(document).innerHTML = data);
  clearInputFields(document);
};

const initialize = function () {
  getRefreshButton(document).onclick = loadComments.bind(null, document);
  getSubmitButton(document).onclick = sendComments.bind(null, document);
  loadComments(document);
};

window.onload = initialize;
