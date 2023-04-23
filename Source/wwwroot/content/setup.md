:::: nav

Setup { .font-bold }
:::
- [Blazor](setup#blazor)
- [Tailwind](setup#twsetup)
:::
Config { .font-bold }
:::
- [Tailwind](setup#twconfig)
- [PostCSS](setup#postcss)
:::
[Boilerplate CSS](setup#boilerplate)

::::

:::: content

# .NET/Blazor setup {#blazor}

I'll be tweaking a default .NET 7 Blazor Empty WebAssembly project here - the steps are largely the same for other project types and i'll do my best to call out any differences.  I'll be using the `dotnet` CLI: each IDE does things differently and may change from version to version, but the CLI is a constant.

::: info

Running `dotnet workload install wasm-tools` (".NET WebAssembly build tools" in Visual Studio installer) is required if your project will use AOT or native dependencies.  It's not required for basic projects, but installing it will enable [runtime relinking](https://learn.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/webassembly?view=aspnetcore-7.0#runtime-relinking).  It is quite large though, about 1.5GB

:::

## Scaffold & Tweak

* Run `dotnet new blazorwasm-empty`:
* Move `wwwroot/css/app.css` up to project root, rename it `site.css`
* Change `index.html` stylesheet link to `site.min.css`

Mind that these are just generic filenames/paths to demonstrate the setup, not best practices or anything.

---

# Tailwind CSS setup {#twsetup}

The [documentation](https://tailwindcss.com/docs/installation){target="_blank"} shows two main installation approaches.  I use the "Tailwind CLI" option, as invoking the CLI directly is the only way to take advantage of its super-fast incremental builds.  Again, bear with me - there are nuget packages and a standalone executable, but the node/`npm` approach wins, IMO.  See [notes](TODO) for details.

## Install & Initialize {#init}

- In the Blazor project folder, run `npm init --yes` to initialize a `package.json` using defaults. These are analogous to a `dotnet new` & `*.csproj`.
- Next run `npm install -D tailwindcss`, similar to[^1^](/setup#npm-install) a `dotnet add package`.
- Next, `npx tailwindcss init --postcss --ts` which will write default `tailwind.config.ts` and `postcss.config.js` files to disk.  (Note that this differs from the installation docs: adding `--postcss` which outputs a default `postcss.config.js` - more below.)

::: info

note the use of `npx`, similar in purpose to [`dotnet tool`](https://learn.microsoft.com/en-us/dotnet/core/tools/global-tools#invoke-a-global-tool){target="_blank"}.

:::
---

# Tailwind CSS Config {#twconfig}

As of Tailwind CSS v3.3, the default `tailwind.config.ts` file:

```typescript:tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
```

To get started, `content` must point Tailwind at any _markup_ files where its yet-to-be-generated CSS is being _used_. (Hence the "JIT" in "Tailwind JIT").  More specific configuration translates to better performance, but you don't want to miss any files either.  A decent starter for a Blazor project, taking advantage of globbing and negation/exclusion:

```typescript:tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
-    content: [], 
+    content: [
+        '!**/{bin,obj,node_modules}/**',
+        '**/*.{razor,html,cshtml}',
+    ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
```

Consider that there may be cases where you use Tailwind-generated classes in `.razor.cs` backing code, `svg` files, or elsewhere.  See [here](https://tailwindcss.com/docs/content-configuration#configuring-source-paths){target="_blank"} for more info on `content`.

---

# PostCSS Config {#postcss}

PostCSS is a general-purpose pipeline to transform input CSS through user-specified [plugins](https://github.com/postcss/postcss/blob/main/docs/plugins.md).  The Tailwind CLI wraps PostCSS functionality, automagically including some essential plugins.  However, in order to use PostCSS plugins not on the default list you'll need create a `postcss.config.js`.  There is [one such plugin](tidy_css#nesting) in particular i nearly always take advantage of, so i'm in the habit of using the `--postcss` option mentioned above when scaffolding my Tailwind projects.

I'll go into a bit more over in [notes](notes#postcss), but for now replace the contents of `postcss.config.js` with the following:

```javascript:postcss.config.js
module.exports = {
    plugins: {
        'postcss-import': {},
        tailwindcss: {}
    }
};
```

---

# Tailwind CSS Boilerplate {#boilerplate}

Lastly, make a "root" CSS file next to the config files, say `site.css`, and add the following:

```css:site.css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

This is what you'll feed the `tailwindcss` CLI, and where you'll import any of your project's CSS later.  Note this syntax is different from what you'll see in some of the docs (`@tailwind ...`).  I've found the behavior of `@import` easier to reason about, but either should work.

## Behind the boilerplate CSS {#boilerplate-bg}

A quick aside while we're dealing with Tailwind's boilerplate CSS.  Base, Components, and Utilities are "layers" - looking at the [tailwind docs](https://tailwindcss.com/docs/functions-and-directives){target="_blank"}: "Directives are custom Tailwind-specific at-rules you can use in your CSS that offer special functionality for Tailwind CSS projects."  How/if Tailwind's `@layer` differs from [vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer){target="_blank"} i do not know.  Here's what Tailwind contributes to these layers:

* `base` is a slim set of [base styles](https://tailwindcss.com/docs/preflight){target="_blank"}.  It aims to reset styles to reasonable and consistent defaults.  Excluding this is handy when you want to see *only* what Tailwind is generating based on what it sees in your `content` and similar demo/troubleshooting scenarios.
* `components` - as far as i know, [`container`](https://tailwindcss.com/docs/container){target="_blank"} is the only thing Tailwind outputs here (if you use it).  Plugins can add add styles here (or elsewhere) though.
* `utilities` for, well, utility classes.

Wether you use `@tailwind ...` or `@import "tailwindcss/...`, the CSS generated for the specified is then inlined:

[![default_layers](/images/default_layers.png)](/images/default_layers.png){target="_blank"}

More about layers in [notes](notes#layer).

---

[[1]](/setup#init){.pl-4 .inline} `npm install` vs `dotnet add package`/`dotnet tool install`: {#npm-install}

  `npm install foo` is analogous to a `dotnet add package foo` for most use cases. But here we're using `npm install -D` *(`-D` being short for `--save-dev`)* - which is more like a [`dotnet tool install`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-install){target="_blank"}. These are used when the packages being installed are _development tools_, not _project dependencies_.
---

::: {.text-xl .italic .light .text-right .pr-6 }
[next: build & watch](/build)
::: 

::::
