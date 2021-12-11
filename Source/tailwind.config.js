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
            }
        }
    },
    plugins: [
        require('tailwindcss-debug-screens'),
        require('tailwind-scrollbar'),
        require('@tailwindcss/typography'),
    ],
}