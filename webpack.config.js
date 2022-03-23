const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

const postCSSPlugins = [
    require("postcss-import"),
    require("postcss-mixins"),
    require("postcss-simple-vars"),
    require("postcss-nested"),
    require("autoprefixer")
]

module.exports = {
    entry: "./app/assets/scripts/App.js",
    output: {
        filename: "bundled.js",
        path: path.resolve(__dirname, "app"),
        clean: true,
    }, 
    devServer: {
        watchFiles: ('./app/**/*.html'),
        static: {
            directory: path.resolve(__dirname, "app"),
        },
        open: true,
        hot: true,
        port: 3000,
        host: "0.0.0.0",
        // host: "192.168.1.242"
    },
    mode: "development",
    // watch: true,  (no more need for watch true after installing and using devServer)
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [{loader: "style-loader"},{loader: "css-loader", options: {url: false}}, {loader: "postcss-loader", options: { postcssOptions: {plugins: postCSSPlugins}} }]
            }
        ]
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         title: "Webpack App",
    //         filename: "index.html",
    //     })
    // ]
}