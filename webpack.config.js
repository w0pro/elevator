const path = require('path')

module.exports = {
    entry: {
        main: './app/start.js',
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'start.bundle.js',
    },
}
