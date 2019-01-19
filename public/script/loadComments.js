const loadComments = function () {
  fetch('/guestBook.html')
    .then(res => res.text())
    .then(htmlPage => {
      let newDocument = document.createElement('html');
      newDocument.innerHTML = htmlPage;
      document.getElementById('commentSection').innerHTML =
        newDocument.getElementsByClassName('commentList')[0].innerHTML;
    });
};

window.onload = loadComments;