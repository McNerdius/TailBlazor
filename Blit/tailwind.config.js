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
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [],
}

