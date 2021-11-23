const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        './BlazorWasm/**/*.{razor,html}'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: colors.blue,
                secondary: colors.amber,
                accent: "var(--accent-color)",
            },
            keyframes: {
                hscroll: {
                    '0%': { transform: 'translateX(10vw)' },
                    '50%': { transform: 'translateX(calc(90vw - 100%))' },
                    '100%': { transform: 'translateX(10vw)' },
                }
            },
            animation: {
                hscroll: 'hscroll 300s infinite linear'
            },
            screens: {
                'no-hover': { 'raw': '(hover:none)' }
            }
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp')
    ],
}