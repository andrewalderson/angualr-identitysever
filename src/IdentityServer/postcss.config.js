module.exports = ({ file, options, env }) => ({
    plugins: {
        'autoprefixer': {},
        'cssnano': env === 'production' ? {} : false
    }
});