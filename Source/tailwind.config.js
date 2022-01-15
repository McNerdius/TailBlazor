const colors = require('tailwindcss/colors');
const mdRegex = new RegExp(/{\s*([^}])*}/g);

module.exports = {
    darkMode: 'class',
    theme: {
        extend:
        {
            colors:
            {
                'dotnet-blurple': '#512BD4',
                'link-blue': colors.blue[600],
            },
            animation: {
                'spin-slow': 'spin 7s linear infinite',
            }
        }
    },
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
                    ? matches
                        .map(m => m.slice(1, -1).split(' '))
                        .flat()
                        .filter(i => i.startsWith('.'))
                        .map(i => i.slice(1,))
                    : [];

                // if (classes.length > 0) console.log(classes);

                return classes;
            }
        }
    },
    plugins: [
        require('tailwindcss-debug-screens'),
        require('tailwind-scrollbar'),
        require('@tailwindcss/typography'),
    ],
}