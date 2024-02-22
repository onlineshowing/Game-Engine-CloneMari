const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  entry: [
    './gameengine/helpers/ioc.js',
    './gameengine/helpers/observable.js',    
    './gameengine/lib/gameengine.js',
    './gameengine/lib/gameevents.js',
    './gameengine/lib/gamecontrols.js',
    './gameengine/lib/gamegraphics.js',
    './gameengine/lib/gamestate.js',
    './app.js'
  ],
  mode: 'development',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Webpack Example App',
      template: "index.html",
      filename: 'index.html',
    })
  ],
 //output: {
 //  clean: true
 //}
};

// https://www.sitepoint.com/bundle-static-site-webpack/


// https://www.codeinwp.com/blog/webpack-tutorial-for-beginners/

// https://www.valentinog.com/blog/webpack/