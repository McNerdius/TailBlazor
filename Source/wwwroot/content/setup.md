:::: nav

Setup
:::
- [Blazor](setup)
- [Tailwind](setup#twsetup)
:::
Config
:::
- [Tailwind](setup#twconfig)
- [PostCSS](setup#postcss)
:::
[Boilerplate CSS](setup#boilerplate)

::::

:::: content

# .NET/Blazor setup {#blazor}

::: info
I'll be tweaking a default .NET 6 Blazor WebAssembly project here - the steps are largely the same for other project types and i'll do my best to call out any differences.  I'll be using the `dotnet` CLI: each IDE does things differently and may change from version to version, but the CLI is a constant.
:::

## Install & Nuke

After creating the Blazor WebAssembly project using `dotnet new blazorwasm`, i remove the following:

- The Bootstrap/Open-Iconic bits at `wwwroot/css/*`. \
  Note that at the bottom of `app.css` there are some Blazor-specific bits (`blazor-error-ui` and so on) that are worth taking a look at / keeping around. See [here](https://docs.microsoft.com/en-us/aspnet/core/blazor/fundamentals/handle-errors?view=aspnetcore-6.0#detailed-errors-during-development-for-blazor-webassembly-apps){target="_blank"} and [here](https://docs.microsoft.com/en-us/aspnet/core/blazor/fundamentals/handle-errors?view=aspnetcore-6.0#error-boundaries){target="_blank"} for more info.
- The `<link href="..." rel="stylesheet">` references to Bootstrap/Open-Iconic in `index.html`.

Same basic steps for other project types: Nuke the default CSS and references to it, they're just in different locations.

---

# Tailwind CSS setup {#twsetup}

The [documentation](https://tailwindcss.com/docs/installation){target="_blank"} shows two main installation approaches.  The default "Tailwind CLI" method is the way to go as we're not dealing with JS tooling or edge cases the other option may be suited for.  The common denominator is PostCSS - more on this below.

## Install & Initialize {#f1}

- In the Blazor project folder, run `npm init --yes` to initialize a `package.json` using defaults. These are analogous to a `dotnet new` & `*.csproj`.
- Next run `npm install -D tailwindcss`, similar to[^1^](/setup#npm-install) a `dotnet add package`.
- Next, `npx tailwindcss init --postcss` which will write default `tailwind.config.js` and `postcss.config.js` files to disk.  (Note that this differs from the installation docs: adding `--postcss` which outputs a default `postcss.config.js`)

# Tailwind CSS Config {#twconfig}

As of Tailwind CSS v3, the default `tailwind.config.js` file:

```javascript:tailwind.config.js
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Tailwind is massively [configurable](https://tailwindcss.com/docs/configuration){target="_blank"}, letting you override and extend values used when generating classes, and even [add your own](https://tailwindcss.com/docs/adding-new-utilities){target="_blank"} utility classes to participate in the CSS generation process.

However, there's only one tweak needed to get started: `content` is how the JIT magic happens. Here you point Tailwind at any _markup_ files where its yet-to-be-generated CSS is being _used_. (Hence the "JIT" in "Tailwind JIT").  More specific configuration translates to better performance, but you don't want to miss any files either.  A decent starter for a Blazor project, taking advantage of globbing and negation/exclusion:

```javascript:tailwind.config.js
module.exports = { 
-    content: [], 
+    content: [
+        '!**/{bin,obj,node_modules}/**',
+        '**/*.{razor,html,cshtml}',
+    ],
    theme: { 
        extend: {}, 
    }, 
    plugins: [] 
}
```

Of course for Blazor WebAssembly, `cshtml` could be excluded.  Also consider that there may be cases where you use Tailwind-generated classes in `.razor.cs` backing code, `svg` files, or elsewhere.  See [here](https://tailwindcss.com/docs/content-configuration#configuring-source-paths){target="_blank"} for more info on `content`.

# PostCSS Config {#postcss}

PostCSS is a general-purpose orchestrator for purpose-built CSS transformation plugins.  Input CSS => Plugins => Output CSS.  The Tailwind CLI wraps PostCSS functionality, automagically including the essential PostCSS plugins for us.  However, in order to use PostCSS plugins not on the default list you'll need to specify them in `postcss.config.js`.  There is [one such plugin](tidy_css#nesting) in particular i nearly always take advantage of, so i'm in the habit of using the `--postcss` option when scaffolding my Tailwind projects.

I'll go into a bit more over in [notes](notes#postcss), but for now replace the contents of `postcss.config.js` with the following:

```javascript:postcss.config.js
module.exports = {
    plugins: {
        'postcss-import': {},
        tailwindcss: {}
    }
};
```

# Tailwind CSS Boilerplate {#boilerplate}

Lastly, make a "root" CSS file next to the config files, say `site.css`, and add the following:

```css:site.css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

This is what you'll feed the `tailwindcss` CLI, and where you'll import any of your project's CSS later.  Note this syntax is different from what you'll see in the docs (`@tailwind ...`).  I've found it's easier to reason about when new to either Vanilla CSS or Tailwind CSS.

## Behind the boilerplate CSS {#boilerplate-bg}

A quick aside while we're dealing with Tailwind's boilerplate CSS.  Base, Components, and Utilities are CSS precedence layers.  Now, CSS has [its own `@layer` feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer), but this is a bit different.  Here's what Tailwind contributes to these layers:

* `base` is a slim set of [base styles](https://tailwindcss.com/docs/preflight){target="_blank"}.  It aims to reset styles to reasonable and consistent defaults.  Excluding this is handy when you want to see *just* what Tailwind is generating based on what it sees in your `content` and similar demo/troubleshooting scenarios.
* `components` - as far as i know, [`container`](https://tailwindcss.com/docs/container){target="_blank"} is the only thing Tailwind outputs here (if you use it).  Plugins can add add styles here (or elsewhere) though.
* `utilities` for, well, utility classes.

When Tailwind sees these layers, either using `@tailwind ...` or `@import "tailwindcss/...`, it replaces that line with CSS it has generated which belongs to that layer:

[![default_layers](/images/default_layers.png)](/images/default_layers.png){target="_blank"}

More about layers in [notes](notes#layer).

---

[[1]](/setup#f1){.pl-4 .inline} `npm install` vs `dotnet add package`/`dotnet tool install`: {#npm-install}

  `npm install foo` is analogous to a `dotnet add package foo` for most use cases. But here we're using `npm install -D` *(`-D` being short for `--save-dev`)* - which is more like a [`dotnet tool install`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-install){target="_blank"}. These are used when the packages being installed are _development tools_, not _project dependencies_. `dotnet tool install` isn't used nearly as much as `npm install -D`, much less with _local_ tools. (You may remember when `dotnet watch` needed to be [installed](https://www.nuget.org/packages/dotnet-watch){target="_blank"}.) Some handy dotnet global tools are [dotnet format](https://www.nuget.org/packages/dotnet-format/){target="_blank"}, [dotnet outdated](https://www.nuget.org/packages/dotnet-outdated-tool/){target="_blank"}, and finally [dotnet script](https://www.nuget.org/packages/dotnet-script/){target="_blank"} for C# scripting and a REPL, with VSCode debugging support. {.text-base }    

---

::: {.text-xl .italic .light .text-right .pr-6 }
[next: build & watch](/build)
::: 

::::