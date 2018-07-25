const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require("fs")
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const autoprefixer = require("autoprefixer")

function relativePath(dir) {
    "use strict"
    return path.join(__dirname, dir)
}

const port = 5000
const publicPath = "/"

const config = {
    entry: ['react-hot-loader/patch', // activate HMR for React
        'webpack-dev-server/client?http://localhost:' + port,
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        './src/main.js',
        // the entry point of our app
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
    devtool: 'cheap-module-eval-source-map',
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['babel-loader'],
                include: [relativePath('src')],
            }, {
                test: /\.scss/,
                include: [relativePath('src')],
                loaders: ['style-loader', 'css-loader',
                    {
                        loader: 'postcss-loader', options: {
                            plugins: () => [autoprefixer]
                        }
                    }, 'sass-loader']
            }, {
                test: /\.css/,
                loaders: ['style-loader', 'css-loader']
            }, {
                test: /\.(jpe?g|png|gif|svg|webp)$/i,
                loader: "url-loader?limit=1000&name=./img/[name].[ext]"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                loaders: ['url-loader']
            },
            {
                test: /(plupload.full.min.js|qiniu.js)/,
                loaders: 'imports-loader?this=>window'
            }
        ]
    }
    , plugins: [
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
        new webpack.NoEmitOnErrorsPlugin(),
        new CleanWebpackPlugin('static', {watch: false}),
        new ExtractTextPlugin('[name].[hash].css'),
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
            publicPath: publicPath
        }),
        new CopyWebpackPlugin([{from: 'src/fetopic-assets', to: 'fetopic-assets'}]),
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    devServer: {
        host: '0.0.0.0',
        port: port,
        historyApiFallback: true,
        disableHostCheck: true,
        // respond to 404s with index.html
        hot: true,
        // enable HMR on the server,
        before(app) {
            app.all("/api/**", function (req, res) {
                let method = req.method.toLowerCase()
                let path = req.path.replace(/\//g, '-')
                let filePath = './mock/' + method + path
                if (!/\.json/.test(filePath)) {
                    filePath += '.json'
                }
                fs.readFile(filePath, 'utf8', function (err, text) {
                    //console.log(err)
                    if (err !== null) {
                        res.statusCode = 404
                        res.send("读取文件发生错误:" + err.toString())
                        res.end()
                        return
                    }
                    let json = {}
                    try {
                        json = JSON.parse(text)
                    }
                    catch (e) {
                        res.send("json文件解析失败" + e.toString())
                        res.end()
                        return
                    }


                    setTimeout(() => res.json(json), 1000)

                })
            })
        }
        // 方案二
        // before: function(app) {
        //     app.all('/mock/**', function(req, res) {
        //         let path = __dirname + '/src' + req.path;
        //         delete require.cache[require.resolve(path)];
        //         res.json(require(path))
        //     });
        // }


    }
}

module.exports = config
