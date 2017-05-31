import path from 'path'

const PATHS = {
  lib  : path.join(__dirname, 'lib'),
  dist  : path.join(__dirname, 'dist')
}
const base = {
  entry : {
    bundle : ['./index.js']
  },
  output : {
    path : PATHS.dist,
    filename : '[name].js',
  },
  module : {
    rules : [
      {
        test : /\.js$/,
        exclude : [/bundle\.js/],
        use : 'babel-loader'
      }
    ]
  },
  target : 'node'
}

const devConf = {
  devtool : 'inline-source-map',
}

export default Object.assign({}, base, devConf)
