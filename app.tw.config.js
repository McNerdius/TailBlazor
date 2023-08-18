console.log("tailwind main config loaded");

const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files:
      [
        "{elements,public}/**/*.{ts,html,svg}",
        "./*.ts"
      ],
  },
  darkMode: 'media',
  theme: {
    container: {
      center: true,
    },
    screens: {
      'sm': '560px',
      'md': '680px',
      'lg': '960px',
      'xl': '1120px',
      '2xl': '1280px'
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
      // transitionDelay:
      transitionDuration:
      {
        fast: '100ms',
        medium: '500ms',
        slow: '2s'
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
    // require('@tailwindcss/typography'),
  ],
}

