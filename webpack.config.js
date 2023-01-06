/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const webpackNodeExternals = require('webpack-node-externals')
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = {
  target: 'node',
  context: path.resolve(__dirname, 'src'),
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: ['.', 'node_modules'],
    extensions: ['.ts', '.js', '...'],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: [webpackNodeExternals()],
  watch: true,
}
