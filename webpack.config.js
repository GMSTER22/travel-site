const currentTask = process.env.npm_lifecycle_event;
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { template } = require("lodash");

const postCSSPlugins = [
    require("postcss-import"),
    require("postcss-mixins"),
    require("postcss-simple-vars"),
    require("postcss-nested"),
    require("autoprefixer")
]

let cssConfig = {
    test: /\.css$/i,
    use: [{loader: "css-loader", options: {url: false}}, {loader: "postcss-loader", options: { postcssOptions: {plugins: postCSSPlugins}} }]
}

let config = {
    entry: "./app/assets/scripts/App.js",
    plugins: [new HtmlWebpackPlugin({filename: "index.html", template: "./app/index.html"})],
    module: {
        rules: [
            cssConfig
        ]
    },
}

if (currentTask == "dev") {
    cssConfig.use.unshift({loader: "style-loader"});

    config.output = {
        filename: "bundled.js",
        path: path.resolve(__dirname, "app"),
        clean: true,
    }

    config.devServer = {
        watchFiles: ('./app/**/*.html'),
        static: {
            directory: path.resolve(__dirname, "app"),
        },
        open: true,
        hot: true,
        port: 3000,
        host: "0.0.0.0",
        // host: "192.168.1.242"
    }

    config.mode = "development"
}

if (currentTask == "build") {
    cssConfig.use.unshift(MiniCssExtractPlugin.loader);

    config.output = {
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    }

    config.mode = "production"

    config.optimization = {
        splitChunks: {
          chunks: 'all'
        },
        minimizer: [`...`, new CssMinimizerPlugin()]
    }

    config.plugins.push(new MiniCssExtractPlugin({filename: "styles.[chunkhash].css"}));
}

module.exports = config;