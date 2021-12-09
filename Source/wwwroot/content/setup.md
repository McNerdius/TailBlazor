# Prerequisites {#top}

You'll need the .NET 6 SDK, Node.JS, and of course a development environment - _(PowerShell optional)_

::: info
The repo and this site are geared toward .NET 6 and Tailwind 3. Older versions of .NET would work too, but the build steps may be subtly different for Blazor.
:::

## Development Environment:

- Visual Studio 2022 and the "ASP.NET and web development" workload; The "Mobile Development with .NET" workload if you want to try out Blazor/MAUI projects.
- VS Code and extensions which should be auto-suggested when you create/open a freshly-created Blazor project:
  - The [C# Extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp).
  - The [Blazor-wasm debugger](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.blazorwasm-companion), if applicable.
  - The [Tailwind CSS Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss). Awesome. [Notes](notes#VSCode)
- Other - Rider ? VS for Mac ? Sublime Text ? Fleet ? Butterfly operated punchcards ? You do you !

## SDKs:

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0), included with the VS install. If you're like me and use both VS and VSCode - VSCode [will use](https://karmatachstorage.blob.core.windows.net/tailblazor/vscode_msbuild_bits.png) Visual Studio's bits.
- << MAUI workload if not installed with VS >>
- [Node.js 12+](https://nodejs.org/en/download/).
  From [the docs](https://tailwindcss.com/docs/installation#install-tailwind-via-npm):
  > For most projects (and to take advantage of Tailwind’s customization features), you’ll want to install Tailwind and its peer-dependencies via npm.

## Optional:

- [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-7.2). I'll be sharing simple PowerShell scripts here and in the repo to properly fire off both `dotnet` and `tailwindcss` in watch mode. These can be adapted to bash et al, but PowerShell is my go-to.

---

# Scaffold {#scaffold}

I'll be scaffolding and tweaking a Blazor WebAssembly project here - the steps are largely the same for other project types and i'll do my best to call out any differences.

---

## .NET/Blazor

::: info
Yes, i'm using the CLI to scaffold projects. Each IDE does things differently and may change from version to version, but the CLI is a constant.
:::

After creating the Blazor WebAssembly project using `dotnet new blazorwasm`, remove the following:

- The Bootstrap/Open-Iconic bits at `wwwroot/css/*`. Note that at the bottom of `app.css` there are some Blazor-specific bits (`blazor-error-ui` and so on) that are worth taking a look at / keeping around. See [here](https://docs.microsoft.com/en-us/aspnet/core/blazor/fundamentals/handle-errors?view=aspnetcore-6.0#detailed-errors-during-development-for-blazor-webassembly-apps) and [here](https://docs.microsoft.com/en-us/aspnet/core/blazor/fundamentals/handle-errors?view=aspnetcore-6.0#error-boundaries) for more info.
- The `<link href="..." rel="stylesheet">` references to Bootstrap/Open-Iconic in `index.html`.

Same basic steps for other project types: Nuke the default CSS and references to it, they're just in different locations.

---

## Tailwind CSS

There are currently two suggested installation approaches described in the documentation - the recommended install method (and other aspects of the documentation) does not yet reflect the [new CLI and JIT experience](notes#CLI). The common denominator is PostCSS, which is a general-purpose orchestrator for purpose-built CSS tools. I'll stick with what works best here and go into some of the differences in [notes](/notes#postcss).

- In your project folder, run `npm init --yes` to initialize a `package.json` using defaults. This is where build scripts and dependencies are defined, analagous to a `dotnet new` & `*.csproj`.
- Next run `npm install -D postcss-import@latest tailwindcss@next`, similar to[^1^](/setup#npm-install){#f1} a `dotnet add package`.
  - `postcss-import` will be used to aggregate all of your project's CSS files into one in-memory file which `tailwindcss` will then process.
- Next, `npx tailwind init --postcss`.

There are now three essential files on disk that we'll look at in the next section:

- `package.json`
- `postcss.config.js`
- `tailwind.config.js`

* Last for scaffolding, [make a "root" CSS file](https://tailwindcss.com/docs/installation#include-tailwind-in-your-css) next to the config files, say `site.css`, and add the following:

```
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

This is what you'll feed the `tailwindcss` CLI, and where you'll import any of your project's CSS later.

# Configure {#configure}

## Tailwind CSS

### tailwind.config.js - css generation configuration

As of TailwindCSS 3 alpha 2, the default `tailwind.config.js` file:

```
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Tailwind is massively [configurable](https://tailwindcss.com/docs/configuration), letting you override and extend values used when generating classes, and even [add your own](https://tailwindcss.com/docs/adding-new-utilities) utility classes to participate in the CSS generation process.

However, there's only one tweak needed to get started: `content` is where the magic happens. Here you point Tailwind at your _markup_ files where you're _using_ the yet-to-be-generated classes. (The "JIT" in "Tailwind JIT"). It supports globbing - so for a simple Blazor Wasm project: `content: [ './**/*.{razor,html}' ]`. For Blazor Server or Razor Pages/MVC, `cshtml` would be added in. It may be better to explicitly list subdirectories but i've been lazy and kept it as `**` with no perceptible repercussions. (Perhaps there's a syntax to _exclude_ paths, `obj` for instance 🤔)

Easy peasy:

<pre>
<code>module.exports = {</code>
<code><del>    content: [],</del></code>
<code><ins>    content: [ './**/*.{razor,html}' ],</ins></code>
<code>    theme: {</code>
<code>        extend: {},</code>
<code>    },</code>
<code>    plugins: []</code>
<code>}</code>
</pre>

### package.json - helper scripts

In your `package.json` you'll see the following:

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

Dump the `"test"` line and add the following:

<pre>
<code>"scripts": {</code>
<code><del>  "test": "echo \"Error: no test specified\" && exit 1"</del></code>
<code><ins>  "build": "npx tailwindcss --config tailwind.config.js --postcss postcss.config.js -i site.css -o ./wwwroot/site.min.css",</ins></code>
<code><ins>  "watch": "npx tailwindcss --config tailwind.config.js --postcss postcss.config.js -i site.css -o ./wwwroot/site.min.css --watch",</ins></code>
<code><ins>  "publish": "npx tailwindcss --config tailwind.config.js --postcss postcss.config.js -i site.css -o ./wwwroot/site.min.css --minify",</ins></code>
<code>}</code>
</pre>

_(Yes, that is `npx` not `npm`)_

Just connecting the dots here - pointing it at our config, input, and output files. It's only minified in the case of `publish` but i like to use a `*.min.css` extension to more easily distinguish the files.

### postcss.config.js - the CSS pipeline

This is another place where the current documentation - and scaffolded config file - does not yet reflect the new CLI/JIT experience. I'll share up-to-date info here, see [notes](/notes#postcss) for more info. The "old" `postcss.config.js` file:

```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

A starter config file for TailBlazor using the new Tailwind CLI / JIT experience looks like this:

```
module.exports = {
    plugins: {
        'postcss-import': {},
        tailwindcss: {}
    }
};
```

A bit of an expanding-brain meme moment here: We use the `tailwindcss` CLI, passing in `postcss.config.js` and `site.css`. It in turn uses PostCSS to process `site.css` with the plugins listed in `postcss.config.js`[^2^](/setup#postcss-plugins){#f2}. One of which is `tailwindcss`. 🤔 🧠 🤯.

---

Now, running `npm run build` takes your Tailwind-flavored `site.css` and feeds it through whatever tools are listed in `postcss.config.js` top-down, outputting vanilla CSS to `site.min.css`

---

## .NET/Blazor

We've come full circle - time to link the generated CSS in your markup files: add `<link href="./wwwroot/site.min.css" rel="stylesheet">` to `index.html`.

Again, for other project types the proper place(s) to link this will be different.

# Hooking up CSS Isolation {#scopedcss}

Idiomatic usage of Tailwind puts the bulk of CSS styling in your markup's `class=""` attributes, but it also features an `@apply` directive to easily pull out lengthy or frequently used class strings into a CSS class.

Before:
`foo.html`:

```
<h1 class="long list of utility classes we want to extract for whatever reason">Hello World</h1>
```

After:
`foo.html`:

```
<h1 class="special-name">Hello World</h1>
```

`foo.css`:

```
.special-name {
    @apply long list of utility classes we want to extract for whatever reason;
}
```

A simple copy/paste, no longhand translation needed.

Moving on. Blazor has a handy feature, [CSS Isolation](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation?view=aspnetcore-6.0). By placing `Foo.razor.css` alongside a component's `Foo.razor`, whatever CSS we put in `Foo.razor.css` is scoped to that component - cooking up special class names is now optional:

Before:
`Foo.razor`:

```
<h1 class="long list of utility classes we want to extract for whatever reason">Hello World</h1>
```

After:
`Foo.razor`:

```
<h1>Hello World</h1>
```

`Foo.razor.css`:

```
h1 {
    @apply long list of utility classes we want to extract for whatever reason;
}
```

Styles applied to `h1` only apply to the `Foo` component. From the docs:

> For each styled component, an HTML attribute is appended with the format b-{STRING}, where the {STRING} placeholder is a ten-character string generated by the framework. The identifier is unique for each app. In the rendered Counter component, Blazor appends a scope identifier to the h1 element: `<h1 b-3xxtam6d07>`

<br/>

> CSS isolation occurs at build time. Blazor rewrites CSS selectors to match markup rendered by the component. The rewritten CSS styles are bundled and produced as a static asset.

However, linking the generated bundle as described in [the docs](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation?view=aspnetcore-6.0#css-isolation-bundling) limits us to vanilla CSS for CSS Isolation.

The bundle of interest is by default located at `obj\{CONFIGURATION}\{TARGET FRAMEWORK}\scopedcss\bundle\{ASSEMBLY NAME}.styles.css` and copied to `wwwroot` when the project is published. If you're OK with using vanilla CSS in your scoped CSS files, toss `<link href="{ASSEMBLY NAME}.styles.css" rel="stylesheet">` and you're done. Taking advantage of Tailwind CSS (and other PostCSS tools) within your Components' `*.razor.css` files takes a couple of tweaks, but it is well worth it.

First, a quick addition to your `csproj` file - add the following to a `<PropertyGroup>`:

```
<AppendTargetFrameworkToOutputPath>false<AppendTargetFrameworkToOutputPath>
<IntermediateOutputPath>obj</IntermediateOutputPath>
```

This changes the output path of your project's Scoped CSS bundle from `\obj\net6.0\{Debug|Release}\scopedcss\bundle` to `\obj\scopedcss\bundle`. This is important because your "root" CSS will `@import` this, so its path should remain constant between debug and release builds.

Now if you `dotnet build` a project named `site`, with `*.razor.css` files, it'll output the Scoped CSS bundle to `\obj\scopedcss\bundle\site.styles.css`. Add this file to your root CSS, `site.css` here:

```
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
@import "./obj/scopedcss/bundle/site.styles.css";
```

And voila, consequent `npm run` commands will transform it to vanilla CSS for you and bundle it up in `site.min.css` - no need to link it on its own as the docs describe.

---

Some Footnotes...

- `npm install` vs `dotnet ...` {#npm-install .md-footnote}

  `npm install` is analogous to a `dotnet add package` for most use cases. But here we're using `npm install -D` which is more like a [`dotnet tool install`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-install). These are used when the packages being installed are _development tools_, not _project dependencies_. `dotnet tool install` isn't used nearly as much as `npm install -D`, much less with _local_ tools. You may remember when `dotnet watch` was a global tool that needed [to be installed](https://www.nuget.org/packages/dotnet-watch). Some handy dotnet global tools are [`dotnet format`](https://www.nuget.org/packages/dotnet-format/), [`dotnet outdated`](https://www.nuget.org/packages/dotnet-outdated-tool/), and [`dotnet script`](https://www.nuget.org/packages/dotnet-script/) for C# scripting and a REPL, with VSCode debugging support. [back to text](/setup#f1){.md-footnote .return}

- Special PostCSS Plugins {#postcss-plugins .md-footnote}

  Along with `autoprefixer` and optionally `cssnano`. Again, see [notes](/notes#CLI). [back to text](/setup#f2){.md-footnote .return}
