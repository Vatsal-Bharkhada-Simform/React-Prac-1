const { merge } = require('webpack-merge');
const common = require('./common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
    mode: 'development', // Enables development optimizations (e.g., no minification)
    devtool: 'inline-source-map', // Source maps for debugging (points to original files)

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../../index.html'), // Use custom HTML template
        }),
    ],

    module: {
        rules: [
            // Process CSS: Inject into DOM via <style> tags (fast for development)
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // css-loader: resolve @import; style-loader: inject CSS
            },
        ],
    },
});