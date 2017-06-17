const fs        = require('fs');
const ora       = require('ora');
const path      = require('path');
const beautify  = require('js-beautify').js_beautify;
const chalk = require('chalk');

const files     = require('./files');
const formatter = require('./js-formatter');
const dummyText = require('../configs/text');
const eslintRC  = require('../eslintrc');

const paths = files.getCurrentDirectory();
const spinner = ora({
  text    : '',
  color   : 'yellow',
  spinner : 'dots2'
});


function generate() {
  const args          = process.custom;
  const fileName      = path.join(paths.cwd, 'js/utils/getTemplate.js');
  let getTemplateText = dummyText.getTemplate.text;

  spinner.text = `Updating getTemplates at ${fileName}`;
  spinner.start();

  if (!args.c) {
    let tempText = getTemplateText.split('\n')

    for (var line = 0; line < tempText.length; line++) {
      if (tempText[line] && (tempText[line].indexOf('%cssName%') >= 0 || tempText[line].indexOf('styles:') >= 0)) {
        tempText.splice(line, 1);
        line--;
      }
    }

    getTemplateText = tempText.join('\n')
  }

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

    fs.writeFile(fileName, newData, 'utf8', (err) => {
      if (err) {
        spinner.color = 'red';
        spinner.fail(`Could not update getTemplate @ ${fileName}`);
        console.log(chalk.red(err));
        return;
      }

      formatter.format(fileName)

      spinner.color = 'green';
      spinner.succeed(`Updated the Routes Successfully at ${fileName}`);
    });
  });
}

module.exports = {
  generate
}
