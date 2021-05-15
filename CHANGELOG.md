

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

| Context                | Build Configuration      | npm script     | behavior                                                                                |
| :--------------------- | :----------------------- | :------------- | :-------------------------------------------------------------------------------------- |
| VS "F5"                | Debug (default)          | build-client   | one-off build; does not take advantage of tailwind JIT                                  |
| VS Code "F5"           | vscode (via launch.json) | watch-client   | tailwind/postcss watches files independent of `dotnet watch`, stops when done running.  |
| Static Web Apps deploy | Release (default)        | publish-client | minifies.                                                                                |
| `dotnet watch run`     | Debug (default)          | build-client   | also does not take advantage of tailwind JIT: rebuilds css from scratch each time `watch` rebuilds |                                 |   
 
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