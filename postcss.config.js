module.exports = (context) => ({
    plugins: {
        'postcss-import': {},
        tailwindcss: {},
        autoprefixer: {},
        'postcss-csso': context.env === 'production' ? {} : false
    }
});