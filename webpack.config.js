const webpack = require('webpack');

module.exports = [
  {
    // エントリーポイント
    entry: `./src/index.js`,

    output: {
      // 出力ファイルディレクトリ
      path: `${__dirname}/dist`,
      // 出力ファイル名
      filename: 'index.js'
    },

    // mode値が production だと最適化される
    // development だとソースマップ有効でJSファイルが出力される
    mode: "development",
    
    devServer: {
      contentBase: "dist",
      open: true
    },

    plugins: [
      // THREE.Scene などの形式で three.js のオブジェクトを使用できるようにする
      new webpack.ProvidePlugin({
        THREE: 'three/build/three'
      }),
    ]
  }
]