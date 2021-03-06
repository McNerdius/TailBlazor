:::: nav

[Intro](build)
[NPM helper scripts](build#helpers)
[MSBuild targets](build#targets)
:::
- [Build or Publish](build#build)
- [Install check](build#install)
- [Opting Out](build#optout)
:::
[CLI](build#cli)
[VS Code](build#vsc)
[Visual Studio](build#vs)

::::

:::: content

# Tailwind Incremental Builds, and maybe Hot Reload {#intro}

So far we've put four more-or-less boilerplate files on disk and installed a single package from `npm` to add Tailwind CSS to the `blazorwasm` template.  Not too shabby.  Getting build & watch set up is pretty easy too, but unfortunately Hot Reload support is inconsistent between .NET project types.

On the Tailwind side of things, nothing fancy is happening - just a fresh CSS file being output to `wwwroot` as needed.  For some project types, Hot Reload doesn't refresh the browser when it sees these changes (yet) - hopefully a fix for this seemingly-trivial issue will come soon.  This [GitHub Issue](https://github.com/dotnet/aspnetcore/issues/37496){target="_blank"} shows a script that reloads the CSS file on a timer.  I think it'd be interesting to make that into a Component - definitely on the todo list.

Ideally Hot Reload would ensure you're seeing latest version of both your Components and CSS.  For some project types this is the case, but some are... less Hot Reloady than others.  Having to do a full rebuild or browser refresh to see updates for some project types is unfortunate, but also outside the scope of integrating Tailwind CSS into those projects.  Hopefully Hot Reload improves in that regard.

## Define `npm` helper scripts {#helpers}

In the default `package.json` you'll see the following:

```json:package.json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

Swap the `"test"` line for the following:

```json:package.json
"scripts": { 
-  "test": "echo \"Error: no test specified\" && exit 1",
+  "build": "npx tailwindcss --config tailwind.config.js --postcss postcss.config.js -i site.css -o ./wwwroot/site.min.css",
+  "watch": "npx tailwindcss --config tailwind.config.js --postcss postcss.config.js -i site.css -o ./wwwroot/site.min.css --watch",
+  "publish": "npx tailwindcss --config tailwind.config.js --postcss postcss.config.js -i site.css -o ./wwwroot/site.min.css --minify"
}
```

_(Yes, that is `npx` not `npm`)_

Connecting the dots here: point the `tailwindcss` CLI at the relevant config, input, and output files.  `npm run build` will do a one-off build, `npm run watch` is what gives us the quick incremental builds akin to Hot Reload, and `npm run publish` will do a one-off build, plus `cssnano` minification.

::: info
Finally !  Having created `site.css` and done the initial configuration, running `npm run build` will run `tailwindcss`, using `site.css` and markup specified in `tailwind.config.js`'s `content` section to generate a vanilla `site.min.css`.
:::

---

## Automate `npm` with MSBuild Targets {#targets}

Next, let's set it up so that `dotnet` CLI or your IDE can care of some of the `npm` stuff for us.

To keep the `*.csproj` clean, i use a special MSBuild "Targets" file, cleverly named `tailwindcss.targets`.  Here's an example file:

```xml:tailwindcss.targets
<Project>
    <PropertyGroup>
        <TailwindBuild>true</TailwindBuild>
    </PropertyGroup>
    <Target Name="NpmInstallCheck" BeforeTargets="TailwindCSS" Inputs="./package.json" Outputs="./node_modules/.package-lock.json">
        <Message Text="NpmInstallCheck Starting..." Importance="high"></Message>
        <Exec Command="npm -v" ContinueOnError="true" StandardOutputImportance="low">
            <Output TaskParameter="ExitCode" PropertyName="error" />
        </Exec>
        <Error Condition="'$(error)' != '0'" Text="install node.js please !" />
        <Exec Command="npm install" />
        <Message Text="NpmInstallCheck Finished !" Importance="high"></Message>
    </Target>
    <Target Name="TailwindCSS" AfterTargets="AfterBuild" Condition="'$(TailwindBuild)' == 'true'">
        <Message Text="TailwindCSS Starting..." Importance="high"></Message>
        <Exec Command="npm run build" Condition="'$(Configuration)' == 'Debug'"/>
        <Exec Command="npm run publish" Condition="'$(Configuration)' == 'Release'"/>
        <Message Text="TailwindCSS Finished !" Importance="high"></Message>
    </Target>
</Project>
```

To actually make use of this in your Blazor project, add it to your `*.csproj`, top-level:

```xml:site.csproj
<Project Sdk="Microsoft.NET.Sdk.BlazorWebAssembly">
+    <Import Project="tailwindcss.targets" />
</Project>
```

---

### The TailwindCSS Target { #build }

This is the essential section:

```xml:tailwindcss.targets-p2
<Target Name="TailwindCSS" AfterTargets="AfterBuild" Condition="'$(TailwindBuild)' == 'true'">
    <Message Text="TailwindCSS Starting..." Importance="high"></Message>
    <Exec Command="npm run build" Condition="'$(Configuration)' == 'Debug'"/>
    <Exec Command="npm run publish" Condition="'$(Configuration)' == 'Release'"/>
    <Message Text="TailwindCSS Finished !" Importance="high"></Message>
</Target>
```

`AfterBuild` is a standard [MSBuild Target](https://docs.microsoft.com/en-us/visualstudio/msbuild/target-element-msbuild){target="_blank"}.  This section defines our own `TailwindCSS` Target which runs after `AfterBuild`.  Building the Blazor project in `Debug` mode does a one-off `tailwindcss` build, and `Release` mode results in a `cssnano`-minified build, thanks to their respective `build` and `publish` scripts found in `package.json`.


### The NpmInstallCheck Target { #install }

The next (kinda optional) snippet actually runs in-between `AfterBuild` and `TailwindCSS` from above, doing a sanity check on `npm` stuff:

```xml:tailwindcss.targets-p3
<Target Name="NpmInstallCheck" BeforeTargets="TailwindCSS" Inputs="./package.json" Outputs="./node_modules/.package-lock.json">
    <Message Text="NpmInstallCheck Starting..." Importance="high"></Message>
    <Exec Command="npm --version" ContinueOnError="true" StandardOutputImportance="low">
        <Output TaskParameter="ExitCode" PropertyName="error" />
    </Exec>
    <Error Condition="'$(error)' != '0'" Text="install node.js please ! https://nodejs.org/" />
    <Exec Command="npm install" />
    <Message Text="NpmInstallCheck Finished !" Importance="high"></Message>
</Target>
```

The `npm --version` command is there to verify Node.js/npm is installed: if it's not, the command will fail and you'll get a build error prompting to install node.js.  Otherwise `npm install` runs.  (When used without parameters `npm install` is akin to a `dotnet restore`, installing/updating dependencies listed in `package.json`, if needed.)

The `Inputs` & `Outputs` are for MSBuild [incremental build](https://docs.microsoft.com/en-us/visualstudio/msbuild/how-to-build-incrementally?view=vs-2022){target="_blank"} magic, preventing this from running **every. single. build.**  If `Inputs` (`package.json`) is newer than `Outputs` (`.package-lock.json`), or `Outputs` doesn't yet exist, the Target is run, otherwise it will be skipped.

See [here](https://stackoverflow.com/questions/35435041/run-npm-install-only-when-needed-and-or-partially?answertab=active#tab-top){target="_blank"} for the StackOverflow-sauce, and [here](https://github.com/McNerdius/TailBlazor/discussions/107){target="_blank"} for some notes on the changes made to the StackOverflow version.

Assuming no errors, things will continue with the `TailwindCSS` target.  

### Opting out { #optout }

The top section just defines an MSBuild property we can use like so: `dotnet build -p:TailwindBuild=false` to let us opt out of running the Tailwind build.  Note its use in the next section.

```xml:tailwindcss.targets-p1 
<PropertyGroup>
    <TailwindBuild>true</TailwindBuild>
</PropertyGroup>
```

---

## Using `dotnet watch` & PowerShell {#cli}

A simple, sanity-checks-included PowerShell script:

```powershell:watch.ps1
dotnet build -p:TailwindBuild=false
start "dotnet" -ArgumentList "watch" 
while (!(Test-Path "./node_modules/.package-lock.json")) { sleep -ms 100 } 
npm run watch
```

Breaking it down:  I've found `dotnet watch` without a proper `dotnet build` beforehand can do strange things sometimes.  It's only once, so whatever.  Using `start` launches `dotnet watch` in its own process.  Unlike the first line in the script, this will include the `tailwind build` Target, possibly doing an `npm install` for the first time.  Only after `.package-lock.json` provides evidence of an `npm install` is it OK to kick off `tailwindcss` via `npm run watch`.  At this point, both .NET's Hot Reload and Tailwind's incremental build mode are watching for relevant changes.

---

## Using VS Code {#vsc}

See the [tailblazor-templates](https://github.com/McNerdius/TailBlazor-Templates/tree/main/Templates/SingleProject/TailBlazorWasm/.vscode){target="_blank"} repo to see launch tasks/configs for various project types.  It's a bit more robust than the `watch.ps1` script but pretty involved.  More to come on this.

---

## Using Visual Studio {#vs}

The best option i've found to integrate `tailwindcss --watch` with Visual Studio UI is to use the [NPM Task Runner](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NpmTaskRunner64){target="_blank"}, and bind the relevant `watch` script to "Project Open". (Not "After Build", see below.)

::: info
One-off `tailwindcss` builds are not ideal.  The long-running `tailwindcss --watch` is the only way to take advantage of Tailwind's super-fast incremental builds.
:::

### Other approaches {#vs-other}

- **Using a "Post Build Event" in Visual Studio's project properties.**

This places an MSBuild Target in the `.csproj` - `<Target Name="PostBuild" AfterTargets="PostBuildEvent">`. **This is a no-go for long-running tasks:** this and similar simple MSBuild Target based approaches do one of two things: terminate immediately or (more likely) hang the build.

- **More advanced uses of MSBuild Targets**

One example is using [Inline Tasks](https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild-inline-tasks) - essentially embedding code within the `.csproj` (or more ideally, the `tailwindcss.targets` it points to) to kick off the npm task. It works but it's a bit ugly IMO. Visit [See Also](/also) for a project using this approach.

- **Using Visual Studio Folders View's "Configure Tasks" / `tasks.vs.json`**

Visual Studio [supports tasks](https://docs.microsoft.com/en-us/visualstudio/ide/customize-build-and-debug-tasks-in-visual-studio?view=vs-2022#define-tasks-with-tasksvsjson) much like VS Code which can be used to expose the needed scripts in a right-click menu in the Folder View. A few issues: You have to be in Folder View;  You still have to kick it off manually;  **I couldn't get it to work.**  Tried feeding it various combinations of working directories, no dice.

::: info
All in all, using the NPM Task Runner with Visual Studio takes little effort and Just Works, without injecting long-running tasks into the `.csproj`/`.targets` build files.
:::


---

::: {.text-xl .italic .light .text-right .pr-6 }
[next: tidy css](/tidy_css)
::: 

::::