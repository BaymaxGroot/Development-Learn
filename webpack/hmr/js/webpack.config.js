const path = require("path");
const webpack = require("webpack");
module.exports = (env, argv) => {
    const config = {
        entry: path.resolve(__dirname, "src/index.js"),
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "public"),
        },
        devServer: {
            contentBase: path.join(__dirname, "public"),
            host: "localhost",
            port: 8998,
            hot: true,
            hotOnly: false,
            inline: true,
            open: true,
        },
        plugins: []
    };

    if(argv.mode === "development") {
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
    }

    return config;
};
