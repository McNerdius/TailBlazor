const colors = require('tailwindcss/colors');
const mdRegex = new RegExp(/{\s*([^}])*}/g);

/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files: ["{src,public}/**/*.{ts,js,html,svg,md}", "index.{html,ts}"],
    extract: {
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
  darkMode: 'media',

  theme: {
    container: {
      center: true,
    },
    extend:
    {
      colors:
      {
        'dotnet-blurple': '#512BD4',
        'link-blue': colors.blue[600],
      },
      animation:
      {
        'spin-slow': 'spin 7s linear infinite',
      },
      width:
      {
        'blazor-load-percentage': "var(--blazor-load-percentage,0%)"
      },
      content:
      {
        'blazor-load-percentage-text': "var(--blazor-load-percentage-text,'0%')"
      }
    }
  },
  plugins: [
    require('tailwindcss-debug-screens'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/typography'),
  ],
}

