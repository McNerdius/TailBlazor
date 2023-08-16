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
    'textColor'
    // 'preflight'
  ],
  transitionDuration:
  {
    medium: '500',
  },
  plugins: [
    require('@vicgutt/tailwindcss-debug'),
  ],
}

