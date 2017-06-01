const fs        = require('fs');
const ora       = require('ora');
const path      = require('path');

const files     = require('./files');
const dummyText = require('../configs/text');
const showError = require('./modifyFile').showError;

const paths = files.getCurrentDirectory();
const questions = [
]
const spinner = ora({
  text    : '',
  color   : 'yellow',
  spinner : 'dots2'
});

function generate() {
  const args         = process.custom;
  const fileName     = args.t;
  const filePath     = `${path.join(paths.cwd, 'templates/')}${fileName}.tpl`;
  const viewNameText = `${args.v} Template` || 'New Template'
  const tempalteText = dummyText
    .template
    .fxn
    .text
    .replace('%Details%', viewNameText)
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, function(str){ return str.toUpperCase(); })

  spinner.text = `Creating new teplate file at ${filePath}`;
  spinner.start();

  fs.writeFile(filePath, tempalteText, (err) => {
    if (err) {
      return showError(`Couldn\'t create tempalte file at: ${dummyText.template.fxn.text}`)
    }

    spinner.color = 'green';
    spinner.succeed(`Created new teplate file at ${filePath}`);
  });
}

module.exports = {
  generate
};
