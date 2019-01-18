const fs = require('fs');

class Comment {
  constructor() {
    fs.readFile('./src/data.json', 'utf-8', (error, content) => {
      this.jsonFile = JSON.parse(content);
    });
  }
  getComments() {
    return this.jsonFile;
  }

  addComment(comment) {
    this.jsonFile.unshift(comment);
    fs.writeFile('./src/data.json', JSON.stringify(this.jsonFile), 'utf-8', err => { });
  }
}

module.exports = { Comment };