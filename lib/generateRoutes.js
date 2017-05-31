const fs        = require('fs');
const ora       = require('ora');
const path      = require('path');
const argv      = require('minimist')(process.argv.slice(2));
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

function generateRouteCode() {
  const fileName           = path.join(paths.cwd, 'js/routes.js');
  const routesData         = dummyText.routes;
  const dummyRouteFunction = routesData.fxn.text;
  const dummyRoute         = routesData.route;

  spinner.text = `Updating the Routes at ${fileName}`;
  spinner.start();

  fs.readFile(fileName, 'utf8', (err, data) => {
    const viewName = argv.v || 'newView';
    const routeName = argv.r || argv.v || 'newRoute';

    if (err) {
      let message = 'Error while loading the routes file';

      return showError(message, err);
      spinner.color = 'red';
      spinner.fail(message);
      console.log(chalk.red(res))
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
  generateRouteCode
};
