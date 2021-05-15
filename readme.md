# A reference setup for using Blazor with Tailwind JIT

## Quick overview:

* UI in a separate project (`Shared`) so it can be used by existing and upcoming Blazor project types as well as MVC/Razor Pages.
* Coupling Tailwind CSS `@apply` with Blazor [CSS Isolation](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation) / Bundling, by referencing the intermediate build of the `Shared` project's CSS.
* Taking full advantage of Tailwind's great new [JIT mode](https://tailwindcss.com/docs/just-in-time-mode), by using an `npm` task rather than relying on `dotnet watch` which would do a full rebuild.
* Optimal "F5" debug/run experience, with the above (isolation/JIT) in mind - Everything should Just Work™ in VS Code, but having tailwind JIT run "behind" VS Debug or `dotnet watch` is another story, hopefully an msbuild guru can help figure this one out.
* Implementing a Light/Dark/System theme switcher, using Tailwind's [`class` darkMode](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually) & Blazor's JS Isolation/Interop.
* Azure Functions API & Azure Static Web Apps Deployment.
* Basic Dependency Injection in each project.

---

I'll link a more detailed post in the future, but for now i'll run through the key steps.  Here's the deployed [Static Web App](https://polite-sky-006af1d1e.azurestaticapps.net/).  The animation used to demonstrate DI, CSS Isolation, and a bunch of Tailwind features is inspired by one on [TailwindCSS.com](https://tailwindcss.com/)

---

# Step 1 - Scaffold the C# projects

