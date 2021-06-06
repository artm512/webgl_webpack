const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    // エントリーポイント
    entry: `./src/js/index.js`,

    output: {
      // 出力ファイルディレクトリ
      path: path.resolve(__dirname, 'dist'),
      // 出力ファイル名
      filename: 'js/index.js'
    },

    // mode値が production だと最適化される
    // development だとソースマップ有効でJSファイルが出力される
    mode: "development",
    
    devServer: {
      contentBase: "dist",
      open: true // 自動的にブラウザが立ち上がる
    },

    module: {
      rules: [
        {
          test: /\.pug$/,
          use: [
            {
              loader: "pug-loader",
              options: {
                pretty: true,
              },
            },
          ],
        },
      ]
    },

    plugins: [
      // THREE.Scene などの形式で three.js のオブジェクトを使用できるようにする
      new webpack.ProvidePlugin({
        THREE: 'three/build/three'
      }),

      new HtmlWebpackPlugin({
        template: "./src/index.pug", // 変換元のPugファイルの指定
        filename: "index.html", // 出力するHTMLのファイル名
        inject: false, // バンドルしたjsファイルを読み込むscriptタグを自動出力しない
        minify: false, // minifyしない
      }),
    ]
  }
]