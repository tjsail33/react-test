const webpack = require('webpack');
const config = {
    devtool: 'cheap-module-source-map',
    entry: './src/entry.js',

    output: {
        path: './dist',
        filename: 'bundle.js',
    },

    devServer: {
        inline: true,
        port: 7000,
        historyApiFallback: true,
        proxy: {
            '/api*': {
                target: 'http://localhost:8000',
            },
        },
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',

                query: {
                    presets: ['es2015', 'react'],
                },
            },
        ],
        noParse: [
            /node_modules[\/]video\.js[\/]/,
        ],
    },

    resolve: {
        modulesDirectories: ['src', 'node_modules'],
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    ],
};

module.exports = config;
