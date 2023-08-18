// const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {

    darkMode: 'media',

    theme: {
        screens: {
            'sm': '560px',
            'md': '680px',
            'lg': '960px',
            'xl': '1120px',
            '2xl': '1280px'
        },
        extend: {
            transitionDuration:
            {
                fast: '100ms',
                medium: '500ms',
                slow: '2s'
            },
        }
    },

    // plugins: [
    //     plugin(function ({ addBase, theme })
    //     {
    //         addBase({
    //             'foo': { bar: value },
    //         })
    //     })
    // ]

}
