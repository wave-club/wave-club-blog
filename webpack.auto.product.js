const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const autoprefixer = require("autoprefixer")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const fs = require("fs")

function relativePath(dir) {
    "use strict"
    return path.join(__dirname, dir)
}


function getCommandParams(name) {
    let paramsArray = process.argv.splice(2)
    let index = paramsArray.indexOf(name)
    return index === -1 ? null : paramsArray[index + 1]
}

function fsExistsSync(path) {
    try {
        fs.accessSync(path, fs.F_OK)
    } catch (e) {
        return false
    }
    return true
}

let moduleParams = process.env.ModuleName
//let moduleParams = getCommandParams('-m');

if (moduleParams === null || moduleParams === undefined) {
    console.warn("缺少module参数")
    process.exit()
}
let entryFileName = "./src/" + "main.js"

if (!fsExistsSync(entryFileName)) {
    console.log("文件不存在")
    process.exit()
}


//发布上线时资源的地址配置
const publicPath = "./"
const config = {
    entry: entryFileName,
    output: {
        path: path.join(__dirname, 'static'),
        filename: moduleParams + "-assets" + '/[name].[hash].js',
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
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']

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
                                plugins: () => [autoprefixer]
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
            }, {
                test: /\.css$/, use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: "css-loader",
                        options: {
                            sourceMap: false
                        }
                    },
                    publicPath: publicPath
                })
            }, {
                test: /\.(jpe?g|png|gif|svg|webp)$/i,
                loader: "url-loader?limit=1000&name=" + moduleParams + "-assets" + "/images/[name].[ext]"
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

        new ExtractTextPlugin({
            filename: moduleParams + "-assets" + "/[name].[hash].css",
            disable: false,
            allChunks: true
        }),
        new CopyWebpackPlugin([
            {from: 'src/' + moduleParams + '-assets' + '/images/', to: moduleParams + "-assets" + "/images"}
        ]),
        new webpack.optimize.UglifyJsPlugin({sourceMap: false}),
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
}

/*for (const item in entry_files) {*/
// const htmlPlugin = new HtmlWebpackPlugin({
//     filename: moduleParams + '.html',
//     template: 'src/index.html',
//     publicPath: publicPath,
//     chunks: [entryFileName, 'vendor', 'manifest'],
//     //压缩代码
//     minify: {
//         removeComments: true,
//         collapseWhitespace: true
//     }
// })

const htmlPlugin = new HtmlWebpackPlugin({
    filename: moduleParams + '.html',
    template: 'src/index.html',
    publicPath: publicPath,
    //压缩代码
    minify: {
        removeComments: true,
        collapseWhitespace: true
    }

})

config.plugins.push(htmlPlugin)
/*
 }
 */


module.exports = config
