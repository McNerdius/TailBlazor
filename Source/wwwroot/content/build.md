
# Tailwind Incremental Builds, and maybe Hot Reload

So far we've put three more-or-less boilerplate files on disk and installed two packages from `npm` to add Tailwind CSS to the `blazorwasm` template.  Not too shabby.  Getting build & watch set up is pretty easy too, but unfortunately Hot Reload support is inconsistent between .NET project types.

Ideally Hot Reload would ensure you're seeing latest version of your Components and CSS.  For most projects this is the case, but some are ... less Hot Reloady than others.  Having to do a full rebuild to see Razor Component updates for some project types is unfortunate, but also outside the scope of integrating Tailwind CSS into those projects.  Hopefully Hot Reload improves in that regard.

On the Tailwind side of things, nothing fancy is happening - just a fresh CSS file being output to `wwwroot` as needed.  For some project types, Hot Reload doesn't refresh the browser when it sees these changes (yet) - hopefully this seemingly-trivial improvement will come soon.  This [GitHub Issue](https://github.com/dotnet/aspnetcore/issues/37496){target="_blank"} shows a script that reloads the CSS file on a timer.  I think it'd be interesting to make that into a Component - definitely on the todo list.

## Building your CSS with `npm` helper scripts 

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
+  "build": "npx tailwindcss --config tailwind.config.js -i site.css -o ./wwwroot/site.min.css",
+  "watch": "npx tailwindcss --config tailwind.config.js -i site.css -o ./wwwroot/site.min.css --watch",
+  "publish": "npx tailwindcss --config tailwind.config.js -i site.css -o ./wwwroot/site.min.css --minify"
}
```

_(Yes, that is `npx` not `npm`)_

Just connecting the dots here - pointing the `tailwindcss` CLI at the relevant config, input, and output files. It's only minified in the case of `publish` but i like to use a `*.min.css` extension to more easily distinguish the files.  `npm run build` will do a one-off build, `npm run watch` is what gives us the quick incremental builds akin to Hot Reload, and `npm run publish` will do a one-off build, plus `cssnano` minification.

::: info
Finally !  Having created `site.css` and done the initial configuration, running `npm run build` will run `tailwindcss`, using `site.css` and markup specified in `tailwind.config.js`'s `content` section to generate a "vanilla" `site.min.css`.
:::

---

## Automating the `npm` helper scripts

Next, Let's set it up so that `dotnet` CLI - and by extension, your IDE - can care of the `npm` stuff for us.

### Build/Publish

To keep the `*.csproj` clean, i use a special MSBuild "Targets" file, which i cleverly name `tailwindcss.targets`.  Here's an example file:

```xml:tailwindcss.targets
<Project>
    <PropertyGroup>
        <TailwindBuild>true</TailwindBuild>
    </PropertyGroup>
    <Target Name="npm install" BeforeTargets="tailwind build" Inputs="./package.json" Outputs="./node_modules/.install-stamp">
        <Exec Command="npm -v" ContinueOnError="true">
            <Output TaskParameter="ExitCode" PropertyName="error" />
        </Exec>
        <Error Condition="'$(error)' != '0'" Text="install node please !" />
        <Exec Command="npm install" />
        <Touch Files="./node_modules/.install-stamp" AlwaysCreate="true" />
    </Target>
    <Target Name="tailwind build" AfterTargets="AfterBuild" Condition="'$(TailwindBuild)' == 'true'">
        <Message Text="tailwind build target running.." Importance="high"></Message>
        <Exec Command="npm run build" Condition="'$(Configuration)' == 'Debug'"/>
    </Target>
</Project>
```

Let's break it down.

```xml:tailwindcss.targets-p1
<PropertyGroup>
    <TailwindBuild>true</TailwindBuild>
</PropertyGroup>
```

This just defines an MSBuild property we can use like so: `dotnet build -p:TailwindBuild=false` to let us opt out of running the Tailwind build.  Note its use in the following:

```xml:tailwindcss.targets-p2
<Target Name="tailwind build" AfterTargets="AfterBuild" Condition="'$(TailwindBuild)' == 'true'">
    <Message Text="tailwind build target running..." Importance="high"></Message>
    <Exec Command="npm run build" Condition="'$(Configuration)' == 'Debug'"/>
    <Exec Command="npm run publish" Condition="'$(Configuration)' == 'Release'"/>
