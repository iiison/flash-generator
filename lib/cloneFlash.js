import ora       from 'ora'
import chalk     from 'chalk'
import GitHubApi from 'github'
import simpleGit from 'simple-git'

const git = simpleGit()

export default function cloneFlash() {
  console.log(chalk.blue(__dirname))
  // git.clone('https://github.com/iiison/Flash.git', )
}
