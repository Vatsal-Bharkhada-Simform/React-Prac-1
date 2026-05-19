const { merge } = require('webpack-merge');
const common = require('./common');

module.exports = merge(common, {
    mode: 'development', // Enables development optimizations (e.g., no minification)
    devtool: 'inline-source-map', // Source maps for debugging (points to original files)

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