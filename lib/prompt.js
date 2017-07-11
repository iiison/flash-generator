const inquirer = require('inquirer');
const argv     = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');

const questions = [
  {
    type    : 'input',
    name    : 'viewName',
    message : 'Enter a view name for the page(you can also pass the view name with `-v` flag) : ',
    default : argv.v,
    validate(value) {
      return validateRequired(value, 'Please enter a valid name for the repository');
    },
    when(){
      if (!argv.v){
        console.log(chalk.yellow('💡  The view generation becomes much easier if view name is passed from the command using -v flag.'))
      }

      return !argv.v
    }
  },
  {
    type    : 'input',
    name    : 'routeName',
    message : 'Enter a route for this page(you can also pass the route name with `-r` flag) : ',
    default : argv.v || 'newRoute',
    validate(value) {
      return validateRequired(value, 'Please enter a valid route name');
    },
    when(answers){
      return !argv.r
    }
  },
  {
    type    : 'input',
    name    : 'templateName',
    default : argv.v ? `${argv.v}Template` : 'newTemplate',
    message : 'Enter template name for the page(you can also pass the template name with `-t` flag)',
    validate(value) {
      return validateRequired(value, 'Please enter a valid template name');
    },
    when(){
      return !argv.t
    }
  },
  {
    type    : 'confirm',
    name    : 'generateCSS',
    default : true,
    message : `Shall I generate CSS file for the template? `,
  },
  {
    type : 'input',
    name : 'cssName',
    default : argv.v ? `${argv.v}Styles` : 'newStyles',
    message : 'Enter template name for the CSS(you can also pass the template name with `-c` flag)',
    when(answers){
      return answers.generateCSS
    }
  }
];

const clonningQuestions = [
   {
    type    : 'input',
    name    : 'repoName',
    default : 'test',
    message : 'Enter the project\'s name(you can also pass the template name with `-n` flag)',
  }
];

function validateRequired(value, message) {
  if (value.length) {
    return true;
  } else {
    return message || `Invalid ${value}`;
  }
}

function askQuestions() {
  return inquirer.prompt(questions)
}

function askClonningQuestions() {
  return inquirer.prompt(clonningQuestions)
}

module.exports = {
  askQuestions,
  askClonningQuestions
}
