import ora       from 'ora'
import path      from 'path'
import chalk     from 'chalk'
import GitHubApi from 'github'
import simpleGit from 'simple-git'

const git = simpleGit()

export default function cloneFlash() {
  const spinner = ora({
    text : `Cloning Flash to ${path.join(__dirname, '../../flash-demo')}...`,
    color : 'yellow'
  })

  spinner.text = `Cloning Flash to ${path.join(__dirname, '../../flash-demo')}...`

  git
    .clone('https://github.com/iiison/Flash.git', path.join(__dirname, '../../flash-demo'))
    .then((res, err) => {
      spinner.color = 'green'
      spinner.succeed(`cloned flash at ${path.join(__dirname, '../../flash-demo')}`)
    })

}
