const fs        = require('fs');
const ora       = require('ora');
const path      = require('path');
const beautify  = require('js-beautify').js_beautify;

const files     = require('./files');
const dummyText = require('../configs/text');
const showError = require('./modifyFile').showError;

const paths = files.getCurrentDirectory();
const spinner = ora({
  text    : '',
  color   : 'yellow',
  spinner : 'dots2'
});

function generate() {
  const args               = process.custom;
  const fileName           = path.join(paths.cwd, 'js/routes.js');
  const routesData         = dummyText.routes;
  const dummyRouteFunction = routesData.fxn.text;
  const dummyRoute         = routesData.route;

  spinner.text = `Updating the Routes at ${fileName}`;
  spinner.start();

  fs.readFile(fileName, 'utf8', (err, data) => {
    const viewName  = args.v;
    const routeName = args.r;

    if (err) {
      const message = 'Error while loading the routes file';

      spinner.color = 'red';
      spinner.fail(message);
      console.log(chalk.red(err))
    }

    let newData = data.replace(routesData.fxn.comment, dummyRouteFunction + `\n ${routesData.fxn.comment}`);

    newData = beautify(newData
      .replace(routesData.route.comment, routesData.route.text + `\n ${routesData.route.comment}`)
      .replace(/%viewName%/g, viewName)
      .replace(/%route%/g, routeName), {indent_size : 2});
    newData += '\n';

    fs.writeFile(fileName, newData, 'utf8', (err) => {
      if (err) {
        return showError('Error Occured while updating the routes file', err);
      }
    });

    spinner.color = 'green';
    spinner.succeed(`Updated the Routes Successfully at ${fileName}`);
  });
}

module.exports = {
  generate
};
