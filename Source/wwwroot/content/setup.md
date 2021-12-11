# Prerequisites {#top}

You'll need the .NET 6 SDK, Node.JS, and of course a development environment — _PowerShell optional_

::: info
The repo and this site are geared toward .NET 6 and Tailwind 3. Older versions of .NET would work too, but the build steps may be subtly different for Blazor.
:::

## Development Environment:

- Visual Studio 2022 and the "ASP.NET and web development" workload; The "Mobile Development with .NET" workload if you want to try out Blazor/MAUI projects.
- VS Code with some handy extensions:
  - The [C# Extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp){target="_blank"}.
  - The [Blazor-wasm debugger](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.blazorwasm-companion){ target="_blank"}, if applicable.
  - The [Tailwind CSS Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss){ target="_blank"}.  Adds Intellisense and shows generated CSS on hover.  Awesome.  [Notes](/notes#VSCode){ target="_blank"}
- Other - Rider ? VS for Mac ? Sublime Text ? Fleet ? Butterfly operated punchcards ? You do you !

## SDKs:

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0){ target="_blank"}, included with the VS install. If you're like me and use both VS and VSCode - VSCode [will use](/wwwroot/images/vscode_msbuild_bits.png){ target="_blank"} Visual Studio's bits.
- If using CLI and Blazor/Maui is of interest, use `dotnet workload search maui` to list the workloads that may be of interest to you and `dotnet workload install` one or more.
- [Node.js 12+](https://nodejs.org/en/download/){ target="_blank"}.

## Optional:

- [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-7.2){ target="_blank"}. I'll be sharing simple PowerShell scripts to properly fire off both `dotnet` and `tailwindcss` in watch mode. These can be adapted to bash et al, but PowerShell is my go-to.

---

# Scaffold {#scaffold}

I'll be scaffolding and tweaking a Blazor WebAssembly project here - the steps are largely the same for other project types and i'll do my best to call out any differences.

---

## .NET/Blazor scaffolding

::: info
Yes, i'm using the CLI to scaffold projects. Each IDE does things differently and may change from version to version, but the CLI is a constant.
:::

After creating the Blazor WebAssembly project using `dotnet new blazorwasm`, remove the following:

- The Bootstrap/Open-Iconic bits at `wwwroot/css/*`. Note that at the bottom of `app.css` there are some Blazor-specific bits (`blazor-error-ui` and so on) that are worth taking a look at / keeping around. See [here](https://docs.microsoft.com/en-us/aspnet/core/blazor/fundamentals/handle-errors?view=aspnetcore-6.0#detailed-errors-during-development-for-blazor-webassembly-apps){ target="_blank"} and [here](https://docs.microsoft.com/en-us/aspnet/core/blazor/fundamentals/handle-errors?view=aspnetcore-6.0#error-boundaries){ target="_blank"} for more info.
- The `<link href="..." rel="stylesheet">` references to Bootstrap/Open-Iconic in `index.html`.

Same basic steps for other project types: Nuke the default CSS and references to it, they're just in different locations.

Of course the `html`/`razor`/`cshtml` classes are littered with Bootstrap classes, but, moving on...

---

## Tailwind CSS scaffolding

The [documentation](https://tailwindcss.com/docs/installation){ target="_blank"} shows two installation approaches.  The common denominator is PostCSS, which is a general-purpose orchestrator for purpose-built CSS transformation plugins.  I use the "Tailwind CLI" method but add in one PostCSS plugin - `postcss-import`.

- In the Blazor project folder, run `npm init --yes` to initialize a `package.json` using defaults. This is analogous to a `dotnet new` & `*.csproj`.
- Next run `npm install -D tailwindcss postcss-import`, similar to[^1^](/setup#npm-install){#f1} a `dotnet add package`.
  - `postcss-import` will be used to aggregate all of your project's CSS files into one in-memory file which `tailwindcss` will then process.
- Next, `npx tailwind init`.

There are now two essential files on disk that we'll look at in the next section:

- `package.json`
- `tailwind.config.js`

Last for scaffolding, make a "root" CSS file next to the config files, say `site.css`, and add the following:

```
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

This is what you'll feed the `tailwindcss` CLI, and where you'll import any of your project's CSS later.  Note this syntax is different from what you'll see in the docs (`@tailwind ...`).  I've found it's what works best when using `postcss-import` and is easier to reason about when new to either Vanilla CSS or Tailwind CSS.  See [some notes](/notes/#postcss){ target="_blank"}.

# Configure {#configure}

## Tailwind CSS configuration

### tailwind.config.js - css generation 

As of Tailwind CSS v3, the default `tailwind.config.js` file:

```
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Tailwind is massively [configurable](https://tailwindcss.com/docs/configuration){ target="_blank"}, letting you override and extend values used when generating classes, and even [add your own](https://tailwindcss.com/docs/adding-new-utilities){ target="_blank"} utility classes to participate in the CSS generation process.

However, there's only one tweak needed to get started: `content` is where the magic happens. Here you point Tailwind at the _markup_ files where the yet-to-be-generated classes are being _used_. (Hence the "JIT" in "Tailwind JIT"). It supports globbing - so for a simple Blazor Wasm project: `content: [ './**/*.{razor,html}' ]`. For Blazor Server or Razor Pages/MVC, `cshtml` would be added in. It may be better to explicitly list subdirectories but i've been lazy and kept it as `**` with no perceptible repercussions. (Perhaps there's a syntax to _exclude_ paths ? 🤔)

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

### postcss.config.js - the CSS pipeline

This is the extra bit beyond the "simplest and fastest" method described in the Tailwind docs - using a `postcss.config.js` file.  Note `postcss` isn't explicitly installed or used anywhere - passing in a `postcss.config.js` to `tailwindcss` is all that's needed.

A starter config file for TailBlazor using the new Tailwind CLI / JIT experience looks like this:

```
module.exports = {
    plugins: {
        'postcss-import': {},
        tailwindcss: {}
    }
};
```

So stick that alongside the `tailwind.config.js`.

A bit of an expanding-brain meme here: When using the `tailwindcss` CLI, we'll pass in `postcss.config.js` and `site.css`. It in turn uses PostCSS to process `site.css` with the plugins listed in `postcss.config.js`[^2^](/setup#postcss-plugins){#f2}. One of which is `tailwindcss`. 🤔 🧠 🤯.

### package.json - helper scripts

In `package.json` you'll see the following:

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

Just connecting the dots here - pointing the `tailwindcss` CLI at the relevant config, input, and output files. It's only minified in the case of `publish` but i like to use a `*.min.css` extension to more easily distinguish the files.

---

Finally !  Having set up the config and `site.css`, running `npm run build` will take the Tailwind-flavored `site.css` and feeds it through whatever tools are listed in `postcss.config.js` top-down and output vanilla CSS to `site.min.css`

---

## .NET/Blazor configuration

We've come full circle - time to link the generated CSS in your markup files: add `<link href="./wwwroot/site.min.css" rel="stylesheet">` to `index.html`.

Again, for other project types the proper place(s) to link this will be different.

---

# Hooking up CSS Isolation {#scopedcss}

Idiomatic usage of Tailwind puts the bulk of CSS into your markup's `class=""` attributes, but it also features an `@apply` directive to easily pull out lengthy or frequently used class strings into a CSS class.

<details open>
    <summary>Before</summary>

`foo.html`:

```
<h1 class="long list of utility classes we want to extract for whatever reason">Hello World</h1>
```

</details>

<details open>
    <summary>After</summary>

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

</details>

A simple copy/paste, no longhand translation needed.  (Mind the CSS placement subtleties...)

Moving on. Blazor has a handy feature, [CSS Isolation](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation?view=aspnetcore-6.0){ target="_blank"}. By placing `Foo.razor.css` alongside a component's `Foo.razor`, whatever CSS we put in `Foo.razor.css` is scoped to that component - cooking up special class names is now optional:

<details open>
    <summary>Before</summary>

`Foo.razor`:

```
<h1 class="long list of utility classes we want to extract for whatever reason">Hello World</h1>
```
</details>
<details open>
    <summary>After</summary>
    
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

</details>

Styles applied to `h1` only apply to the `Foo` component. From the docs:

> For each styled component, an HTML attribute is appended with the format b-{STRING}, where the {STRING} placeholder is a ten-character string generated by the framework. The identifier is unique for each app. In the rendered Counter component, Blazor appends a scope identifier to the h1 element: `<h1 b-3xxtam6d07>`

<br/>

> CSS isolation occurs at build time. Blazor rewrites CSS selectors to match markup rendered by the component. The rewritten CSS styles are bundled and produced as a static asset.

Here comes the necessary tweaks: linking the generated bundle as described in [the docs](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation?view=aspnetcore-6.0#css-isolation-bundling){ target="_blank"} limits us to vanilla CSS for CSS Isolation.

The generated bundle of interest is by default output to `obj\{CONFIGURATION}\{TARGET FRAMEWORK}\scopedcss\bundle\{ASSEMBLY NAME}.styles.css` and copied to `wwwroot` when the project is published. If you're OK with using vanilla CSS in your scoped CSS files, toss in `<link href="{ASSEMBLY NAME}.styles.css" rel="stylesheet">` as described in the link above and you're done. Taking advantage of Tailwind CSS (and other PostCSS tools such as `nesting`) within your Components' `*.razor.css` files takes a couple of tweaks, but it is well worth it.

First a quick tweak to the `csproj` file:

::: pre
`<PropertyGroup>` \
    `<TargetFramework>net6.0</TargetFramework>` \
    `<Nullable>enable</Nullable>` \
    `<ImplicitUsings>enable</ImplicitUsings>` \
    ++`    <AppendTargetFrameworkToOutputPath>false</AppendTargetFrameworkToOutputPath>`++ \
    ++`    <IntermediateOutputPath>obj</IntermediateOutputPath>`++ \
`</PropertyGroup>`
:::

This changes the output path of the project's Scoped CSS bundle from `\obj\net6.0\{Debug|Release}\scopedcss\bundle` to a constant `\obj\scopedcss\bundle`.  Now, running a `dotnet build`, it'll output the Scoped CSS bundle to `\obj\scopedcss\bundle\site.styles.css`.  (Assuming a project named `site.csproj`)  Add this file to the root CSS created earler, `site.css` here:

<pre>
<code>@import "tailwindcss/base";</code>
<code>@import "tailwindcss/components";</code>
<code>@import "tailwindcss/utilities";</code>
<code><ins>@import "./obj/scopedcss/bundle/site.styles.css";</ins></code>
</pre>

And voila, consequent `npm run` commands will transform it to vanilla CSS for you and bundle it up in `site.min.css` - no need to link it on its own as the docs describe.

---

Some Footnotes...

- `npm install` vs `dotnet` `package`/`tool` {#npm-install .md-footnote}

  `npm install` is analogous to a `dotnet add package` for most use cases. But here we're using `npm install -D` *(`-D` being short for `--save-dev`)* - which is more like a [`dotnet tool install`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-install){ target="_blank"}. These are used when the packages being installed are _development tools_, not _project dependencies_. `dotnet tool install` isn't used nearly as much as `npm install -D`, much less with _local_ tools. You may remember when `dotnet watch` was a global tool that needed [to be installed](https://www.nuget.org/packages/dotnet-watch){ target="_blank"}. Some handy dotnet global tools are [`dotnet format`](https://www.nuget.org/packages/dotnet-format/){ target="_blank"}, [`dotnet outdated`](https://www.nuget.org/packages/dotnet-outdated-tool/){ target="_blank"}, and [`dotnet script`](https://www.nuget.org/packages/dotnet-script/){ target="_blank"} for C# scripting and a REPL, with VSCode debugging support. [back to text](/setup#f1){.md-footnote .return}

- Special PostCSS Plugins {#postcss-plugins .md-footnote}

  Along with `autoprefixer` and optionally `cssnano`. Again, see [notes](/notes#CLI){ target="_blank"}. [back to text](/setup#f2){.md-footnote .return}

---

<br>