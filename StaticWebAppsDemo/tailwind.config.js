const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        './BlazorWasm/**/*.{razor,html}'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            gridTemplateColumns: {
                'basic': 'min-content auto'
            },
            gridTemplateRows: {
                'basic': 'min-content auto'
            }
        },
    },
    plugins: [
        require('tailwindcss-debug-screens'),
    ],
    // variants: {
    //     scrollbar: ['dark']
    // }
}