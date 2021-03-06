"use strict";

const fs        = require('fs');
const ora       = require('ora');
const path      = require('path');
const chalk     = require('chalk');
const Github    = require('github');
const simpleGit = require('simple-git');

const files  = require('./files');
const prompt = require('./prompt');

const git               = simpleGit();
const currentWorkingDir = files.getCurrentDirectory();
let clonePath           = path.join(currentWorkingDir.cwd);
const spinner = ora({
  text : 'Creating new project...',
  color: 'yellow',
  spinner : 'dots12'
});

function cloneSuccess (res, err) {
  if (res === null) {
    spinner.color = 'green';
    spinner.succeed(chalk.green(`👍   Created new project @ ${clonePath}`));
    spinner.succeed(chalk.green(`Now change your current directory to: ${clonePath} and generate your first new page using "generate-page"!`));
  } else {
    spinner.color = 'red';
    spinner.fail('😬   Could not clone Flash at ' + clonePath);
    console.log(chalk.red('\n This is the reason:\n'))
    console.log(chalk.red(res))
  }
}

function cloneFlash(directory) {
  spinner.start();

  git
    .clone('https://github.com/iiison/Flash', directory, [], cloneSuccess, cloneSuccess);
}

function generateFiles() {
  prompt.askClonningQuestions().then((answers) => {
    clonePath = `${clonePath}/${answers.repoName}`;

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
  });
}

module.exports = {
  generateFiles : generateFiles
}
