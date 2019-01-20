const loadComments = function () {
  fetch('/guestBook.html')
    .then(res => res.text())
    .then(htmlPage => {
      let newDocument = document.createElement('html');
      newDocument.innerHTML = htmlPage;
      document.getElementsByClassName('commentList')[0].innerHTML =
        newDocument.getElementsByClassName('commentList')[0].innerHTML;
    });
};

window.onload = loadComments;