const fs        = require('fs');
const ora       = require('ora');
const path      = require('path');

const files     = require('./files');
const showError = require('./modifyFile').showError;

const paths   = files.getCurrentDirectory();
const spinner = ora({
  text    : '',
  color   : 'yellow',
  spinner : 'dots2'
});

function generate() {
  const args     = process.custom;
  const fileName = args.c;
  const filePath = `${path.join(paths.cwd, 'styles/modules/')}${fileName}.css`;

  if (fileName && fileName.length > 0) {
    spinner.text = `Creating new CSS file at ${filePath}`;
    spinner.start();

    fs.writeFile(filePath, `/* Enter styles for ${args.t} template */\n` , (err) => {
      if (err) {
        return showError(`Couldn\'t create CSS file at: ${filePath}`)
      }

      spinner.color = 'green';
      spinner.succeed(`Created new CSS file at ${filePath}`);
    });
  } else {
    spinner.text = `Not generating CSS file. If you want to add it manually, you should put it at '${path.join(paths.cwd), 'styles/modules'} \n and make an entry at '${path.join(paths.cwd), 'js/utils/getTemplate.js'} file.`
  }
}

module.exports = {
  generate
}
