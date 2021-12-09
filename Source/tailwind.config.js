const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        './**/*.{razor,html}'
    ],
    darkMode: 'class',
    theme: {

    },
    plugins: [
        require('tailwindcss-debug-screens'),
        require('tailwind-scrollbar'),
        require('tailwindcss/nesting'),
        require('@tailwindcss/typography'),
    ],
    // variants: {
    //     scrollbar: ['dark']
    // }
}