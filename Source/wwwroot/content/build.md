# Connecting the dots for build and watch {#top}

To recap there are two build steps: `dotnet build` followed by `npm run build`.  `dotnet build` must run first, as it generates the `*.styles.css` that's referenced in the "root" CSS file `npm run build` points at.

![build](/images/simple.drawio.png)

Let's set it up so that `dotnet build` takes care of the `npm run build` for us.  This covers `dotnet run` and `F5` as well.

## Build/Publish {#build}

To keep the `*.csproj` clean, i use a special MSBuild "Targets" file, which i cleverly name `tailwindcss.targets`.  Here's an example file:

```
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

```
<PropertyGroup>
    <TailwindBuild>true</TailwindBuild>
</PropertyGroup>
```

This just defines an MSBuild property we can use like so: `dotnet build -p:TailwindBuild=false`, used in the following snippet to let us opt out of running the Tailwind build with every `dotnet build`.

```
<Target Name="tailwind build" AfterTargets="AfterBuild" Condition="'$(TailwindBuild)' == 'true'">
    <Message Text="tailwind build target running..." Importance="high"></Message>
    <Exec Command="npm run build" Condition="'$(Configuration)' == 'Debug'"/>
    <Exec Command="npm run publish" Condition="'$(Configuration)' == 'Release'"/>
</Target>
```

`AfterBuild` is a standard MSBuild "Target", and this snippet creates our own which runs after it, cleverly named `tailwind build`.

### NPM Checks {#npm}

The next (optional) snippet, also cleverly named `npm install`, actually runs in-between `AfterBuild` and `tailwind build`, doing a sanity check on `npm` stuff:

```
<Target Name="npm install" BeforeTargets="tailwind build" Inputs="./package.json" Outputs="./node_modules/.install-stamp">
    <Exec Command="npm -v" ContinueOnError="true">
        <Output TaskParameter="ExitCode" PropertyName="error" />
    </Exec>
    <Error Condition="'$(error)' != '0'" Text="install node.js please !" />
    <Exec Command="npm install" />
    <Touch Files="./node_modules/.install-stamp" AlwaysCreate="true" />
</Target>
```

If Node.js/npm isn't installed, `npm -v` will fail and you'll get a build error. Otherwise `npm install` will install the dependencies in `package.json` - akin to a `dotnet restore` when used without parameters, but slower.  The `Inputs`/`Outputs`/`Touch` is MSBuild [incremental build](https://docs.microsoft.com/en-us/visualstudio/msbuild/how-to-build-incrementally?view=vs-2022){ target="_blank"} magic, preventing this from running **every. single. build.**  -  Just when `package.json` is out of sync with `.install-stamp`.  (A fresh clone, for instance.)  See [here](https://stackoverflow.com/questions/35435041/run-npm-install-only-when-needed-and-or-partially?answertab=active#tab-top){ target="_blank"} for the StackOverflow-sauce.  Assuming no errors, things will continue with the `tailwind build` target.  


To actually make use of this in your Blazor project, add it to your `*.csproj`, top-level:

::: pre
`<Project Sdk="Microsoft.NET.Sdk.BlazorWebAssembly">` \
    ++`    <Import Project="tailwindcss.targets" />`++ \
`</Project>`
:::

---

## Watch {#watch}

### Integrating `tailwindcss --watch`

The site repo and [tailblazor-templates](https://github.com/McNerdius/TailBlazor-Templates){ target="_blank"} include scripts to fire off `dotnet watch`, wait for `*.styles.css` to build & Tailwind dependencies to install (if missing), and finally `tailwindcss --watch` (via `npm run watch`).

The best option i've found to integrate `tailwindcss --watch` with Visual Studio UI is to use the [NPM Task Runner](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NpmTaskRunner64){ target="_blank"}, and bind the relevant `watch` script to "Project Open". (Not "After Build", see below.)

Keep in mind: one-off `tailwindcss` builds are not ideal.  The long-running ***`tailwindcss --watch` is the only way to take advantage of Tailwind's super-fast incremental builds.***.

Other approaches:

- Using a "Post Build Event" in Visual Studio's project properties.

This places an MSBuild Target in the `.csproj` - `<Target Name="PostBuild" AfterTargets="PostBuildEvent">`. **This and similar simple MSBuild Target based approaches do one of two things: terminate immediately or hang the build.**

- More advanced uses of MSBuild Targets

One example is using [Inline Tasks](https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild-inline-tasks) - essentially embedding code within the `.csproj` (or more ideally, the `tailwindcss.targets` it points to) to kick off the npm task. It works but it's a bit ugly IMO. Visit [See Also](/also) for a project using this approach.

- Using Visual Studio Folders View's "Configure Tasks" / `tasks.vs.json`

This can be used to expose the needed scripts in a right-click menu in the Folder View. A few issues:

- You have to be in Folder View
- You still have to kick it off manually. (Arguably easier than doing so via CLI though.)
- **I couldn't get it to work.** Tried feeding it various combinations of working directories, no dice.

::: info
All in all, using the NPM Task Runner takes little effort and Just Works, without injecting long-running tasks into the `.csproj`/`.targets` **build** files.
:::

---

<br>