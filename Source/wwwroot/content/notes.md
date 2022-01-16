:::: nav

[Installation](/notes)
[PostCSS](/notes#postcss)
[Tailwind Directives](/notes#directives)
[CDN](/notes#CDN)
[Standalone CLI](/notes#CLI)
[Visual Studio](/notes#VS)
[VS Code](/notes#VSCode)
[Icons](/notes#HeroIcons)

::::

:::: content

# Installation {#installation}

The docs mention installing [autoprefixer](https://autoprefixer.github.io/){target="_blank"} and `postcss` as peer-dependencies of `tailwindcss` , but that's not needed if you're using the new `tailwindcss` CLI directly because it integrates `postcss`, `autoprefixer` and [cssnano](https://cssnano.co/){target="_blank"} . If you're using other JS tooling you won't get this automagically, nor incremental builds via its `--watch` mode.

---

# A bit more on PostCSS {#postcss}

`autoprefixer` and `cssnano` are both PostCSS plugins, and the new `tailwindcss` CLI "wraps" the `postcss` pipeline, inserting itself first and `autoprefixer` last by default. Passing `--no-autoprefixer` to `tailwindcss` will disable `autoprefixer`, and passing `--minify` will enable `ccsnano`.

## Tailwind's Default `init --postcss` Config {#postcssconfig}

The default `postcss.config.js` includes itself and `autoprefixer` explicitly:

```javascript:postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

This file, as-is, is only needed _if you're not using `tailwindcss` directly_. If one were to use other JS tooling, it would be needed. Otherwise:

- `autoprefixer` never needs to be listed, as it is and should always be run last.
- `tailwindcss` only needs to be listed if it's not running first, as is the case when using `postcss-import` or [`tailwindcss/nesting`](/next#nesting). So here's what my default `postcss.config.js` looks like when i'm using the nifty nesting plugin:

```javascript:postcss.config.js
module.exports = {
    plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
    },
}
```

---

# Tailwind Directives  {#directives}

## Using @tailwind and @layer with `postcss-import`

More about `@tailwind`, `base`, and `components` can be found [here](https://tailwindcss.com/docs/functions-and-directives#tailwind){target="_blank"}. More about the PostCSS side of things can be found [here](https://tailwindcss.com/docs/using-with-preprocessors#:~:text=your%20%40tailwind%20declarations.-,Won%27t%20work%2C%20%60%40import%60%20statements%20must%20come%20first,-%40tailwind%20base%3B%0A%40import){target="_blank"}

todo: more on `@tailwind base` vs `@import "tailwindcss/base"` and the other "layers" - the whole point of this section really.  The above sets context to go a bit more into the differences between `@tailwind {layer}` and `@import "tailwindcss/{layer}`.

(What [using them together](https://github.com/tailwindlabs/tailwindcss/issues/3257#issuecomment-903311297){target="_blank"} looks like.)

---

# Tailwind CDN {#CDN}

- Old: Don't use it
- [New](https://www.youtube.com/watch?v=mSC6GwizOag){target="_blank"}: Nifty, but not for production.

---

# Tailwind Standalone CLI {#CLI}

Tailwind 3.0 offers a [standalone CLI](https://tailwindcss.com/blog/standalone-cli){target="_blank"}.  At the time of writing, the singular advantage is that `node.js` isn't required.  Unfortunately, third party PostCSS or Tailwind plugins (such as `debug-screens`) can't be used with it.  Since `postcss-import` can't be used, we can't `@import` a CSS Isolation bundle or other CSS.  No-go, for now.

Even when/if third-party plugins are supported, the CLI and plugins will have to be acquired/installed somehow.  Will this be a better developer experience than doing so via `npm` ?  Who knows.

On the other hand, [this](https://twitter.com/malfaitrobin/status/1446905317825069063){target="_blank"} would certainly improve things. 🤞

---

# Visual Studio {#VS}

I've mentioned it before but worth repeating: the [NPM Task Runner](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NpmTaskRunner64){target="_blank"} seems to be the ideal way to take full advantage of Tailwind's watch & incremental builds within Visual Studio.

---

# VS Code {#VSCode}

The [Tailwind CSS Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss){target="_blank"} is incredible. Its intellisense is dynamic: it will pick up on new or overridden values in `tailwind.config.js` as well any [utility classes](https://tailwindcss.com/docs/adding-new-utilities){target="_blank"} or [plugins](https://tailwindcss.com/docs/plugins){target="_blank"} you've added. It also provides previews of the generated vanilla CSS on hover in the same dynamic manner:

 ![previews](/images/hover.png)

---

# Icons {#HeroIcons}

I've no opinion on Open Iconic, i just nuke it out of habit. I've been using inline SVG rather than icon fonts - [HeroIcons](https://heroicons.com/){target="_blank"} in particular. (See [heroicons.dev](https://heroicons.dev/){target="_blank"} for an unofficial, improved (IMO) "picker" UI.)

::::