const fs = require('fs');
const USER_COMMENT_FILE = './data/userComments.json';
const FILE_ENCODING = 'utf-8';

class Comment {
  constructor() {
    this.userComments = [];
  }

  isCommentFileExists() {
    return fs.existsSync(USER_COMMENT_FILE);
  }

  readCommentFromFile() {
    if (this.isCommentFileExists()) {
      let userComments = fs.readFileSync(USER_COMMENT_FILE, FILE_ENCODING);
      this.userComments = JSON.parse(userComments);
      return;
    }
    this.writeCommentToFile([]);
    this.userComments = [];
  }

  getComments() {
    return this.userComments;
  }

  addComment(comment) {
    this.userComments.unshift(comment);
    this.writeCommentToFile(this.userComments);
  }

  writeCommentToFile(comments) {
    fs.writeFileSync(USER_COMMENT_FILE, JSON.stringify(comments));
  }
}

module.exports = { Comment };
