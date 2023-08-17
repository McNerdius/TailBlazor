console.log("tailwind index config loaded");

/** @type {import('tailwindcss').Config} */
export default {
  content: [ "index.html" ],
  darkMode: 'media',
  corePlugins: [
    'margin',
    'padding',
    'width',
    'height',
    'backgroundColor',
    'position',
    'transitionProperty',
    'transitionDuration',
    'transitionTimingFunction',
    'opacity',
    'fontFamily',
    'textColor',
    ''
    // 'preflight'
  ],
  theme: {
    transitionDuration:
    {
      medium: '500ms',
    },
    screens: {
      'sm': '560px',
      'md': '680px',
      'lg': '960px',
      'xl': '1120px',
      '2xl': '1280px'
    },
  },
  plugins: [
    require('@vicgutt/tailwindcss-debug'),
  ],
}

