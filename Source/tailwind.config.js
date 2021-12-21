module.exports = {
    content: [
        './**/*.{razor,html}'
    ],
    darkMode: 'class',
    theme: {
        extend:
        {
            colors:
            {
                'dotnet-blurple': '#512DB4'
            },
            animation: {
                'spin-slow': 'spin 7s linear infinite',
            }
        }
    },
    plugins: [
        require('tailwindcss-debug-screens'),
        require('tailwind-scrollbar'),
        require('@tailwindcss/typography'),
    ],
}