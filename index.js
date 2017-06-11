#!/usr/bin/env node

"use strict";

const _          = require('lodash');
const chalk      = require('chalk');
const clear      = require('clear');
const figlet     = require('figlet');
const path       = require('path');
const argv       = require('minimist')(process.argv.slice(2));

const confs      = require('./bin/commands-conf');

let commands;

clear();

console.log(chalk.green(
  figlet.textSync('Flash', {
    horizontalLayout : 'default',
    font : 'Doh'
  })
));

commands = argv['_'];

if (commands && commands.length > 0) {
  let convertedCommand = _.camelCase(commands[0]);
  if (convertedCommand && typeof confs[convertedCommand] === 'function') {
    confs[convertedCommand]()
  } else {
    console.log(chalk.red(`\n  😵   ${commands[0]} is not a valid command.`));
    console.log(chalk.blue('\n  🤔  Did you mean \'generate-page\'❓ \n\n'));
  }
}
