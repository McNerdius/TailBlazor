# A reference setup for using Blazor with Tailwind JIT

## Repository Goals/Features:

* UI in a separate project so it can be used by existing and upcoming Blazor project types as well as MVC/Razor Pages.
* Coupling Tailwind CSS `@apply` with Blazor [CSS Isolation](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation) / Bundling.
* Taking full advantage of Tailwind's great new [JIT mode](https://tailwindcss.com/docs/just-in-time-mode).
* Optimal "F5" debug/run experience, with the above (isolation/JIT) in mind.
* Implementing a Light/Dark/System theme switcher, using Tailwind's [`class` darkMode](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually).
* Azure Functions API & Azure Static Web Apps Deployment.
* Basic Dependency Injection in each project.

---

I'll link a more detailed post in the future, but for now i'll run through the key steps.  Here's the deployed [Static Web App](https://polite-sky-006af1d1e.azurestaticapps.net/).

---

# Step 1 - Scaffold the C# projects

Prerequisites... [dotnet sdk](https://dotnet.microsoft.com/download/dotnet/5.0) and [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-local).

* in the project folder...
* `dotnet new blazorwasm -o Client`
* `dotnet new razorclasslib -o Shared` - Where Shared UI will go.  
* `dotnet new classlib -o Core` - Code common to all projects.
* `dotnet add .\Client\ reference .\Shared` - (tab completion for the win, punching in the paths.)
* `dotnet add .\Client\ reference .\Core`

* `dotnet new blazorserver -o Server`.  I'm only deploying `Client`, but ensuring shared UI plays nicely with Blazor Server projects is a good idea.  Blazor Server can make for more productive development/debugging as well.
* `dotnet add .\Server\ reference .\Shared` 
* `dotnet add .\Server\ reference .\Core` 

* in `/API` subfolder: `func new --worker-runtime dotnet --template HttpTrigger --name GetPeople`
* back in project folder: 
* `dotnet add .\API\ reference .\Core`
* `dotnet new sln` - Creates a Solution file, taking its name from the folder it's in.  (pass `-n whatever` to create `whatever.sln`)
* `dotnet sln add .\Client\ .\Server\ .\Shared\ .\Core\ .\API\ ` (again, tab completion for the win here)

Followed by things like... moving `Index.razor`, `MainLayout.razor` to `Shared` and adding `AdditionalAssemblies="new[] { typeof(DarkSwitch).Assembly }"` to both Client & Server's `App.razor`'s `<Router>` after `AppAssembly=`, removing Bootstrap/demo components and stylesheet references, and fixing up `using` statements.

# Step 2 - Set up CSS Tools

## Installation

Prerequisite is [node.js](https://nodejs.org/en/download/).

* `npm init --yes` - initializes a `package.json` using defaults.  This is where CSS build scripts and tool references will go.
* `npm install -D postcss@latest postcss-cli@latest postcss-import@latest postcss-csso@latest tailwindcss@latest autoprefixer@latest` - All of the CSS tools we'll use.
  
## PostCSS configuration

Tailwind CSS is one of four steps that take place to create the CSS the browser sees.  PostCSS is the plumbing, feeding input CSS sequentially through those four steps, and writes the result to disk.  [postcss.config.js](https://github.com/McNerdius/TailBlazor/blob/main/postcss.config.js) is where those steps are defined: `postcss-import` aggregates any files you `@import` in your input CSS file into one large in-memory file, feeds that to `tailwindcss` to add on its generated CSS, then to `autoprefixer` to cross-browserify it all, then `postcss-csso` to shrink it down - but only for production builds.

## Tailwind configuration

`npx tailwind init` writes a [`tailwind.config.js` template](https://github.com/McNerdius/TailBlazor/blob/main/tailwind.config.js) to disk.  The changes to note are:
  
  * Enabling JIT mode (line 7)
  * Enabling class-based dark mode.
  * Pointing it at our html markup, so JIT can keep an eye on what Tailwind features we're using and generate the appropriate CSS.  (lines 4-6).  (The `purge` array is borrowed from pre-JIT mode, where loads of CSS would be generated, and then what you weren't using would be purged, hence the name.)
  
  Now, the main CSS file will need [a few key `@import`s](https://tailwindcss.com/docs/installation#include-tailwind-in-your-css) for Tailwind to do its magic.  I've put that file at [`/Shared/Styles/tailwind.css`](https://github.com/McNerdius/TailBlazor/blob/main/Shared/Styles/tailwind.css).  Note the reference to `Shared.styles.css` in there - that's the "Scoped CSS" intermediate build - i'll come back to that below.

## NPM scripts configuration

This is where we tell PostCSS what to do, in [package.json](https://github.com/McNerdius/TailBlazor/blob/main/package.json#L13).  The `watch-***` scripts are the full-on Tailwind JIT long-running tasks that take CSS re-builds from several seconds down to ~100ms.  The `build-***` scripts do a one-off build where long-running isn't possible or needed.  The `publish-client` script is used only for Static Web Apps deployment and is the only one that minifies the CSS, making the non-publish builds faster and more readable.

# Step 3 - Scoped CSS

A couple steps need to be taken here to make Tailwind & Scoped CSS cooperate.

* The "normal" way to use Scoped CSS is [described here](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation?view=aspnetcore-5.0#css-isolation-bundling).  But we can't do that and take full advantage of Tailwind CSS (`@apply` and other directives), so we need to `@import` the "intermediate" bundle of the Scoped CSS located at `/Shared/obj/Debug/net5.0/scopedcss/bundle/Shared.styles.css`.  See this in action in `tailwind.css` as mentioned above.
* Blazor CSS isolation uses random scope identifiers by default.  This together with the above breaks things when the project is deployed - the CSS output by PostCSS is based on a Debug build, but the CSS embedded in the compiled razor components is based on a Release build - different random scopes !  The fix is to [assign a CssScope](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation?view=aspnetcore-5.0#css-isolation-configuration) when you use CSS isolation.  [`Shared.csproj`](https://github.com/McNerdius/TailBlazor/blob/main/Shared/Shared.csproj#L17) shows this in action for `PersonCard`.

# Step 4 - Set up Build

A smooth "F5" experience using `dotnet watch` requires the following: (Debug is simpler, as there are no automated rebuilds.)

1) Start `API`
2) Start `watch-client`
3) Start `dotnet watch run ./Client/`
   * Do NOT restart `watch-client` during an automated `dotnet watch` rebuild.  This would add several seconds !
4) Stop `watch-client` when `dotnet watch` exits.
   
I've got that all sorted for VS Code in `tasks.json` / `launch.json` but haven't come up with an uncompromising solution for Visual Studio.  I've commented out some Build tasks to Client & Server `.csproj` files that do a full (non-JIT) CSS rebuild - but that task can't "watch" as it would stall the build.  One could run `watch-***` as a pre-build task in Visual Studio, but they wouldn't automatically stop.

# Step 5 - Set up Deploy

Steps have been added to the GitHub Actions `yaml` file to build the CSS in "publish" mode, prior to the usual Static Web Apps steps.