const colors = require('tailwindcss/colors')

module.exports = {
    purge: [
        './{Client,Server,Shared}/**/*.{razor,html,cshtml}'
    ],
    mode: 'jit',
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: colors.blue,
                secondary: colors.amber,
                accent: colors.lime
            },
            keyframes: {
                hscroll: {
                    '0%': { transform: 'translateX(10vw)' },
                    '50%': { transform: 'translateX(calc(90vw - 100%))' },
                    '100%': { transform: 'translateX(10vw)' },
                }
            },
            animation: {
                hscroll: 'hscroll 300s infinite linear',
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