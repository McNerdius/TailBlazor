
# Installation

The docs mention installing `autoprefixer` and `postcss` as peer-dependencies of `tailwindcss` , but that's not needed if you're using the new `tailwindcss` CLI directly, it integrates `postcss`, `autoprefixer` and `cssnano`, no need to add those manually.  If you're using other JS tooling you won't get this automagically, or incremental builds via its `--watch` mode.

## autoprefixer (and cssnano)

* [`autoprefixer`](https://autoprefixer.github.io/) is both installed and applied automatically, zero keystrokes required.  *(Passing `--no-autoprefixer` to `tailwindcss` will disable it.)*
* [`cssnano`]() is installed automatically and run if you pass `--minify` to `tailwindcss`.  (Or if it's listed in `postcss.config.js`).

---

# A bit more on PostCSS {#postcss}

More about `@tailwind`, `base`, and `components` can be found [here](https://tailwindcss.com/docs/functions-and-directives#tailwind){ target="_blank"}.  More about the PostCSS side of things can be found [here](https://tailwindcss.com/docs/using-with-preprocessors#using-post-css-as-your-preprocessor){ target="_blank"}

todo: `@tailwind base` vs `@import "tailwindcss/base"`

## Tailwind's Default `init --postcss` Config

The default `postcss.config.json` includes itself and `autoprefixer` explicitly:

```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

The new `tailwindcss` CLI "wraps" the `postcss` pipeline, inserting itself first and `autoprefixer` last by default, so as-is the above is redundant.  If one were to use other JS tooling, the above would be needed.  Otherwise:

* `autoprefixer` never needs to be listed, as it is and should always be run last.  
* `tailwindcss` only needs to be listed if it's not running first, as is the case when using `postcss-import` or [`tailwindcss/nesting`](/next#nesting):

```
module.exports = {
    plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
    },
}
```
---

# Tailwind CDN {#CDN}

- Old: Don't use it
- [New](https://www.youtube.com/watch?v=mSC6GwizOag){ target="_blank"}: Nifty, but not for production.


# Visual Studio {#VS}

- I've mentioned it before but worth repeating: the [NPM Task Runner](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NpmTaskRunner64){ target="_blank"} seems to be the ideal way to take full advantage of Tailwind's watch & incremental builds within Visual Studio.

# VS Code {#VSCode}

The [Tailwind CSS Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss){ target="_blank"} is incredible.  Its intellisense is dynamic: it will pick up on new or overridden values in `tailwind.config.js` as well any [utility classes](https://tailwindcss.com/docs/adding-new-utilities){ target="_blank"} or [plugins](https://tailwindcss.com/docs/plugins){ target="_blank"} you've added.  It also provides previews of generated classes on hover.  To skeptics and critics who get squinty-eyed or cringe when i mention Tailwind CSS makes learning Vanilla CSS more approachable: The vanilla CSS is right there to look at and applied directly to an element.  It is transparent and cuts down on potential hangups as i learn the ins and outs of syntax, cascade, inheritance, specificity, and so much memorizing.


# Icons {#HeroIcons}

I've no opinion on Open Iconic, i just nuke it out of habit.  I've been using inline SVG rather than icon fonts - [HeroIcons](https://heroicons.com/){ target="_blank"} in particular.  (See [heroicons.dev](https://heroicons.dev/){ target="_blank"} for an unofficial, improved (IMO) "picker" UI.)

