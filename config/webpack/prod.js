const { merge } = require('webpack-merge');
const common = require('./common');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'production', // Enables production optimizations (minification, tree shaking)
    devtool: 'source-map', // High-quality source maps for production (separate files)

    // Optimization: Minify and split code
    optimization: {
        minimizer: [
            new TerserPlugin(), // Minify JavaScript
            new CssMinimizerPlugin(), // Minify CSS
        ],
        splitChunks: {
            chunks: 'all', // Split vendor code (e.g., react) into separate chunks
        },
    },

    plugins: [
        // Extract CSS into separate files (instead of inlining via style-loader)
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css', // Output CSS file with hash
        }),

        // Generate HTML file and inject bundles
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../../index.html'), // Use custom HTML template
            minify: {
                collapseWhitespace: true, // Minify HTML in production
                removeComments: true,
            },
        }),
    ],

    module: {
        rules: [
            // Process CSS: Extract into separate files (production)
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'], // MiniCssExtractPlugin.loader replaces style-loader
            },
        ],
    },
});