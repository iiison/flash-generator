const inquirer = require('inquirer');
const argv     = require('minimist')(process.argv.slice(2));

const questions = [
  {
    type    : 'input',
    name    : 'viewName',
    message : 'Enter a view name for the page(you can also pass the view name with `-v` flag) : ',
    default : argv.v || 'newView',
    validate(value) {
      return validateRequired(value, 'Please enter a valid name for the repository');
    },
    when(){
      return !argv.v
    }
  },
  {
    type    : 'input',
    name    : 'routeName',
    message : 'Enter a route for this page(you can also pass the route name with `-r` flag) : ',
    default : argv.r || argv.v,
    validate(value) {
      return validateRequired(value, 'Please enter a valid route name');
    },
    when(){
      return !argv.r
    }
  },
  {
    type    : 'input',
    name    : 'templateName',
    default : argv.t || `${argv.v}Template`,
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
    default : `${argv.v}Styles`,
    message : 'Enter template name for the CSS(you can also pass the template name with `-c` flag)',
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

module.exports = {
  askQuestions
}
