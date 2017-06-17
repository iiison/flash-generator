const fs                  = require('fs');
const ora                 = require('ora');
const path                = require('path');
const chalk               = require('chalk');
const argv                = require('minimist')(process.argv.slice(2));
const beautify            = require('js-beautify').js_beautify;

const files               = require('./files');
const prompt              = require('./prompt');
const dummyText           = require('../configs/text');
const generateRoutes      = require('./generateRoutes');
const generateGetTemplate = require('./generateGetTemplate');
const generateTemplate    = require('./generateTemplate');
const generateCSSFile     = require('./generateCSSFile');
const flagQuestionsMap    = require('../configs/flag-questionMap');
const formatter           = require('./js-formatter.js');

const paths   = files.getCurrentDirectory();
const spinner = ora({
  text    : '',
  color   : 'yellow',
  spinner : 'dots12'
});

function showError(msg, err) {
  console.log(chalk.red('#######################'));
  console.log('Error while loading the file');
  console.log(err);
  console.log(chalk.red('#######################'));
  throw err;
}

function generateModalFile() {
  const args          = process.custom;
  const fileName      = args.v;
  const dirPath       = `${path.join(paths.cwd, 'js/page-configs/')}`;
  const filePath      = `${dirPath}${fileName}.js`;
  const indexFilePath = `${dirPath}index.js`;
  const dummyPath     = path.join(__dirname, '../configs/page-config.txt');

  spinner.text = `Creating new CSS file at ${filePath}`;
  spinner.start();

  let pageContent = fs.readFileSync(dummyPath, 'utf8');

  pageContent = pageContent.replace(/%viewName%/g, args.v);

  fs.writeFile(filePath, `${pageContent}` , (err) => {
    if (err) {
      spinner.color = 'red';
      spinner.succeed(`Couldn\'t create ${fileName}.js file @ ${filePath}`);
      return;
    }

    spinner.color = 'green';
    spinner.succeed(`Created new page config -- ${fileName}.js @ ${filePath}`);
  });

  let indexFileContent = `export ${fileName} from './${fileName}'`

  fs.appendFile(indexFilePath, `${indexFileContent}\n`, (err) => {
    if (err) {
      console.log(chalk.red('\nCould not data to page-config index file'))
      throw err
    }
  })
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
    generateGetTemplate.generate();
    generateModalFile();
  });
}

module.exports = {
  generatePageCode,
  showError
}
