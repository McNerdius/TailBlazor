# 0.21

- Sync csproj, namespace/usings, top-level css, and template names
- Add Blob Storage API to fetch markdown docs
- Rough UI for above docs

# 0.20

- First steps toward a hybrid Reference/Template Pack approach. Making [Runnable Templates](https://github.com/dotnet/templating/wiki/Runnable-Project-Templates) limits the "configurability" of the template since no special syntax is introduced to the source files - meaning the projects can be run locally, as-is. This way the repo can serve both as a 1:1 reference, and be used to create a template pack for nuget.

# 0.11

- Updated to .NET 6.0.100
- Functions API is now using the Isolated/Out-of-Process model, as that will be the only option in .NET 7+.

# v0.10

- Updated to .NET 6 RC2
- Updated to Tailwind 3 alpha 1.
  - Remove `mode: jit` and change `purge` to `content` in `tailwind.config.json`
  - The JIT CDN is a no-go for now. A) How to include `<script>` for non-Release builds only ? B) It wouldn't eliminate the need to watch your `css`: Style changes in `.razor` files would (presumably) be picked up by the JIT CDN script, but changes to `*.css` will still need to be plumbed through PostCSS. Not sure it's worth the added complexity.

# 0.9.1

- Use new [JS Colocation](https://devblogs.microsoft.com/aspnet/asp-net-core-updates-in-net-6-rc-1/#collocate-javascript-files-with-pages-views-and-components) introduced in RC1 for the DarkSwitch component.
- Add `<PageTitle>Home</PageTitle>` to `Index.razor`

# 0.9

- Upgrade to .NET 6 RC1, yay
- Bump Tailwind to 2.2.15
- Move package.json, Tailblazor.sln, etc to `Source` folder

# 0.8

- Pin Static Web Apps deploy task to _**Preview 6**_. _**Preview 7 breaks build and will be skipped.**_
- Prevent redundant npm msbuild Target runs
- Add watch powershell `watch-` scripts to fire up API/Blazor/Tailwind in watch mode similar to the vscode launch configs
  - Prevent redundant `tailwind build` msbuild Target runs using `watch-` scripts or VSCode `F5`
- Touch up readme.md

# 0.7

- Upgrade to .NET 6 preview 6
- Remove the `runOptions - folderOpen` vscode task; add an exception to "unignore" `RazorClassLibrary.styles.css` to gitignore. This is just a first-build-post-clone experience issue: an initial build of `RazorClassLibrary.csproj` to generate this file is required before doing a TailwindCSS build. It only manifests if one is using the CLI directly for both `npx tailwindcss` and `dotnet watch run`, in that order: `tailwindcss` fill fail with `Error: Failed to find './obj/scopedcss/bundle/RazorClassLibrary.styles.css'`.
- Remove `site.min.css` from gitignore for similar reasons. Normally i'd ignore these generated files, but as this is a "getting started" sort of repo, having these files on-disk post clone is probably better.

# 0.6

- Rename the projects, associated npm scripts, and vscode launch configs/tasks - names based on exactly what they are. Shouldn't need a thesaurus to use a reference, right ?
- Redo launch config groupings to reflect expected use, top-to-bottom.

# 0.5.1

- Revert `npm` scripts to the hacky per-project, `wwwroot` output. CSS output to `/Shared/wwwroot/` wasn't being picked up by msbuild [as i'd expect](https://github.com/McNerdius/TailBlazor/issues/34), and csproj Copy tasks aren't picked up by Hot Reload. It was VS Code "F5 friendly" in that Hot Reload and Tailwind `--watch` would (eventually) sync things up, but VS/vanilla `dotnet` CLI would fail on first run and have the prior CSS build on subsequent runs.

# 0.5

- Rearrange CSS structure. See [the issue](https://github.com/McNerdius/TailBlazor/issues/5) for more info.
- Revert `delay` task - `npx tailwindcss` no longer exited post-debug. Look for that "something better" i guess.

# 0.4.5

- Added a workaround for parallel builds "file in use" issue. An initial "build all" followed by a `dotnet watch run --no-build` would be useless, as no subsequent builds would happen on edit. Workaround being, a manual 2 second delay between run/build of API & Client. Something better exists, surely.
- Added `npm check` and `npm install` Targets to Shared.csproj. These are a "first run only" / UX sort of thing that will slow down subsequent builds and can be removed/commented to speed things up if node & the packages are installed. Similar with the `tailwind build` target - if you're using VS Code and the launch configs i've set up, that Target is redundant and can be removed/commented.
- Added in some C# tweaks to `.vscode/settings.json`. The `*EditorConfig` and `*RoslynAnalyzers` settings are particularily important as they bring the C# editing much closer to Visual Studio, are disabled by default, and last i checked they are undocumented.
  - enable full auto-formatting, auto-`using`, semantic highlighting
  - `omnisharp.enableEditorConfigSupport` to enable the same "Code Style" enforcement and formatting featured in Visual Studio, but provided by Roslyn. See [here](https://docs.microsoft.com/en-us/visualstudio/ide/code-styles-and-code-cleanup?view=vs-2019#code-styles-in-editorconfig-files), [here](https://docs.microsoft.com/en-us/visualstudio/ide/create-portable-custom-editor-options?view=vs-2019), and [here](https://docs.microsoft.com/en-us/dotnet/fundamentals/code-analysis/configuration-options?view=vs-2019).
  - `omnisharp.enableRoslynAnalyzers` to enable the same analyzers, code fixes, and refactorings featured in Visual Studio, but again provided by Roslyn.

# 0.4

- DarkSwitch.js redone with theming in mind. It defaults to `system`, matching [Tailwind's `media` mode](https://tailwindcss.com/docs/dark-mode), toggling `dark` based user system settings. More work to be done though, upgrading [`foo`, `bar`, ..., `system`, `dark`] to look like [`foo`, `bar`, ...] \* [`system`, `dark`]. UI work first though.
- Show use of CSS Variables in `tailwind.config.json`. Various classes are defined in `site.css`, each with its own definition of `--accent-color`. In `tailwind.config.js`, `colors.accent` is defined as `var(--accent-color)`. Initially, `accent-green` is placed on a top-level `div`, and clicking on the page then changes that class randomly. I went this route for now as a minimal demonstration of how it all works together - the CSS, the Tailwind Config, the Razor, the JS and JS interop. Eventually DarkSwitch will become ThemeSwitch, for a more real world example.

# 0.3.1

- Add a `no-hover` screen to demonstrate [custom media queries](https://tailwindcss.com/docs/breakpoints#custom-media-queries) and stacking [variants](https://tailwindcss.com/docs/hover-focus-and-other-states): Using a device with no "mouse-hover" capability, every other PersonCard will use a serif font, by adding `screens: { 'no-hover': { 'raw': '(hover:none)' } }` to `tailwind.config.js` and `no-hover:even:font-serif` to the `<li>` surrounding `<PersonCard />`

# 0.3

- Upgrade to Tailwind 2.2

  - Remove `autoprefixer` and `postcss-csso` dependencies as Tailwind 2.2 takes care of this now.
  - Remove `cross-env`, `postcss`, and `postcss-cli` as the new Tailwind CLI takes care of this.
  - Remove now-redundant `transform` classes.

- Upgrade Blazor projects to .NET 6 Preview 5
  - Remove "Content Watch" msbuild workarounds as that issue seems to have been fixed, and the workaround broke Hot Reload, so... yeah.
  - Tiny regression: In 0.2 i added `--configuration vscode` to `launch.json` and a build Target to `Shared.csproj` that would do a one-off Tailwind build when the build configuration is `Debug`. The end result being, the default `dotnet run` and Visual Studio 'F5' experience would be as good as i can come up with: a fresh but non-watching CSS build. (Figuring out how to launch the `watch-*` npm script without blocking the build in those contexts is key to this project, but i am not an msbuild guru.) However, Hot Reload only works in `Debug` configuration, so i had to remove the `vscode` configs from `launch.json`. This results in an initial redundant one-off build in VS Code's 'F5' experience, but near-instant Blazor Hot reload & ~100ms Tailwind JIT builds will be the norm, unless `dotnet watch` decides you've made a "rude edit", kicking off a full rebuild of the C# & CSS.

Minor Fixes/Improvements:

- The card animation where the row of cards was almost done scrolling left (with '90vw' to go) the animation would sometimes become sluggish and the remaining '90vw' of cards would be invisible. `backface-visibility: hidden;` fixes this, somehow.
- Null guard on PersonCard.
- Use `line-clamp` Tailwind plugin on Person.Bio
- Include API project's `local.settings.json` - not standard practice but it is required boilerplate info.

# 0.2.1

- Fix CVE-2021-23364

# 0.2

## Scoped CSS:

- Removed Build Configuration (`Debug`/`Release`/etc) from the intermediate output path in `Shared` - solving the CSS scoping issue caused by using `Debug` css in `Release` builds.
  No more [manually specifying](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation?view=aspnetcore-5.0#customize-scope-identifier-format) non-random scopes !

---

## CSS Build & Automation:

- Correct npm scripts: prior `build-***` scripts were not blocking the build because they were not running to completion !

- Release mode `Target` in csproj to build/minify CSS on Publish/Deploy
- Debug mode `Target` in csproj to build CSS via Visual Studio "F5"
- Use `--configuration vscode` in launch.json, bypassing default `Debug` behavior when using VS Code "F5".

### Summary:

| Context                | Build Configuration      | npm script | behavior                                                                                           |
| :--------------------- | :----------------------- | :--------- | :------------------------------------------------------------------------------------------------- | --- |
| VS "F5"                | Debug (default)          | build      | one-off build; does not take advantage of tailwind JIT                                             |
| VS Code "F5"           | vscode (via launch.json) | watch      | tailwind/postcss watches files independent of `dotnet watch`, stops when done running.             |
| Static Web Apps deploy | Release (default)        | publish    | minifies.                                                                                          |
| `dotnet watch run`     | Debug (default)          | build      | also does not take advantage of tailwind JIT: rebuilds css from scratch each time `watch` rebuilds |     |

### Also:

- Add `<Content Update="@(Content)" Watch="false" />` to csproj files.
  Without this, relying on `dotnet watch` + `build-***` to output `site.min.css` (ie, Visual Studio "F5" as described above) would result in an endless build=>rebuild loop.
  https://github.com/dotnet/aspnetcore/issues/27775

---

## GitHub Workflow / Azure Static Web Apps Deployment:

- Do a full `dotnet publish` of the project prior to the Deployment step, feeding it the ready-built `app_location`. Removes redundant .NET install/build steps.

---

# 0.1

- Add changelog, contributing, code of conduct, etc
