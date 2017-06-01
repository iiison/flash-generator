const fs               = require('fs');
const ora              = require('ora');
const path             = require('path');
const chalk            = require('chalk');
const argv             = require('minimist')(process.argv.slice(2));
const beautify         = require('js-beautify').js_beautify;

const files            = require('./files');
const prompt           = require('./prompt');
const dummyText        = require('../configs/text');
const generateRoutes   = require('./generateRoutes');
const generateTemplate = require('./generateTemplate');
const generateCSSFile  = require('./generateCSSFile');
const flagQuestionsMap = require('../configs/flag-questionMap');

const paths   = files.getCurrentDirectory();
const spinner = ora({
  text    : '',
  color   : 'yellow',
  spinner : 'dots2'
});

function showError(msg, err) {
  console.log(chalk.red('#######################'));
  console.log('Error while loading the file');
  console.log(err);
  console.log(chalk.red('#######################'));
  throw err;
}

function generateGetTemplateCode() {
  const args          = process.custom;
  const fileName      = path.join(paths.cwd, 'js/utils/getTemplate.js');
  let getTemplateText = dummyText.getTemplate.text;

  spinner.text = `Updating the Routes at ${fileName}`;
  spinner.start();

  getTemplateText = getTemplateText
    .replace(/%viewName%/g, args.v)
    .replace(/%templateName%/g, args.t)
    .replace(/%cssName%/g, args.c);

  getTemplateText += `\n \n ${dummyText.getTemplate.comment}`;

  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      const message = `Could not read getTemplate.js @ ${fileName}`;

      spinner.color = 'red';
      spinner.fail(message);
      console.log(chalk.red(err))
    }

    let newData = data.replace(dummyText.getTemplate.comment, getTemplateText);

    newData = beautify(newData, {indent_size : 2});
    newData += '\n';

    fs.writeFile(fileName, newData, 'utf8', (err) => {
      if (err) {
        spinner.color = 'red';
        spinner.fail(`Could not update getTemplate @ ${fileName}`);
        console.log(chalk.red(err));
        return;
      }

      spinner.color = 'green';
      spinner.succeed(`Updated the Routes Successfully at ${fileName}`);
    });
  });
}

function generatePageCode () {
  prompt.askQuestions().then((answers) => {
    for (var i in answers) {
      argv[flagQuestionsMap[i]] = answers[i];
    }

    process.custom = argv;
    generateRoutes.generate();
    generateTemplate.generate();
    generateCSSFile.generate();
    generateGetTemplateCode();
  });
}

module.exports = {
  generatePageCode,
  showError
}
