console.log(" => postcss loaded");

module.exports = {
    plugins:
    {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {}
    }
};
