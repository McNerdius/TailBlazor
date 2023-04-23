:::: nav

[PostCSS](/notes#postcss)
[Tailwind Directives](/notes#directives)
:::
- [@layer](/notes#layer)
- [@tailwind](/notes#tailwind)
:::
[`npm` Alternatives](/notes#NPM)
:::
- [Standalone CLI](/notes#CLI)
- [CDN](/notes#CDN)
:::
[Visual Studio](/notes#VS)
[VS Code](/notes#VSCode)

::::

:::: content

# A bit more on PostCSS {#postcss}

As mentioned in [setup](/setup#postcss), the `tailwindcss` CLI wraps PostCSS functionality and bundles a few essential plugins: `postcss-import`, `autoprefixer`, and `cssnano`.  They don't need to be installed manually, and will be applied automatically if you don't pass a `postcss.config.js` file to the `tailwindcss` CLI.

The essential plugins, in the order they should be run:

- [`postcss-import`](https://github.com/postcss/postcss-import){target="_blank"} mimics vanilla CSS `@import` by inlining the contents of the css files being imported.  As such, it should always be the first plugin applied to your input CSS.

- `tailwindcss` - yep, `tailwindcss` itself acts as a PostCSS plugin.  

- [`autoprefixer`](https://github.com/postcss/autoprefixer){target="_blank"} applies "vendor prefixes" to your CSS to accommodate vendor-specific implementations of CSS features.  This is run second-to-last, after all CSS is built up.

- [`cssnano`](https://cssnano.co/docs/introduction/){target="_blank"} optionally minifies your output CSS, if you pass `--minify` to the CLI.  Obviously this needs to be run last !

The above is how it works without passing `--postcss postcss.config.js` to the `tailwindcss` CLI.  Opting for a `postcss.config.js` means we have to spell things out a bit, which is what i've shown in [setup](/setup#postcss) and [nesting](/tidy_css#nesting).  Here's a simplified view of things - noting that if you do use a `postcss.config.js`, the extra plugins you're using should be sandwiched between `postcss-import` at the top, and `tailwindcss` at the bottom.

[![postcss](images/postcss.drawio.svg)](images/postcss.drawio.svg){target="_blank"}

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

This file, as-is, is only needed _if you're not using the `tailwindcss` CLI directly_. If one were to use other JS tooling, it would be needed. When using the `tailwindcss` CLI directly:

- `autoprefixer` never needs to be listed, `tailwindcss` will do that for us.
- `tailwindcss` only needs to be listed if it's not running first, as is the case with `postcss-import` or [`tailwindcss/nesting`](/next#nesting). So here's what my default `postcss.config.js` looks like when i'm using the nifty nesting plugin:

```javascript:postcss.config.js
module.exports = {
    plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
    },
}
```

::: info

Tailwind CSS v3.1 ["bakes in" `postcss-import`](https://tailwindcss.com/blog/tailwindcss-v3-1#built-in-support-for-css-imports-in-the-cli), but not to the same degree as `autoprefixer` and `cssnano`.  Those two never need to be listed in `postcss.config.js`, whereas `postcss-import` still needs to be listed first.  So it's, uh, half-baked-in, one could say.

:::

---

# Tailwind CSS Directives  {#directives}

Let's take a look at how `postcss-import` influences the way we use Tailwind's [`@layer` and `@tailwind` directives](https://tailwindcss.com/docs/functions-and-directives#directives){target="_blank"}.

## The `@layer` directive {#layer}
In short, the [`@layer` directive](https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer){target="_blank"} tells the Tailwind CLI to give your CSS a bit of extra attention.  It will be output along with the associated layer ([recap](setup#boilerplate-bg){target="_blank"}) rather than inline, and be usable with modifiers like `hover`, dark mode, responsive breakpoints, etc.  (For the following examples i've overriden `screens` in `tailwind.config.ts` to only include a single `1024px` breakpoint.  Better quality images at some point, 4 bit is a bit ugly, eh. 🤔)

Here's example without use of layers: note the ordering, and that while `dark-utility` is generated, `dark:dark-utility` won't *actually work*:

[![step1-vanilla](images/step1-vanilla.png)](images/step1-vanilla.png){target="_blank"}

Adding `@layer` into the mix, we get smart ordering and a proper `dark:dark-utility`:

[![step2-layer](images/step2-layer.png)](images/step2-layer.png){target="_blank"}

Finally, putting our custom `layer` CSS in their own files:

[![step3-import](images/step3-import.png)](images/step3-import.png){target="_blank"}

## The `@tailwind` directive {#tailwind}

Revisiting a basic `Site.css` boilerplate:

```css:site.css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
@import "./obj/net6.0/scopedcss/bundle/site.styles.css";
```

Some notes:

- We have to `@import` to use Blazor's generated CSS Isolation bundle.
- All `@import` directives have to be at the top of the file.
- Tailwind's layers *could be* imported at the bottom using the `@tailwind` directive.
- `site.styles.css` is really more of a "components" thing, and could be moved up a line.
- Moving it up a line would *require* `@import "tailwindcss/utilities";`, as opposed to `@tailwind utilities`.

While it's not *always* necessary to use `@import` syntax versus `@tailwind` syntax when using `postcss-import`, i like to stick with the one syntax that works in all cases.  See more about this sort of thing on Tailwind's [build time imports](https://tailwindcss.com/docs/using-with-preprocessors#build-time-imports){target="_blank"} docs section.

---

# Node.js Alternatives

I'm not a web developer, and the JS ecosystem is a bit churny and disjointed for me to keep up with.  Using vanilla CSS wouldn't require any of that, but it is my biggest source of frustration in learning front-end development.  Tailwind CSS, on the other hand, just "clicks" for me.  

The way i've shown how to set things up on this site requires installation of Node.js, `tailwindcss` itself, and scaffolding a few boilerplate/config files.  Pretty much "set it and forget it".  That said - is there a *better*, Node.js-free alternative ?  Emphasis on *better*.

## Tailwind Standalone CLI {#CLI}

Tailwind 3+ offers a [standalone executable](https://tailwindcss.com/blog/standalone-cli){target="_blank"} CLI.  At the time of writing, the singular advantage is that Node.js isn't required.  Unfortunately, PostCSS (such as `tailwindcss/nesting`) or third party Tailwind plugins (such as `debug-screens`) can't be used with it.

Even when/if these plugins are supported, the standalone CLI and plugins will have to be acquired/installed somehow.  Will this be a *better* developer experience than doing so via `npm` ?  Consider continuous deployment - Node.js is likely already there, making this a one-liner.

---

## Tailwind Play {#CDN}

The [Play CDN](https://tailwindcss.com/docs/installation/play-cdn) is VERY COOL for just messing about with Tailwind, is fully features and allows use of first-party plugins.  But, it weighs in at ~110KB and runs on the client, so less ideal for production.  Obligatory mention in this category is [Twind](https://twind.style/installation#twind-cdn) - interesting, but lacks key Tailwind features.  I'll dive into this on my next project, "Blit", and share a link here at a later date.

---

# Visual Studio {#VS}

I've mentioned it before but worth repeating: the [NPM Task Runner](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NpmTaskRunner64){target="_blank"} seems to be the ideal way to take full advantage of Tailwind's watch & incremental builds within Visual Studio.  No need to try to wrangle it into MSBuild via an "inline code task" or remember to manually run scripts.  Just keep an eye on it in case `tailwindcss` has errors or crashes.

---

# VS Code {#VSCode}

The [Tailwind CSS Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss){target="_blank"} is incredible. Its intellisense is dynamic: it will pick up on new or overridden values in `tailwind.config.ts` as well any [utility classes](https://tailwindcss.com/docs/adding-new-utilities){target="_blank"} or [plugins](https://tailwindcss.com/docs/plugins){target="_blank"} you've added. It also provides previews of the generated vanilla CSS on hover in the same dynamic manner:

 ![previews](/images/hover.png)

---

::::

