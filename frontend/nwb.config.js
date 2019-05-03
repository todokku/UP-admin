const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const path = require('path')
const isPro = process.env.NODE_ENV === 'production'
module.exports = function ({command}) {
    let config = {
        type: 'react-app'
    }
    // Only include react-hot-loader config when serving a development build
    if (command.startsWith('serve')) {
        config.babel = {plugins: 'react-hot-loader/babel'}
        config.webpack = {
            config(webpackConfig) {
                // React Hot Loader's patch module needs to run before your app
                webpackConfig.entry.unshift('react-hot-loader/patch')
                return webpackConfig
            }
        }
    }
    config.webpack = {
        html: {
            //this setting is required for HtmlWebpackHarddiskPlugin to work
            alwaysWriteToDisk: true,
            filename: 'react.html'
        },
        publicPath: isPro ? "/static/" : "http://localhost:3000/",
        extra: {
            plugins: [
                // this will copy an `index.html` for django to use
                new HtmlWebpackHarddiskPlugin({
                    outputPath: path.resolve(__dirname + "/../", 'admin', 'templates')
                })
            ]
        },
        config: function (webpackConfig) {
            if (!isPro) {
                webpackConfig.entry = [
                    'webpack-dev-server/client?http://0.0.0.0:3000',
                    'webpack/hot/only-dev-server',
                    './src/index.js'
                ]
            }
            return webpackConfig
        }
    }
    config.devServer = {
        // allow django host, in case you use custom domain for django app
        allowedHosts: ["0.0.0.0"]
    }
    return config
}
