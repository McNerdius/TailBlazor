:::: nav

[Installation](/notes)
[PostCSS](/notes#postcss)
[Tailwind Directives](/notes#directives)
:::
- [@layer](/notes#layer)
- [@tailwind](/notes#tailwind)
:::
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

This file, as-is, is only needed _if you're not using `tailwindcss` directly_. If one were to use other JS tooling, it would be needed. When using the `tailwindcss` CLI directly:

- `autoprefixer` never needs to be listed, `tailwindcss` will do that for us.
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

# Tailwind CSS Directives  {#directives}

Let's take a look at how `postcss-import` influences the way we use Tailwind's [`@layer` and `@tailwind` directives](https://tailwindcss.com/docs/functions-and-directives#directives){target="_blank"}.

## The `@layer` directive {#layer}
In short, the [`@layer` directive](https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer){target="_blank"} tells the Tailwind CLI to give your CSS a bit of extra attention.  It will be output along with the associated layer ([recap](setup#boilerplate-bg){target="_blank"}) rather than inline, and be usable with modifiers like `hover`, dark mode, responsive breakpoints, etc.  (For the following examples i've overriden `screens` in `tailwind.config.js` to only include a single `1024px` breakpoint.  Better quality images at some point, 4 bit is a bit ugly, eh. 🤔)

Here's example without use of layers: note the ordering, and that while `dark-utility` is generated, but `dark:dark-utility` won't *actually work*:

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

# Tailwind CDN {#CDN}

- Old: Don't use it
- [New](https://www.youtube.com/watch?v=mSC6GwizOag){target="_blank"}: Nifty, but not for production.

---

# Tailwind Standalone CLI {#CLI}

::: info

Tailwind 3.1's standalone CLI has improved a bit in regard to `postcss-import` but the third party plugin issue remains, as well as the question of "is it a better option ?"

:::

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

I've no opinion on the templates' default Open Iconic, i just nuke it out of habit. I've been using inline SVG rather than icon fonts - [HeroIcons](https://heroicons.com/){target="_blank"} in particular. (See [heroicons.dev](https://heroicons.dev/){target="_blank"} for an unofficial, improved (IMO) "picker" UI.)

::::