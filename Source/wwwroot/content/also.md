# Page is WIP !

---

# Sass/Less

- Tailwind, PostCSS, and CSS variables can do _a lot_. Make sure adding complexity is worth it.
- Can't use Blazor's Scoped CSS, unless i'm mistaken.  See [nesting](/notes#nesting) plugin.

---

# NuGet tools / MSBuild wizardry in place of `npm` scripts.

- See [NPM Task Runner](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NpmTaskRunner64){ target="_blank"}. Adding dependencies or nontrivial MSBuild Targets/Tasks to abstract what translates to `npm` one-liners seems odd.

---

# Similar Projects

https://codewithmukesh.com/blog/integrating-tailwind-css-with-blazor/
https://mattferderer.com/tailwind-with-blazor

- geared toward `postcss-cli` rather than Tailwind 2.2+ CLI & JIT.
- Scoped CSS not integrated

Notes:

- `AfterTargets="PostBuildEvent"` versus `AfterTargets="AfterBuild"` ?

---

https://www.mistergoodcat.com/post/integrating-blazor-server-and-tailwind-css-part-2

- A different approach to integrating Scoped CSS: Overwriting scoped styles with a Tailwind-processed version of itself:
  > This is basically a for-each loop over all the generated scoped CSS files that call the Tailwind CLI for each one
- Must bypass JIT to do this

Notes:

> To understand what's going on during a build, you can use a verbose output of dotnet build and see all the involved msbuild magic - to find a suitable target you can use to plug in your custom CSS preprocessing logic. I've already done that and identified a target named \_GenerateScopedCssFiles

---

https://www.elian.codes/blog/configure-tailwindcss-with-blazor/

- Similar setup, using yarn and webpack.
- No JIT, Scoped CSS

Notes:

> <!-- If lockfile has changed, perform a new yarn install -->

---

https://github.com/barahonajm/blazor-tailwindcss-template

--- 

<br>