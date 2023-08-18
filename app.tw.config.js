console.log("tailwind main config loaded");

const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
  presets: [
    require('./base.tw.config.js')
  ],
  content: {
    files:
      [
        "{elements,public}/**/*.{ts,html,svg}",
        "./*.ts"
      ],
  },
  theme: {
    extend: {
      keyframes:
      {
        fadein: {
          "0%": { opacity: "0%" },
          "100%": { opacity: "100%" }
        },
        fadeout: {
          "100%": { opacity: "100%" },
          "0%": { opacity: "0%" }
        }
      },
      colors:
      {
        'dotnet-blurple': '#512BD4',
        'link-blue': colors.blue[600],

        'dark': colors.neutral[900], 
        'dark-focus': colors.neutral[800],

        'border-light': colors.neutral[300],
        'border-dark': colors.neutral[600],

        'code-bg': colors.zinc[800],
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
    require('tailwind-scrollbar'),
  ],
}

