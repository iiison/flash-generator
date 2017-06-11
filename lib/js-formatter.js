const chalk     = require('chalk');
const eslint    = require('eslint');
const eslintRC  = require('../eslintrc');
const formatter = require('eslint-friendly-formatter');

const engine = new eslint.CLIEngine({
  envs  : ["browser", "mocha"],
  rules : eslintRC.rules,
  fix   : true
});

const linter = eslint.linter


function format(file) {
  const report  = engine.executeOnFiles([file]);
  const results = report.results || [];

  eslint.CLIEngine.outputFixes(report)

  console.log(chalk.blue('░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░'))
  console.log(file)
  console.log(chalk.red('░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░'))
  console.log(formatter(results))
  console.log(chalk.blue('░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░'))

  return formatter(results);
}

module.exports = { format }
