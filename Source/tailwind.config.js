
const mdRegex = RegExp(/{\s*([^}]*)}/);

module.exports = {
    content: {
        'files': [
            './{Components,Layouts,Pages,wwwroot}/**/*.{razor,html,svg}',
            './wwwroot/content/**/*.md'
        ],
        'extract': {
            'md': (content) =>
            {
                const matches = content.match(mdRegex);
                const classes = matches
                    ? matches[1].split(' ').filter(i => i.startsWith('.')).map(i => i.slice(1,))
                    : [];
                return classes;
            }
        }
    },
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