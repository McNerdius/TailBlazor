console.log("tailwind config loaded");

const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files:
      [
        "{elements,public}/**/*.{ts,html,svg}",
        "./*.{ts,html}"
      ],
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

