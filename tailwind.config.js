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
      keyframes:
      {
        fadein:
        {
          "0%": { opacity: "0%" },
          "100%": { opacity: "100%" }
        },
        fadeout:
        {
          "100%": { opacity: "100%" },
          "0%": { opacity: "0%" }
        }
      },
      colors:
      {
        'dotnet-blurple': '#512BD4',
        'link-blue': colors.blue[600],
      },
      animation:
      {
        'spin-slow': 'spin 10s linear infinite',
        'fade-in': 'fadein 3s',
        'fade-in-fast': 'fadein 100ms linear',
        'fade-out-fast': 'fadeout 100ms linear',
      }
    }
  },
  plugins: [
    require('@vicgutt/tailwindcss-debug'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/typography'),
  ],
}

