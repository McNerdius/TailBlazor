console.log("postcss loaded");

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
