const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    // Entry point: Where Webpack starts bundling
    entry: path.resolve(__dirname, '../../src/index.jsx'),

    // Output: Where bundled files are saved
    output: {
        path: path.resolve(__dirname, '../../dist'), // Output directory (dist/)
        filename: '[name].[contenthash].js', // [contenthash] for cache busting
        publicPath: '/', // Base path for assets
    },

    // Plugins: Extend Webpack functionality
    plugins: [
        // Clean the dist/ folder before each build
        new CleanWebpackPlugin(),

        // Generate HTML file and inject bundles
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../../index.html'), // Use custom HTML template
            minify: {
                collapseWhitespace: true, // Minify HTML in production
                removeComments: true,
            },
        }),

        // Load environment variables from .env file
        new Dotenv(),
    ],

    // Module rules: Process non-JS files (JSX, CSS, images, etc.)
    module: {
        rules: [
            // Process JS/JSX files with Babel
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, // Skip node_modules
                use: 'babel-loader', // Use babel-loader to transpile
            },

            // Process images (e.g., PNG, JPG)
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource', // Embed small images as base64; larger as files
                generator: {
                    filename: 'assets/images/[hash][ext][query]', // Output path
                },
            },
        ],
    },

    // Resolve: Tell Webpack how to resolve file extensions
    resolve: {
        extensions: ['.js', '.jsx'], // Allow importing .js/.jsx without extensions
    },
};