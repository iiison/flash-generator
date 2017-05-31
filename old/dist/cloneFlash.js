Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cloneFlash;

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _github = require('github');

var _github2 = _interopRequireDefault(_github);

var _simpleGit = require('simple-git');

var _simpleGit2 = _interopRequireDefault(_simpleGit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var git = (0, _simpleGit2.default)();

function cloneFlash() {
  var spinner = (0, _ora2.default)({
    text: 'Cloning Flash to ' + _path2.default.join(__dirname, '../../flash-demo') + '...',
    color: 'yellow'
  });

  spinner.text = 'Cloning Flash to ' + _path2.default.join(__dirname, '../../flash-demo') + '...';

  git.clone('https://github.com/iiison/Flash.git', _path2.default.join(__dirname, '../../flash-demo')).then(function (res, err) {
    spinner.color = 'green';
    spinner.succeed('cloned flash at ' + _path2.default.join(__dirname, '../../flash-demo'));
  });
}