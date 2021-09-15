# A reference setup for using Blazor with Tailwind JIT

👉 See [TailBlazorLite](https://github.com/McNerdius/TailBlazorLite) for just the default Blazor WASM project template, minus Bootstrap, plus Tailwind JIT & VS Code "F5" hooked up.

## Overview:

- Taking full advantage of Tailwind's great new [JIT mode](https://tailwindcss.com/docs/just-in-time-mode) intermediate builds, by using background `npm` tasks rather than relying on `dotnet watch` / msbuild to do a full rebuild.
- Coupling Tailwind CSS with Blazor [CSS Isolation](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation), by passing the Razor Class Library's intermediate CSS bundle to PostCSS, outputting the final vanilla CSS to `wwwroot`
- Optimal "F5" debug/run experience, with the above (isolation/JIT) in mind - Everything should Just Work™ in VS Code. Not so much for Visual Studio or `dotnet watch` - Hot Reload won't trigger the msbuild Target that kicks off a Tailwind build; Use `npm run watch-wasm` (or `-server`) manually and Hot Reload will pick it up, though. Also included are `watch-*.ps1` scripts that fire up both dotnet and npm in watch mode.
- Implementing a Light/Dark/System mode switcher, using Tailwind's [`class` dark Mode](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually) & Blazor's JS Isolation/Interop.
- Integrating CSS Variables with Tailwind Config - configuring an `accent` color in `tailwind.config.js` equal to `var(--accent-color)` so that anywhere `accent` is used (`ring-accent` and `border-accent` here, but `bg-`, `text-`, etc as well), changes to `--accent-color` will be reflected. Click the page to see it in action.
- UI in a separate project (`RazorClassLibrary`) so it can be used by existing and upcoming Blazor project types as well as MVC/Razor Pages.
- Azure Functions API & Azure Static Web Apps Deployment.
- Basic Dependency Injection in each project.

---

I'll link a more detailed post in the future, but for now i'll run through the key steps. Here's the deployed [Static Web App](https://polite-sky-006af1d1e.azurestaticapps.net/). The animation used to demonstrate DI, CSS Isolation, and a bunch of Tailwind features is inspired by one on [TailwindCSS.com](https://tailwindcss.com/)

---

# Prerequisites

- [dotnet 6 preview 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0). See note at top about Preview 7.
- latest [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-local) for the API
- [Azurite](https://docs.microsoft.com/en-us/azure/storage/common/storage-use-azurite) for Azure Functions debugging. After installing the VS Code extension, i'm able to run the API outside VS Code and it works fine. (The Visual Studio 2019 Preview installer lists the deprecated "Azure Storage Emulator" under Individual Components which works fine but may have to be started manually.)
- [node.js](https://nodejs.org/en/download/).

This project is currently geared more toward [VS Code](https://code.visualstudio.com/download) as i am a fan and it is easy to create an "F5" experience that takes full advantage of both Tailwind JIT incremental builds and dotnet Hot Reload. See `.vscode/settings.json` for some settings that light up the same "code styles" (see [this](https://docs.microsoft.com/en-us/visualstudio/ide/code-styles-and-code-cleanup?view=vs-2019#code-styles-in-editorconfig-files), [this](https://docs.microsoft.com/en-us/visualstudio/ide/create-portable-custom-editor-options?view=vs-2019), and [this](https://docs.microsoft.com/en-us/dotnet/fundamentals/code-analysis/configuration-options?view=vs-2019)) and analyzers/fixes/refactorings featured in Visual Studio, but provided by Roslyn. Also note `.vscode/extensions.json`' suggestions, if you have the recommendations "muted". `bradlc.vscode-tailwindcss` in particular - it provides intellisense, linting, and [css previews](Assets/preview.png) for Tailwind.

---

# Clone / Build / Debug notes

- The first time launching the project in VS Code, it will [complain](Assets/no_tracker.png) about the `start tailwind jit/watch` Task having "no [problem matcher](https://code.visualstudio.com/Docs/editor/tasks#_processing-task-output-with-problem-matchers)". This isn't an error so much as an omission - the Tasks "just work" and cooking up [whatever regex](https://code.visualstudio.com/docs/editor/tasks#_defining-a-problem-matcher) it's after isn't on my to-do list. (PR welcome tho.)
- When F5'ing one of the "WASM & API" configs, VS Code due to them building in parallel - one or the other build may fail. Doing a single full solution build followed by running the projects sans-build is not an option: `func start --no-build` fails for reasons i haven't figured out, and `dotnet watch run --no-build` would render `watch` useless. (`--no-first-build` would be nice...) That's why the "FunctionsAPI: Watch/Debug" and "WASM ONLY: Watch/Debug" configs exist - normally you wouldn't run just one or the other. Kill the errored task terminals and use one of those.
- Take a look at the note about "rude edits" prompts [here](https://devblogs.microsoft.com/aspnet/asp-net-core-updates-in-net-6-preview-5/#net-hot-reload-updates-for-dotnet-watch)

---

# From Scratch

## Step 1 - Scaffold the C# projects

Templates used for the projects:

| project            | template used                                                              | notes                                                                                                                                                                                                  |
| :----------------- | :------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BlaorWasm          | `dotnet new blazorwasm`                                                    | `Index.razor` and `MainLayout.razor` are moved to `RazorClassLibrary`, lots of "fluff" removed from this and `BlazorServer`                                                                            |
| RazorClassLibrary  | `dotnet new razorclasslib`                                                 | Where Shared Razor & CSS goes                                                                                                                                                                          |
| BlazorServer       | `dotnet new blazorserver`                                                  | I'm only deploying `BlazorWasm`, but ensuring shared UI plays nicely with Blazor Server projects is a good idea. Blazor Server can make for more productive development/debugging as well.             |
| SharedClassLibrary | `dotnet new classlib --framework netstandard2.1`                           | Code common to all projects. Needs to be `netstandard2.1` so it is compatible with `FunctionsAPI` and to keep Azure Static Web Apps `oryx` build system happy. Hoping to get it all on `net5.0`+ ASAP. |
| FunctionsAPI       | `func new --worker-runtime dotnet --template HttpTrigger --name GetPeople` |                                                                                                                                                                                                        |

Followed by things like... stripping out Bootstrap, `dotnet new sln` / `dotnet sln add ...`, adding `AdditionalAssemblies="new[] { typeof(DarkSwitch).Assembly }"` to both BlazorWasm & BlazorServer's `App.razor`'s `<Router>` after `AppAssembly=`, and fixing up `using` statements.

### Tweak RazorClassLibrary.csproj a bit:

There are a couple special msbuild "Targets":

- `npm install` - Ensures prerequisite `node.js`/`npm` and package installation. This will only run once, after clone, thanks to `install-stamp`.
- `tailwind build` Target does a one-off Tailwind CSS build. This is bypassed (for Hot Reload / JIT mode usage) by setting the `TailwindBuild` msbuild property to `false`. See a `watch-*.ps1` script or `tasks.json` for this in action. Visual Studio `F5` will run this, as will `dotnet watch run --no-hot-reload`, or a Hot Reload "rude edit" build - but a "normal" Hot Reload _will not_ run this.

The `<IntermediateOutputPath>` property is set to `obj` so that Blazor's intermediate CSS bundles are always output to the same path, omitting `Debug`/`Release`. See Step 3 for more info. `<AppendTargetFrameworkToOutputPath>` similarly omits `net6.0` from the output path - there's no functional reason for this, i'm just shortening the path a bit.

---

## Step 2 - Set up CSS Tools

Note: as i write this, TailwindCSS 2.2 has just been released and the [Installation Docs](https://tailwindcss.com/docs/installation) haven't been fully updated.

## - Installation

- `npm init --yes` - initializes a `package.json` using defaults. This is where CSS build scripts and tool references will go.
- `npm install -D postcss-import@latest tailwindcss@latest` -The CSS tools we'll use.

## - PostCSS configuration

PostCSS is like plumbing, feeding your input CSS sequentially through steps specified in `postcss.config.js` before outputting the final CSS to disk. Prior to Tailwind 2.2, PostCSS had a more central role in this project: it's where CSS minification and enhanced cross-browser support via `autoprefixer` happened (followed by `tailwindcss` itself). Tailwind 2.2 takes care of minification and prefixing for us. `postcss-import` is used to aggregate any CSS files you `@import` into one in-memory file for Tailwind CSS to process.

## - Tailwind configuration

`npx tailwind init` writes a [`tailwind.config.js` template](https://github.com/McNerdius/TailBlazor/blob/main/tailwind.config.js) to disk. The changes to note are:

- Enabling JIT mode (line 7)
- Enabling CSS class-based dark mode. (line 8)
- Pointing it at our html markup, so JIT can keep an eye on what Tailwind features are being used and generate the appropriate CSS. (lines 4-6). (The `purge` array is borrowed from pre-JIT mode, where loads of utilitiy classes would be generated, and then those that _were not_ in use in these files would be purged, hence the name.)

Now, the main CSS file will need [a few key `@import`s](https://tailwindcss.com/docs/installation#include-tailwind-in-your-css) for Tailwind to do its magic. I've put that file in the root, `site.css`. Note the reference to `Shared.css` in there, which in turn points to the Blazor-generated `RazorClassLibrary.styles.css` - i'll come back to that below.

## - NPM scripts configuration

This is where we tell the Tailwind CLI what to do, in [package.json](https://github.com/McNerdius/TailBlazor/blob/main/package.json#L10) - transforming our five line CSS "master" file into kilobytes of generated CSS based on what Tailwind utilities are used in markup and any `tailwind.config.js` tweaks.

They are mostly the same, `build-***` being simplest:

`npx tailwindcss --config tailwind.config.js --postcss postcss.config.js -i site.css -o ./***/wwwroot/site.min.css`

Just pointing it at the `tailwind.config.js` and `postcss.config.js` config files, and the input & output files, nothing special. This does a full, one-off build. It is the "slow" option.

- The `watch` script, as you'd expect, adds `--watch` to the command line. Edits to CSS files will trigger very fast incremental builds. This is integrated into the VS Code "F5" launch configurations, and what you'll want to run behind the scenes if using Visual Studio or vanilla `dotnet` CLI.
- The `publish` script just adds minification to a one-off build, used for deployment.

## Step 3 - CSS Isolation

- The "normal" way to use CSS Isolation is [described here](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation?view=aspnetcore-5.0#css-isolation-bundling). But we can't do that and take full advantage of Tailwind CSS / PostCSS (`@apply` and other directives), so we need to `@import` the "intermediate" bundle of the Scoped CSS located at `/RazorClassLibrary/obj/scopedcss/bundle/RazorClassLibrary.styles.css`.

## Step 4 - Set up Build

An optimal "F5" experience requires the following:

1. Start `FunctionsAPI` (for `BlazorWASM` only)
2. Start `tailwindcss --watch` to get Tailwind's fast incremental builds.
3. Start `dotnet watch run ***` to get Blazor's Hot Reload.
   a) Do NOT run `tailwindcss` when `RazorClassLibrary` builds.
4. Stop `tailwindcss --watch` when `dotnet watch` exits.

I've got that all sorted for VS Code in `tasks.json` / `launch.json` but haven't come up with an uncompromising solution for Visual Studio. I've put a [build Target](https://github.com/McNerdius/TailBlazor/blob/main/Source/RazorClassLibrary/RazorClassLibrary.csproj#L31) in the `.csproj` to do a full (non-JIT) CSS build - but that task can't "watch" as it would stall the build. One could run `watch` as a pre-build task in Visual Studio (Right Click on the project, go to Properties, then Build Events) - but this would result in multiple instances. Best to just manually start it in an external terminal and leave it run until you're done working ? Note if you're using VS Code, removing that build Target is needed to sastisfy "3.a".

(Ideally, we'd be able to watch a debug session, but that combo [isn't compatible](https://github.com/dotnet/aspnetcore/issues/5456#issuecomment-726993425) with Hot Reload.)

To start FunctionsAPI alongside WASM in Visual Studio, right-click on the Solution and go to "Set Startup Projects" and use "Multiple Startup Projects."

## Step 5 - Set up Deploy

Steps [have been added](https://github.com/McNerdius/TailBlazor/blob/main/.github/workflows/azure-static-web-apps-polite-sky-006af1d1e.yml#L23) to the GitHub Workflow `yml` file:

- Install .NET 6 & do an initial build, outputting Blazor's isolated CSS from our \*.razor.css file(s).
- Install Node 14 & feed the isolated CSS into Tailwind CSS, outputting the final `site.min.css`
- Run a `dotnet publish`, [feeding that output path](https://github.com/McNerdius/TailBlazor/blob/main/.github/workflows/azure-static-web-apps-polite-sky-006af1d1e.yml#L56) to the following "Build and Deploy" step.
