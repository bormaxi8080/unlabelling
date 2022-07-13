const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const copy = [
    {
        from: 'node_modules/webextension-polyfill/dist/browser-polyfill.min.js',
        to: 'browser-polyfill.min.js',
    },
    {
        from: 'src/manifest.json',
        to: 'manifest.json',
    },
    {
        from: 'src/popup/index.html',
        to: 'popup.html',
    },
    {
        from: 'static/icons/*.png',
        to: '[name].png',
    },
    {
        from: '_locales/',
        to: '_locales/',
    },
];

const common = {
    entry: {
        background: './src/background/index.ts',
        content: './src/content/index.ts',
        popup: './src/popup/index.ts',
    },
    module: {
        rules: [{
            test: /.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader', 'less-loader'],
        }, {
            test: /\.html$/,
            exclude: /node_modules/,
            use: ['raw-loader'],
        }],
    },
    resolve: {
        extensions: ['.ts', '.less', '.html'],
    },
    plugins: [
        new CopyPlugin({patterns: copy}),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
};

module.exports = ((mode) => {
    switch (mode) {
        case "development":
            return {
                ...common,
                mode,
                devtool: 'inline-source-map',
            };
        case "production":
            return {
                ...common,
                mode,
            };
        default:
            throw new Error(`Unknown mode: '${mode}'`);
    }
})(process.env.NODE_ENV);
