var path = require('path');
var webpack = require('webpack');


module.exports = {
    devtool: 'source-map',
    entry: {
        main: [
            //'./script1.js',
            //'./script2.js',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './src/main.js'
        ]
    },
    output:{
        filename: '[name].js',
        path: path.join(__dirname, 'public'),
        publicPath: '/public/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: path.join(__dirname, 'src')
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.scss$/,
                include: path.join(__dirname, 'src'),
                loader: 'style!css!sass'
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$/i,
                loader: "file-loader?name=/images/[name].[ext]"
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        https: false
    }
};