console.log("tailwind index config loaded");

/** @type {import('tailwindcss').Config} */
export default {
  presets: [
    require('./base.tw.config.js')
  ],
  content: [ "index.html" ],
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
    // '',
  ],
  plugins: [
    require('@vicgutt/tailwindcss-debug'),
  ],
}

