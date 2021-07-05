# A reference setup for using Blazor with Tailwind JIT

👉 See [TailBlazorLite](https://github.com/McNerdius/TailBlazorLite) for just the default Blazor WASM project template, minus Bootstrap, plus Tailwind JIT & VS Code "F5" hooked up.

## Quick overview:

* Taking full advantage of Tailwind's great new [JIT mode](https://tailwindcss.com/docs/just-in-time-mode) intermediate builds, by using background `npm` tasks rather than relying on `dotnet watch` / msbuild to do a full rebuild.
* Coupling Tailwind CSS with Blazor [CSS Isolation](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation), by referencing the `Shared` Razor Class Library's intermediate CSS bundle.
* Optimal "F5" debug/run experience, with the above (isolation/JIT) in mind - Everything should Just Work™ in VS Code.  Not so much for Visual Studio or `dotnet watch` - Hot Reload won't trigger a one-off Tailwind Build; Run `npm watch-client` (or `-server`) manually and Hot Reload will pick it up, though.
* Implementing a Light/Dark/System mode switcher, using Tailwind's [`class` dark Mode](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually) & Blazor's JS Isolation/Interop.
* Integrating CSS Variables with Tailwind Config - configuring an `accent` color in `tailwind.config.js` equal to `var(--accent-color)` so that anywhere `accent` is used (`ring-accent` and `border-accent` here, but `bg-`, `text-`, etc as well), changes to `--accent-color` will be reflected.  Click the page to see it in action.  
* UI in a separate project (`Shared`) so it can be used by existing and upcoming Blazor project types as well as MVC/Razor Pages.
* Azure Functions API & Azure Static Web Apps Deployment.
* Basic Dependency Injection in each project.

---

I'll link a more detailed post in the future, but for now i'll run through the key steps.  Here's the deployed [Static Web App](https://polite-sky-006af1d1e.azurestaticapps.net/).  The animation used to demonstrate DI, CSS Isolation, and a bunch of Tailwind features is inspired by one on [TailwindCSS.com](https://tailwindcss.com/)

---

# Prerequisites

* [dotnet 6 preview 5 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
* latest [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-local) for the API
* [Azurite](https://docs.microsoft.com/en-us/azure/storage/common/storage-use-azurite) for Azure Functions debugging.  After installing the VS Code extension, i'm able to run the API outside VS Code and it works fine.  (The Visual Studio 2019 Preview installer lists the deprecated "Azure Storage Emulator" under Individual Components which works fine but may have to be started manually.)
* [node.js](https://nodejs.org/en/download/).

This project is currently geared more toward [VS Code](https://code.visualstudio.com/download) as i am a fan and it is easy to create an "F5" experience that takes full advantage of both Tailwind JIT incremental builds and dotnet Hot Reload.  See `.vscode/settings.json` for some settings that light up the same "code styles" (see [this](https://docs.microsoft.com/en-us/visualstudio/ide/code-styles-and-code-cleanup?view=vs-2019#code-styles-in-editorconfig-files), [this](https://docs.microsoft.com/en-us/visualstudio/ide/create-portable-custom-editor-options?view=vs-2019), and [this](https://docs.microsoft.com/en-us/dotnet/fundamentals/code-analysis/configuration-options?view=vs-2019)) and analyzers/fixes/refactorings featured in Visual Studio, but provided by Roslyn.  Also note `.vscode/extensions.json`' suggestions, if you have the recommendations "muted".  `bradlc.vscode-tailwindcss` in particular - it provides intellisense, linting, and [css previews](Assets/preview.png) for Tailwind.

---

# Clone / Debug notes

* `Shared.csproj` has a few "Targets" that run each build.  They're required, but also possibly redundant.  (Better to have things "just work" at first and "work better" later, i suppose ?)
  * `npm check` Target checks for the prerequisite `node.js`/`npm`.
  * `npm install` Target runs `npm install`.
  * `tailwind build` Target does a one-off Tailwind CSS build.  If you're using my launch configurations in VS Code, this is redundant and only slows things down.
* The first time launching the project in VS Code, it will [complain](Assets/no_tracker.png) about the `start tailwind jit/watch` Task having "no [problem matcher](https://code.visualstudio.com/Docs/editor/tasks#_processing-task-output-with-problem-matchers)".  This isn't an error so much as an omission - the Tasks "just work" and cooking up [whatever regex](https://code.visualstudio.com/docs/editor/tasks#_defining-a-problem-matcher) it's after isn't on my to-do list.  (PR welcome tho.)
* When F5'ing one of the "Client & API" configs, VS Code due to them building in parallel - one or the other build may fail.  Doing a single full solution build followed by running the projects sans-build is not an option: `func start --no-build` fails for reasons i haven't figured out, and `dotnet watch run --no-build` would render `watch` useless.  (`--no-first-build` would be nice...)  That's why the "API: Watch/Debug" and "Client ONLY: Watch/Debug" configs exist - normally you wouldn't run just one or the other.  Kill the errored task terminals and try again with those.
* The referenced `Shared.styles.css` is generated by Blazor.  As such, attempting to build the final CSS without first building the Blazor projects will fail.  `npm` will complain "Error: Failed to find '.../Shared.styles.css'", just build the solution or `Shared.csproj` if this issue surfaces.  I've set up [a task](https://github.com/McNerdius/TailBlazor/blob/512a22af099a91ad23d2e53fb0ae8bacb5c05c46/.vscode/tasks.json#L77) to do this when the project is opened in VS Code.
* Take a look at the note about "rude edits" prompts in .NET 6 preview 5 [here](https://devblogs.microsoft.com/aspnet/asp-net-core-updates-in-net-6-preview-5/#net-hot-reload-updates-for-dotnet-watch) 

---

# From Scratch

## Step 1 - Scaffold the C# projects

Templates used for the projects:

| project | template used                                                              | notes                                                                                                                                                                                           |
| :------ | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Client  | `dotnet new blazorwasm`                                                    | `Index.razor` and  `MainLayout.razor` are moved to `Shared`, lots of "fluff" removed from this and `Server`                                                                                     |
| Shared  | `dotnet new razorclasslib`                                                 | Where Shared Razor & CSS goes                                                                                                                                                                   |
| Server  | `dotnet new blazorserver`                                                  | I'm only deploying `Client`, but ensuring shared UI plays nicely with Blazor Server projects is a good idea.  Blazor Server can make for more productive development/debugging as well.         |
| Core    | `dotnet new classlib --framework netstandard2.1`                           | Code common to all projects.  Needs to be `netstandard2.1` so it is compatible with `API` and to keep Azure Static Web Apps `oryx` build system happy.  Hoping to get it all on `net5.0`+ ASAP. |
| API     | `func new --worker-runtime dotnet --template HttpTrigger --name GetPeople` |                                                                                                                                                                                                 |

Followed by things like... stripping out Bootstrap, `dotnet new sln` / `dotnet sln add ...`, adding `AdditionalAssemblies="new[] { typeof(DarkSwitch).Assembly }"` to both Client & Server's `App.razor`'s `<Router>` after `AppAssembly=`, and fixing up `using` statements.

---

## Step 2 - Set up CSS Tools

Note: as i write this, TailwindCSS 2.2 has just been released and the [Installation Docs](https://tailwindcss.com/docs/installation) haven't been fully updated.  

## - Installation

* `npm init --yes` - initializes a `package.json` using defaults.  This is where CSS build scripts and tool references will go.
* `npm install -D postcss-import@latest tailwindcss@latest` -The CSS tools we'll use.
  
## - PostCSS configuration

PostCSS is like plumbing, feeding your input CSS sequentially through steps specified in `postcss.config.js` before outputting the final CSS to disk.  Prior to Tailwind 2.2, PostCSS had a more central role in this project: it's where CSS minification and enhanced cross-browser support via `autoprefixer` happened (followed by `tailwindcss` itself).  Tailwind 2.2 takes care of minification and prefixing for us.  If not for `postcss-import`, we wouldn't have to install that or use `postcss.config.js`.  (What `postcss-import` does is aggregates any CSS files you `@import` into one in-memory file before feeding it to `tailwindcss`.)

## - Tailwind configuration

`npx tailwind init` writes a [`tailwind.config.js` template](https://github.com/McNerdius/TailBlazor/blob/main/tailwind.config.js) to disk.  The changes to note are:
  
  * Enabling JIT mode (line 7)
  * Enabling CSS class-based dark mode. (line 8)
  * Pointing it at our html markup, so JIT can keep an eye on what Tailwind features are being used and generate the appropriate CSS.  (lines 4-6).  (The `purge` array is borrowed from pre-JIT mode, where loads of utilitiy classes would be generated, and then those that *were not* in use in these files would be purged, hence the name.)
  
  Now, the main CSS file will need [a few key `@import`s](https://tailwindcss.com/docs/installation#include-tailwind-in-your-css) for Tailwind to do its magic.  I've put that file in the root, `site.css`.  Note the reference to `Shared.css` in there, which in turn points to the Blazor-generated `Shared.styles.css` - i'll come back to that below.

## - NPM scripts configuration

This is where we tell the Tailwind CLI what to do, in [package.json](https://github.com/McNerdius/TailBlazor/blob/main/package.json#L13) - transforming our five line CSS "master" file into kilobytes of generated CSS based on what Tailwind utilities are used in markup and any `tailwind.config.js` tweaks.

They are mostly the same, `build-***` being simplest:

`npx tailwindcss --config tailwind.config.js --postcss postcss.config.js -i site.css -o ./***/wwwroot/site.min.css`

Just pointing it at the  `tailwind.config.js` and `postcss.config.js` config files, and the input & output files, nothing special.  This does a full, one-off build.  It is the "slow" option.

* The `watch` script, as you'd expect, adds `--watch` to the command line.  Edits to CSS files will trigger very fast incremental builds.  This is integrated into the VS Code "F5" launch configurations, and what you'll want to run behind the scenes if using Visual Studio or vanilla `dotnet` CLI.
  
* The `publish` script just adds minification to a one-off build, used for deployment.
  
## Step 3 - CSS Isolation

* The "normal" way to use CSS Isolation is [described here](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation?view=aspnetcore-5.0#css-isolation-bundling).  But we can't do that and take full advantage of Tailwind CSS / PostCSS (`@apply` and other directives), so we need to `@import` the "intermediate" bundle of the Scoped CSS located at `/Shared/obj/scopedcss/bundle/Shared.styles.css`.

## Step 4 - Set up Build

An optimal "F5" experience requires the following:

1) Start `API` (for `Client` only)
2) Start `tailwindcss --watch` to get Tailwind's fast incremental builds.
3) Start `dotnet watch run ***` to get Blazor's Hot Reload.
   a) Do NOT run `tailwindcss` when `Shared` builds.
4) Stop `tailwindcss --watch` when `dotnet watch` exits.
   
I've got that all sorted for VS Code in `tasks.json` / `launch.json` but haven't come up with an uncompromising solution for Visual Studio.  I've put a [build Target](https://github.com/McNerdius/TailBlazor/blob/main/Shared/Shared.csproj#L27) in the `.csproj` to do a full (non-JIT) CSS build - but that task can't "watch" as it would stall the build.  One could run `watch` as a pre-build task in Visual Studio (Right Click on the project, go to Properties, then Build Events) - but this would result in multiple instances.  Best to just manually start it in an external terminal and leave it run until you're done working ?  Note if you're using VS Code, removing that build Target is needed to sastisfy "3.a".

(Ideally, we'd be able to watch a debug session, but that combo [isn't compatible](https://github.com/dotnet/aspnetcore/issues/5456#issuecomment-726993425) with Hot Reload.)

To start API alongside Client in Visual Studio, right-click on the Solution and go to "Set Startup Projects" and use "Multiple Startup Projects."

## Step 5 - Set up Deploy

Steps [have been added](https://github.com/McNerdius/TailBlazor/blob/main/.github/workflows/azure-static-web-apps-polite-sky-006af1d1e.yml#L23) to the GitHub Workflow `yml` file.  The Static Web Apps Build/Deploy doesn't automatically install node.js so i've done it all beforehand, feeding the freshly-published directory to `app_location` where before that would have pointed to the to-be-published project's root folder.
