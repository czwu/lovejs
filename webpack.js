module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "build.js",
    path: __dirname + '/assets/',
    publicPath: "/assets/"
  },
  module: {
    loaders: [
      {test: /.css$/, loader: 'style!css'},
      {test: /.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    alias: {
        a : 'js/assets/a.js',  // 后面直接引用 require(“a”)即可引用到模块
        b : 'js/assets/b.js',
        c : 'js/assets/c.js'
    }
  },
  plugins: [commonsPlugin, new ExtractTextPlugin("[name].css")]
}