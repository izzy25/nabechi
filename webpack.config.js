/**
 * In order to add vendor-specific styles to the Sass files, we need to configure autoprefixer through PostCSS.
 *
 * You’ll need all of these Node dependencies:
 * - autoprefixer: Parses CSS and adds vendor prefixes to CSS rules
 * - postcss-loader: Loader for Webpack used in conjunction with autoprefixer
 *
 * I dont know function for this please search in internet if you want understand it
 * @type {autoprefixer}
 */
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const Compression = require('compression-webpack-plugin');


/**
 * Module Export
 * configuration of website in here
 * @type {{mode: string, output: {filename: string}, entry: string[], module: {rules: *[]}}[]}
 */
module.exports = [{
    watch: false,
    mode: 'production',
    entry: {
        'bundle': ['./src/app.scss', './src/app.js'],
        'bundle.min': ['./src/app.scss', './src/app.js'],
    },
    output: {
        // This is necessary for webpack to compile
        // But we never use style-bundle.js
        filename: '[name].js',
    },
    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin({
            include: /\.min.js$/
        })]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'bundle.css',
                        },
                    },
                    { loader: 'extract-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['./node_modules'],
                        },
                    },
                ]
            },
            {
                test: /\.m?js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env'],
                    plugins: ['dynamic-import-node'],
                },
            }
        ]
    },
}];