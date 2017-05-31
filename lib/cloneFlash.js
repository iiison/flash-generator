"use strict";

const fs        = require('fs');
const ora       = require('ora');
const path      = require('path');
const chalk     = require('chalk');
const Github    = require('github');
const simpleGit = require('simple-git');

const files = require('./files');

const git               = simpleGit();
const currentWorkingDir = files.getCurrentDirectory();
const clonePath         = path.join(currentWorkingDir.cwd, 'test');
const spinner = ora({
  text : 'Clonning Flash',
  color: 'yellow',
  spinner : 'dots12'
});

function cloneSuccess (res, err) {
  if (res === null) {
    spinner.color = 'green';
    spinner.succeed(`Cloned Flash at ${clonePath}`);
  } else {
    spinner.color = 'red';
    spinner.fail('Something is not right, please try again');
    console.log(chalk.red(res))
  }
}

function cloneFlash(directory) {
  spinner.start();

  git
    .clone('https://github.com/iiison/Flash.git', directory, [], cloneSuccess, cloneSuccess)
    /*.catch(function (err) {
      spinner.color = 'red';
      spinner.fail('Could not clone Flash at ' + directory)
    });*/
}

function generateFiles() {
  if (files.directoryExists(clonePath)) {
    fs.unlink(clonePath, (err) => {
      if (err) {
        console.log(chalk.red('#######################'));
        console.log(err);
        console.log(chalk.red('#######################'));
        return false;
      }

      cloneFlash(clonePath);
    })
  } else {
    cloneFlash(clonePath);
  }
}

module.exports = {
  generateFiles : generateFiles
}
