
# 0.3.1

* Add a `no-hover` screen to demonstrate [custom media queries](https://tailwindcss.com/docs/breakpoints#custom-media-queries) and stacking [variants](https://tailwindcss.com/docs/hover-focus-and-other-states): Using a device with no "mouse-hover" capability, every other PersonCard will use a serif font, by adding `screens: { 'no-hover': { 'raw': '(hover:none)' } }` to `tailwind.config.js` and `no-hover:even:font-serif` to the `<li>` surrounding `<PersonCard />`

# 0.3

* Upgrade to Tailwind 2.2
  * Remove `autoprefixer` and `postcss-csso` dependencies as Tailwind 2.2 takes care of this now.
  * Remove `cross-env`, `postcss`, `postcss-cli` as the new Tailwind CLI takes care of this.
  * Remove now-redundant `transform` classes.

* Upgrade Blazor projects to .NET 6 Preview 5
  * Remove "Content Watch" msbuild workarounds as that issue seems to have been fixed, and the workaround broke Hot Reload, so... yeah.
  * Tiny regression: In 0.2 i added `--configuration vscode` to `launch.json` and a build Target to `Shared.csproj` that would do a one-off Tailwind build when the build configuration is `Debug`.  The end result being, the default `dotnet run` and Visual Studio 'F5' experience would be as good as i can come up with: a fresh but non-watching CSS build.  (Figuring out how to launch the `watch-*` npm script without blocking the build in those contexts is key to this project, but i am not an msbuild guru.)  However, Hot Reload only works in `Debug` configuration, so i had to remove the `vscode` configs from `launch.json`.  This results in an initial redundant one-off build in VS Code's 'F5' experience, but near-instant Blazor Hot reload & ~100ms Tailwind JIT builds will be the norm, unless `dotnet watch` decides you've made a "rude edit", kicking off a full rebuild of the C# & CSS.

Minor Fixes/Improvements:
* The card animation where the row of cards was almost done scrolling left (with '90vw' to go) the animation would sometimes become sluggish and the remaining '90vw' of cards would be invisible.  `backface-visibility: hidden;` fixes this, somehow.
* Null guard on PersonCard.
* Use `line-clamp` Tailwind plugin on Person.Bio
* Include API project's `local.settings.json` - not standard practice but it is required boilerplate info.

# 0.2.1

* Fix CVE-2021-23364

# 0.2

## Scoped CSS:

* Removed Build Configuration (`Debug`/`Release`/etc) from the intermediate output path in `Shared` - solving the CSS scoping issue caused by using `Debug` css in `Release` builds.
  No more [manually specifying](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation?view=aspnetcore-5.0#customize-scope-identifier-format) non-random scopes !
---

## CSS Build & Automation:

* Correct npm scripts: prior `build-***` scripts were not blocking the build because they were not running to completion !

* Release mode `Target` in csproj to build/minify CSS on Publish/Deploy
* Debug mode `Target` in csproj to build CSS via Visual Studio "F5"
* Use `--configuration vscode` in launch.json, bypassing default `Debug` behavior when using VS Code "F5".

### Summary:

| Context                | Build Configuration      | npm script     | behavior                                                                                           |
| :--------------------- | :----------------------- | :------------- | :------------------------------------------------------------------------------------------------- |
| VS "F5"                | Debug (default)          | build-client   | one-off build; does not take advantage of tailwind JIT                                             |
| VS Code "F5"           | vscode (via launch.json) | watch-client   | tailwind/postcss watches files independent of `dotnet watch`, stops when done running.             |
| Static Web Apps deploy | Release (default)        | publish-client | minifies.                                                                                          |
| `dotnet watch run`     | Debug (default)          | build-client   | also does not take advantage of tailwind JIT: rebuilds css from scratch each time `watch` rebuilds |  |
 
### Also: 
  
* Add `<Content Update="@(Content)" Watch="false" />` to csproj files.
  Without this, relying on `dotnet watch` + `build-***` to output `site.min.css` (ie, Visual Studio "F5" as described above) would result in an endless build=>rebuild loop.
  https://github.com/dotnet/aspnetcore/issues/27775 

---

## GitHub Workflow / Azure Static Web Apps Deployment:

* Do a full `dotnet publish` of the project prior to the Deployment step, feeding it the ready-built `app_location`.  Removes redundant .NET install/build steps.


---

# 0.1
* Add changelog, contributing, code of conduct, etc