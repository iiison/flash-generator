const path       = require('path');
const chalk      = require('chalk');
const files      = require('../lib/files');
const flashGit   = require('../lib/cloneFlash');
const modifyFile = require('../lib/modifyFile');

const paths = files.getCurrentDirectory();

const confs = {
  generate     : flashGit.generateFiles,
  generatePage : modifyFile.generatePageCode
}

module.exports = confs;
