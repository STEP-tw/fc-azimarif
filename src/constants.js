const SPACE = ' ';
const PLUS_REGEXP = new RegExp(/\+/, 'g');
const ROOT_DIR = './public';
const HOME_PAGE = '/index.html';
const USER_COMMENT_FILE = './data/userComments.json';
const FILE_ENCODING = 'utf-8';
const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;

module.exports = {
  SPACE,
  PLUS_REGEXP,
  ROOT_DIR,
  HOME_PAGE,
  USER_COMMENT_FILE,
  FILE_ENCODING,
  STATUS_OK,
  STATUS_NOT_FOUND
};