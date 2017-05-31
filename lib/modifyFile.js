const fs           = require('fs');
const ora          = require('ora');
const path         = require('path');
const chalk        = require('chalk');
const argv         = require('minimist')(process.argv.slice(2));
const beautify     = require('js-beautify').js_beautify;

const files        = require('./files');
const dummyText    = require('../configs/text');
var generateRoutes = require('./generateRoutes');

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

function generateTemplate() {
  const fileName = argv.t || argv.v || 'new-view.tpl';
  const filePath = `${path.join(paths.cwd, 'templates/')}${fileName}.tpl`;
  const viewNameText = `${argv.v} Template` || 'New Template'
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
  })
}

function generatePageCode () {
  generateRoutes.generateRouteCode();
  generateTemplate()
}

module.exports = {
  generatePageCode,
  showError
}
