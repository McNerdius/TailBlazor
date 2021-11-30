const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        './BlazorWasm/**/*.{razor,html}'
    ],
    darkMode: 'class',
    theme: {

    },
    plugins: [
        require('tailwindcss-debug-screens'),
        require('tailwind-scrollbar'),
        require('tailwindcss/nesting')
    ],
    // variants: {
    //     scrollbar: ['dark']
    // }
}