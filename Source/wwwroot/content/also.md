
:::: content

# Similar stuff

---

## NuGet tools / MSBuild Inline Tasks in place of `node.js` boilerplate. {#nuget}


There are tools/libraries/tutorials that abstract either the standalone executable or node.js version of `tailwindcss`, none without compromise.  That's specifically why this site exists: To show how it can be done with minimal compromise.  Removing that abstraction, we are left with three boilerplate files for node.js functionality, and an MSBuild "Targets" file to tie it all together.  These files are straightforward - specifying dependencies and pointing to files on disk.  We are learning and using `tailwindcss` itself, no JS build tools are involved.  The deepest we get into the JS ecosystem is through plugins, each involving an `npm install -D` and adding a "hey use this" line to the appropriate config file.  This is no more complex than using a dotnet abstraction and eliminates compromises.

- See [NPM Task Runner](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NpmTaskRunner64){target="_blank"}. 
  
---

## Similar Projects

An incomplete list of projects i've come across, with different methods and perspectives:

- https://codewithmukesh.com/blog/integrating-tailwind-css-with-blazor/ and https://mattferderer.com/tailwind-with-blazor

  - geared toward `postcss-cli`

    Notes:

    `AfterTargets="PostBuildEvent"` versus `AfterTargets="AfterBuild"` ?

- https://www.mistergoodcat.com/post/integrating-blazor-server-and-tailwind-css-part-2

  A different approach to integrating Scoped CSS: Overwriting scoped styles with a Tailwind-processed version of itself:

  > This is basically a for-each loop over all the generated scoped CSS files that call the Tailwind CLI for each one

  Must bypass JIT to do this. Hot Reload + Incremental builds could result in an infinite CSS-rewriting loop (?)

  Notes:

  > To understand what's going on during a build, you can use a verbose output of dotnet build and see all the involved msbuild magic - to find a suitable target you can use to plug in your custom CSS preprocessing logic. I've already done that and identified a target named `_GenerateScopedCssFiles`

- https://www.elian.codes/blog/configure-tailwindcss-with-blazor/

  - Similar setup, using yarn and webpack.

- https://github.com/barahonajm/blazor-tailwindcss-template

::::
