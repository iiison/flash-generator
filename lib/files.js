const fs   = require('fs');
const path = require('path');

module.exports = {
  getCurrentDirectory () {
    const cwd = process.cwd();
    return {
      base : path.basename(cwd),
      cwd : cwd
    };
  },

  directoryExists (filePath) {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  }
};
