#!/usr/bin/env node

import chalk  from 'chalk'
import clear  from 'clear'
import figlet from 'figlet'

import cloneFlash from './lib/cloneFlash'

clear()

console.log(chalk.green(
  figlet.textSync('Flash', {
    horizontalLayout : 'default',
    font : 'Doh'
  })
))

cloneFlash()
