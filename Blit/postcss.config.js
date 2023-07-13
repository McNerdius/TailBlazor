console.log(process.cwd());

module.exports = {
    // from: "tailblazor.css",
    // to: "./assets/tailblazor.min.css",
    plugins:
    {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {}
    }
};
