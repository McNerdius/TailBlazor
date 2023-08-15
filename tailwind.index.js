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
    'fontFamily'
    // 'preflight'
  ],
  // plugins: [
  //   require('@vicgutt/tailwindcss-debug'),
  // ],
}

