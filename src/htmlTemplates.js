const GUEST_PAGE = `<!DOCTYPE html>
<html>

<head>
  <title>Guest Book</title>
  <link rel="stylesheet" type="text/css" href="/style/main.css" />
</head>

<body>
  <header>
    <h1 class="heading"> <a class="link" href="index.html">&lt;&lt;</a> Guest Book</h1>
  </header>
  <main>
    <section>
      <h1>Leave a comment</h1>
      <form method="POST">
        <div>
          <label class="detailName">Name:</label>
          <input class="userName" type="text" name="name">
        </div>
        <div>
          <label class="detailName">Comment:</label>
          <textarea name="comment" rows="5" cols="30"></textarea>
        </div>
        <div>
          <input type="submit" value="Submit" class="button">
        </div>
      </form>
      <button id="reload" onclick="loadComments()">&#x21bb</button>
    </section>
    <section id="commentSection" class="commentList">
    <table>
    <tr><td>DATETIME</td> <td>NAME</td> <td>COMMENT</td></tr>`;

const GUEST_PAGE_FOOTER = `</table>
</section>
</main> 
<script src="/script/loadComments.js"></script>
</body>
</html>`;

module.exports = { GUEST_PAGE, GUEST_PAGE_FOOTER }