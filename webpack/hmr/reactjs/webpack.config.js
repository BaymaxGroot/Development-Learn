const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NamedModulesPlugin = require('webpack').NamedModulesPlugin;

module.exports = (env, argv) => {
    const config = {
        mode: "development",
        entry: path.resolve(__dirname, 'src/main.js'),
        output: {
            filename: 'bundle.[hash].js',
            path: path.resolve(__dirname, 'public')
        },
        devServer: {
            host: "localhost",
            port: 8999,
            open: true,
            hot: true
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: path.resolve(__dirname, 'node_modules'),
                    use: ['babel-loader']
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public/index.html')
            })
        ]
    };
    return config;
}