var path = require('path');
module.exports = {
  entry: __dirname + '/src/main.ts', //“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
  // devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: "./build",//本地服务器所加载的页面所在的目录
    colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },
  module: {
    loaders: [
      {
        test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: { presets: ['es2015'] }
      },
      {
        test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/
      },
      { 
        test: /\.css$/, loader: 'style-loader!css-loader' 
      },
      { 
        test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'
      }
    ]
  },
  resolve: {// 现在你require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
    extensions: ['', '.js', '.ts', '.json', '.coffee','.styl']
  }
};