Prerequisites... [dotnet SDK](https://dotnet.microsoft.com/download/dotnet/5.0) and latest [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-local).

Templates used for the projects:

| project | template used                                                              | notes                                                                                                                                                                                           |
| :------ | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Client  | `dotnet new blazorwasm`                                                    | `Index.razor` and  `MainLayout.razor` are moved to `Shared`, lots of "fluff" removed from this and `Server`                                                                                     |
| Shared  | `dotnet new razorclasslib`                                                 | Where Shared Razor & CSS goes                                                                                                                                                                   |
| Server  | `dotnet new blazorserver`                                                  | I'm only deploying `Client`, but ensuring shared UI plays nicely with Blazor Server projects is a good idea.  Blazor Server can make for more productive development/debugging as well.         |
| Core    | `dotnet new classlib --framework netstandard2.1`                           | Code common to all projects.  Needs to be `netstandard2.1` so it is compatible with `API` and to keep Azure Static Web Apps `oryx` build system happy.  Hoping to get it all on `net5.0`+ ASAP. |
| API     | `func new --worker-runtime dotnet --template HttpTrigger --name GetPeople` |                                                                                                                                                                                                 |

Followed by things like... `dotnet new sln` / `dotnet sln add ...`, adding `AdditionalAssemblies="new[] { typeof(DarkSwitch).Assembly }"` to both Client & Server's `App.razor`'s `<Router>` after `AppAssembly=`, and fixing up `using` statements.

---

# Step 2 - Set up CSS Tools

## - Installation

Prerequisite is [node.js](https://nodejs.org/en/download/).

* `npm init --yes` - initializes a `package.json` using defaults.  This is where CSS build scripts and tool references will go.
* `npm install -D postcss@latest postcss-cli@latest postcss-import@latest postcss-csso@latest tailwindcss@latest autoprefixer@latest cross-env@latest` - All of the CSS tools we'll use.
  
## - PostCSS configuration

Tailwind CSS is one of four steps that take place to create the CSS the browser sees.  PostCSS is the plumbing, feeding input CSS sequentially through those four steps, and writes the result to disk.  [postcss.config.js](https://github.com/McNerdius/TailBlazor/blob/main/postcss.config.js) is where those steps are defined: `postcss-import` aggregates any files you `@import` in the input CSS file into one large in-memory file, feeds that to `tailwindcss` to insert its generated CSS, then to `autoprefixer` to cross-browserify it all, then `postcss-csso` to shrink it down - but only for production builds.

## - Tailwind configuration

`npx tailwind init` writes a [`tailwind.config.js` template](https://github.com/McNerdius/TailBlazor/blob/main/tailwind.config.js) to disk.  The changes to note are:
  
  * Enabling JIT mode (line 7)
  * Enabling CSS class-based dark mode. (line 8)
  * Pointing it at our html markup, so JIT can keep an eye on what Tailwind features are being used and generate the appropriate CSS.  (lines 4-6).  (The `purge` array is borrowed from pre-JIT mode, where loads of utilitiy classes would be generated, and then those that *were not* in use in these files would be purged, hence the name.)
  
  Now, the main CSS file will need [a few key `@import`s](https://tailwindcss.com/docs/installation#include-tailwind-in-your-css) for Tailwind to do its magic.  I've put that file at [`/Shared/Styles/tailwind.css`](https://github.com/McNerdius/TailBlazor/blob/main/Shared/Styles/tailwind.css).  Note the reference to `Shared.styles.css` in there - that's the "Scoped CSS" intermediate build - i'll come back to that below.

## - NPM scripts configuration

This is where we tell PostCSS what to do, in [package.json](https://github.com/McNerdius/TailBlazor/blob/main/package.json#L13) - transforming our five line CSS "master" file into kilobytes of generated CSS based on what Tailwind utilities are used in markup and any `tailwind.config.js` tweaks.

* The `watch-***` scripts are the full-on Tailwind JIT long-running tasks that take CSS re-builds from several seconds down to ~100ms.
* The `build-***` scripts do a one-off build where long-running isn't possible or needed.  `cross-env TAILWIND_MODE=build` tells tailwind to do a one-off build, `cross-env` is npm magic for setting environment variables in a cross-platform-friendly manner.
* The `publish-***` do one-off builds and minifies the CSS.  The `--env production` is used in our [postcss.config.js](https://github.com/McNerdius/TailBlazor/blob/main/postcss.config.js#L6) toggles on minification and tailwind uses it to disable JIT mode, just as `TAILWIND_MODE=build` would.

# Step 3 - Scoped CSS

* The "normal" way to use Scoped CSS is [described here](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation?view=aspnetcore-5.0#css-isolation-bundling).  But we can't do that and take full advantage of Tailwind CSS (`@apply` and other directives), so we need to `@import` the "intermediate" bundle of the Scoped CSS located at `/Shared/obj/scopedcss/bundle/Shared.styles.css`.  See this in action in `tailwind.css` as mentioned above.

# Step 4 - Set up Build

A smooth "F5" experience using `dotnet watch` requires the following: (Debug is simpler, as there are no automated rebuilds.)

1) Start `API` (for `Client` only)
2) Start a `watch-***` npm script to do an initial css build & keep an eye out for changes.
3) Start `dotnet watch run ***`
   * Do NOT restart `watch-***` npm script during an automated `dotnet watch` rebuild.
4) Stop `watch-***` npm script when `dotnet watch` exits.
   
I've got that all sorted for VS Code in `tasks.json` / `launch.json` but haven't come up with an uncompromising solution for Visual Studio.  I've put a build Target in the `.csproj` to do a full (non-JIT) CSS build - but that task can't "watch" as it would stall the build.  One could run `watch-***` as a pre-build task in Visual Studio (Right Click on the project, go to Properties, then Build Events) - but it wouldn't automatically stop.  Best to just manually start it in an external terminal and leave it run until you're done working ?  (I've filed an issue about this, feel free to comment or PR a solution.) 

To start API alongside Client in Visual Studio, Right click on the Solution and go to "Set Startup Projects" and use "Multiple Startup Projects."

# Step 5 - Set up Deploy

Steps [have been added](https://github.com/McNerdius/TailBlazor/blob/main/.github/workflows/azure-static-web-apps-polite-sky-006af1d1e.yml#L23) to the GitHub Workflow `yaml` file.  The Static Web Apps Build/Deploy doesn't automatically install node.js so i've done it all beforehand, feeding the freshly-published directory to `app_location` where before that would have pointed to the to-be-published project's root folder.