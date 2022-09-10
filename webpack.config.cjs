const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/core/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
      alias: {
        core: path.resolve(__dirname, 'src/core/'),
        navigator: path.resolve(__dirname, 'src/navigator/'),
        common: path.resolve(__dirname, 'src/common/'),
        react: path.resolve("./test-remote-controller/node_modules/react")
      },
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  externals: ['react', 'react-dom'],
  output: {
    filename: './src/index.ts',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    clean: true,
    globalObject: 'this',
  },
};
