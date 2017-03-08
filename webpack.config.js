const webpack = require('webpack');
const nodeEnv = process.env.NODE_ENV || 'production';
const path = require('path');
const devServerPort = 8888;

module.exports = {
    devtool: 'source-map',
    entry: {
        app: ["babel-polyfill", path.resolve('./src/app.js')]
    },
    output: {
        path: path.resolve('./build'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015-native-modules']
                }
            },
            {
                test: /\.css$/,
                loader: ["style-loader", "css-loader", "resolve-url-loader"]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=public/fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            output: {comments: false},
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'proccess.env': {NODE_ENV: JSON.stringify(nodeEnv)},
            'VERSION': JSON.stringify(require("./package.json").version)
        })
    ],
    devServer: {
        port: devServerPort,
        inline: false,
        colors: true
    }
};
