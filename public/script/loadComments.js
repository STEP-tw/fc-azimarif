const getRefreshButton = document => document.getElementById('refreshButton');
const getCommentSection = document => document.getElementById('commentSection');

const loadComments = function (document) {
  fetch('/guestBook.html')
    .then(response => response.text())
    .then(data => {
      const newDocument = new DOMParser().parseFromString(data, 'text/html');
      getCommentSection(document).innerHTML = getCommentSection(newDocument).innerHTML;
    })
    .catch(() => getCommentSection(document).innerHTML = 'Error loading the comments...');
};

const initialize = function() {
  getRefreshButton(document).onclick = loadComments.bind(null, document);
};

window.onload = initialize;