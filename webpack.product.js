const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const autoprefixer = require("autoprefixer")
const ExtractTextPlugin = require('extract-text-webpack-plugin')


function relativePath(dir) {
    "use strict"
    return path.join(__dirname, dir)
}
//发布上线时地址配置
const publicPath = "static/"
const config = {
    entry: [
        './src/main.js'
    ],
    output: {
        path: path.join(__dirname, 'static'),
        filename: '[name].[hash].js',
        publicPath: publicPath
    },
    resolve: {
        extensions: ['.jsx', '.js'],
        modules: ['src', 'node_modules'],
        alias: {
            src: path.resolve(__dirname, "./src"),
            container: path.resolve(__dirname, "./src/container"),
            component: path.resolve(__dirname, "./src/component")
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel-loader'],
                include: [relativePath('src')],
            }, {
                test: /\.scss$/,
                include: [relativePath('src')],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                // If you are having trouble with urls not resolving add this setting.
                                // See https://github.com/webpack-contrib/css-loader#url
                                url: false,
                                minimize: true,
                                sourceMap: false
                            }
                        },
                        {
                            loader: 'postcss-loader', options: {
                            plugins: () => [  autoprefixer ]
                        }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: false
                            }
                        }
                    ]
                })
            }, { test: /\.css$/, use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: {
                    loader: "css-loader",
                    options: {
                        sourceMap: false
                    }
                },
                publicPath: publicPath
            }) }, {
                test: /\.(jpe?g|png|gif|svg|webp)$/i,
                loader: "url-loader?limit=1000&name=./images/[name].[ext]"
            }
        ]
    }, plugins: [
        new CleanWebpackPlugin('static', {watch: false}),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            publicPath: publicPath,
            //压缩代码
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }

        }),
        new ExtractTextPlugin({
            filename: "[name].[hash].css",
            disable: false,
            allChunks: true
        }),

        new CopyWebpackPlugin([{ from: 'src/fetopic-assets', to: 'fetopic-assets' }]),
        new webpack.optimize.UglifyJsPlugin({ sourceMap: false }),
        new webpack.ProvidePlugin({
            _ : 'lodash',
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
}

module.exports = config
