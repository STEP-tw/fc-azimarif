const fs = require('fs');
const { USER_COMMENT_FILE, FILE_ENCODING } = require('./constants.js');

class Comment {
  constructor() {
    this.userComments = [];
  }

  isFileExists() {
    return fs.existsSync(USER_COMMENT_FILE);
  }

  load() {
    if (this.isFileExists()) {
      let userComments = fs.readFileSync(USER_COMMENT_FILE, FILE_ENCODING);
      this.userComments = JSON.parse(userComments);
      return;
    }
    this.writeToFile([]);
    this.userComments = [];
  }

  getData() {
    return this.userComments;
  }

  add(comment) {
    this.userComments.unshift(comment);
    this.writeToFile(this.userComments);
  }

  writeToFile(comments) {
    fs.writeFile(USER_COMMENT_FILE, JSON.stringify(comments), err => { })
  }
}

module.exports = { Comment };
