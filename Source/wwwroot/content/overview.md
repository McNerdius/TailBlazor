:::: nav

[Inner Loop](/overview#innerloop)
[Tidy CSS](/overview#tidy)
[Prerequisites](/overview#prerequisites)
:::
- [[I]DE](/overview#de)
- [SDKs](/overview#sdk)
- [Optional](/overview#other)
:::

::::


:::: content

# Tailwind CSS + Blazor = <div class="emoji">💯</div> 

Getting the best out of both takes a couple `csproj` tweaks and a bit of config. {.text-lg .font-bold .italic}

---

[Blazor](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor){target="_blank" .text-2xl .italic .font-extrabold} is a new feature of .NET, used for building interactive UI components with C# using the [well-estabished](https://weblogs.asp.net/scottgu/introducing-razor){target="_blank"} Razor syntax. These components can be used client-side via WebAssembly or server-side via ASP.NET Core. <abbr title="native rendering, not a 'bundled browser'; native API access">Native integration</abbr> with iOS/macOS, Windows, and Android apps via [.NET MAUI](https://docs.microsoft.com/en-us/dotnet/maui/){target="_blank"} is in preview.

[Tailwind CSS](https://tailwindcss.com/){target="_blank" .text-2xl .italic .font-extrabold} is a utility-first CSS framework.  Rather than a set of static utility classes, it is effectively a CSS generator, building classes on demand based on an overridable and extendable base set of values and utilities.  It pairs quite well with Blazor, being component oriented.  The [documentation](https://tailwindcss.com/docs/utility-first){target="_blank"} is great as well. (Random example: [position](https://tailwindcss.com/docs/position){target="_blank"}.)  

---

## "Inner Loop" goodies {#innerloop}

Blazor's [Hot Reload](https://docs.microsoft.com/en-us/aspnet/core/test/hot-reload?view=aspnetcore-6.0){target="_blank"} is an evolution of Visual Studio's Edit & Continue feature and the `dotnet watch` command, allowing edits to be applied immediately without needing to pause or restart a running app.  This includes edits to code as well as markup and CSS.  Hot Reload is still newish and not fully supported for all project types, unfortunately.

Similar to .NET's Hot Reload, Tailwind's [Just-In-Time](https://tailwindcss.com/blog/tailwindcss-v3#just-in-time-all-the-time){target="_blank"} CSS generation is the primary goodness Tailwind CSS 3 brings.  Initially it generates only what CSS is relevant to your markup and CSS, subsequently performing much faster incremental builds when changes are spotted.  Also newish, it works well until it doesn't - for me it gets "stuck" during a build and runs out of memory once every 2-3 hours.

Hot Reload and `tailwindcss --watch` do their work independently - all that's needed from us is to point `tailwindcss` at our input markup/CSS, and our Blazor project at the `tailwindcss` output.

---

## Tidy CSS {#tidy}

Blazor's [CSS Isolation](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation?view=aspnetcore-6.0){target="_blank"} is a simple way to limit the scope of styles to a particular Razor Component: by convention, styles defined in `.razor.css` (Scoped CSS) files will be rewritten at build time so they only apply to their associated `.razor` Component. 

In addition to generating classes for us, Tailwind CSS offers an [`@apply` directive](https://tailwindcss.com/docs/functions-and-directives#apply){target="_blank"}, and built-in support for Sass-like nesting is easily enabled.  

To use Tailwind CSS features within your Scoped CSS files takes as little as three lines of code and is well worth it, IMO.

---

# Prerequisites {#prerequisites}

You'll need the .NET 6 SDK, Node.JS, and of course a development environment — _PowerShell optional_

::: info
TailBlazor is geared toward .NET 6 and Tailwind 3. Older versions would work too, but the build steps and config would be a bit different.  Hot Reload & Tailwind CSS "JIT" were in preview prior to these versions.
:::

## Development Environment: {#de}

- [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/){target="_blank"} with "ASP.NET and web development" workload; [NPM Task Runner](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NpmTaskRunner64){target="_blank"} is handy.
- [VS Code](https://code.visualstudio.com/Download){target="_blank"} with some handy extensions:
  - The [C# Extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp){target="_blank"}.
  - The [Blazor-wasm debugger](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.blazorwasm-companion){target="_blank"}, if applicable.
  - The [Tailwind CSS Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss){target="_blank"}.  Adds Intellisense and shows generated CSS on hover.  Awesome.  [Notes](/notes#VSCode){target="_blank"}
- Other - Rider ? VS for Mac ? Sublime Text ? Fleet ? Butterfly operated punchcards ? You do you !


## SDKs: {#sdk}

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0){target="_blank"}, included with the VS install. If you're like me and use both VS and VSCode - VSCode [will use](/images/vscode_msbuild_bits.png){target="_blank"} Visual Studio's bits.
- [Node.js 12.13+](https://nodejs.org/en/download/){target="_blank"}.

## Optional: {#other}

- [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell?view=powershell-7.2){target="_blank"}. I'll be sharing simple PowerShell scripts to properly fire off both `dotnet` and `tailwindcss` in watch mode. These can be adapted to bash et al, but PowerShell is my go-to.

---

# Let's set things up !

Hopefully, i won't miss any steps or be overly verbose in this howto. It'll be more detailed regarding the JS tooling side of things - i'm adding Tailwind CSS to a C# project, after all.  Feel free to [submit](https://github.com/McNerdius/TailBlazor/issues){target="_blank"} any clarification requests or suggestions.

To fast forward through this howto and see what it looks like "on disk", see the the `tailblazor-wasm` template found in my [tailblazor-templates repository](https://www.github.com/McNerdius/tailblazor-templates){target="_blank"}.  It's hosted at [templates.tailblazor.dev](https://templates.tailblazor.dev/){target="_blank"} and the content is essentially a tl;dr of this site.

---

::: {.text-xl .italic .light .text-right .pr-6 }
[next: setup](/setup)
::: 

::::