</Target>
```

`AfterBuild` is a standard MSBuild "Target".  This snippet creates our own cleverly named `tailwind build` Target which runs after `AfterBuild`.  Building in `Release` mode results in a `cssnano`-minified output CSS file, thanks to the `publish` script found in `package.json` using `tailwindcss --minify`.


The next (kinda optional) snippet, also cleverly named `npm install`, actually runs in-between `AfterBuild` and `tailwind build`, doing a sanity check on `npm` stuff:

```xml:tailwindcss.targets-p3
<Target Name="npm install" BeforeTargets="tailwind build" Inputs="./package.json" Outputs="./node_modules/.install-stamp">
    <Exec Command="npm -v" ContinueOnError="true">
        <Output TaskParameter="ExitCode" PropertyName="error" />
    </Exec>
    <Error Condition="'$(error)' != '0'" Text="install node.js please !" />
    <Exec Command="npm install" />
    <Touch Files="./node_modules/.install-stamp" AlwaysCreate="true" />
</Target>
```

If Node.js/npm isn't installed, `npm -v` will fail and you'll get a build error. Otherwise `npm install` will install the dependencies in `package.json` - akin to a `dotnet restore` when used without parameters, but slower.  The `Inputs`/`Outputs`/`Touch` is MSBuild [incremental build](https://docs.microsoft.com/en-us/visualstudio/msbuild/how-to-build-incrementally?view=vs-2022){target="_blank"} magic, preventing this from running **every. single. build.**  -  Just when `package.json` is out of sync with `.install-stamp`.  (A fresh clone, for instance.)  See [here](https://stackoverflow.com/questions/35435041/run-npm-install-only-when-needed-and-or-partially?answertab=active#tab-top){target="_blank"} for the StackOverflow-sauce.  _(note: my experience with this has been inconsistent and i haven't been able to pin it down.  it's not a big productivity hit though, with full builds being so rare.  if you have any info, [please share](https://github.com/McNerdius/TailBlazor/discussions){target="_blank"}!)_  Assuming no errors, things will continue with the `tailwind build` target.  


To actually make use of this in your Blazor project, add it to your `*.csproj`, top-level:

```xml:site.csproj
<Project Sdk="Microsoft.NET.Sdk.BlazorWebAssembly">
+    <Import Project="tailwindcss.targets" />
</Project>
```

---


## Using `dotnet watch` & PowerShell

A simple, sanity-checks-included PowerShell script:

```powershell:watch.ps1
dotnet build -p:TailwindBuild=false
start "dotnet" -ArgumentList "watch" 
while (!(Test-Path "./node_modules/.install-stamp")) { sleep -ms 100 } 
npm run watch
```

Breaking it down:  I've found `dotnet watch` without a proper `dotnet build` beforehand can do strange things sometimes.  It's only once, so whatever.  Using `start` launches `dotnet watch` in its own process.  Unlike the first line in the script, this build will include the `tailwind build` Target, possibly doing an `npm install` for the first time.  Only after `.install-stamp` provides evidence of an `npm install` is it OK to kick off `tailwindcss` via `npm run watch`.  At this point, both .NET's Hot Reload and Tailwind's incremental build mode are watching for relevant changes.

## Using Visual Studio

The best option i've found to integrate `tailwindcss --watch` with Visual Studio UI is to use the [NPM Task Runner](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NpmTaskRunner64){target="_blank"}, and bind the relevant `watch` script to "Project Open". (Not "After Build", see below.)

Keep in mind: one-off `tailwindcss` builds are not ideal.  ***The long-running `tailwindcss --watch` is the only way to take advantage of Tailwind's super-fast incremental builds.***

### Other approaches

- Using a "Post Build Event" in Visual Studio's project properties.

This places an MSBuild Target in the `.csproj` - `<Target Name="PostBuild" AfterTargets="PostBuildEvent">`. This is a no-go for long-running tasks: **this and similar simple MSBuild Target based approaches do one of two things: terminate immediately or (more likely) hang the build.**

- More advanced uses of MSBuild Targets

One example is using [Inline Tasks](https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild-inline-tasks) - essentially embedding code within the `.csproj` (or more ideally, the `tailwindcss.targets` it points to) to kick off the npm task. It works but it's a bit ugly IMO. Visit [See Also](/also) for a project using this approach.

- Using Visual Studio Folders View's "Configure Tasks" / `tasks.vs.json`

This can be used to expose the needed scripts in a right-click menu in the Folder View. A few issues: You have to be in Folder View;  You still have to kick it off manually;  **I couldn't get it to work.** Tried feeding it various combinations of working directories, no dice.

::: info
All in all, using the NPM Task Runner takes little effort and Just Works, without injecting long-running tasks into the `.csproj`/`.targets` build files.
:::
