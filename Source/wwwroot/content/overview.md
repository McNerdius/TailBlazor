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

# TailBlazor for .NET 7

Every time i decided to take another shot at web development, i was quickly reminded that it's not so much the JS tooling & ecosystem that's made me jump ship the last time, it's CSS.  Getting started with Blazor was a bit different - CSS became the *only* source of frustration.  Then i stumbled upon Tailwind CSS, which has been a valuable learning tool.

The goal of this site and the "TailBlazor" template is to demonstrate a fairly complete and straightforward approach to integrating Blazor and Tailwind CSS.  Using nesting and `@apply` within Blazor's Scoped CSS files, taking advantage of the `tailwindcss` incremental builds, ensuring Tailwind & PostCSS plugins can be used, these sorts of things.

There are other tutorials and videos combining the two, but from what i've seen so far they are...

* Side by side demos where no real integration is happening, or 
* Relying on JS tooling where it may not be necessary, or
* Using dotnet packages to avoid `node.js` at all costs

Tailwind CSS is a `node.js` tool, no getting around it.  But it's a straightforward CLI - there's no need for JS tools like webpack, or dotnet tools or libraries.  Using the `tailwindcss` CLI directly lets us take full advantage of its features (such as nesting and incremental builds) with no overhead.

::: info

There is a standalone executable version of the CLI, but its plugin functionality is very limited, as the plugins are `node.js` packages.  More later.

:::

## Tidy CSS

Blazor's take on [CSS Isolation](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation){target="_blank"} is a simple way to limit the scope of styles to a particular Razor Component: `.razor.css` (Scoped CSS) files will be rewritten at build time so they only apply to their associated `.razor` Component.  In addition to generating classes for us, Tailwind CSS offers an [`@apply` directive](https://tailwindcss.com/docs/functions-and-directives#apply){target="_blank"}, and built-in support for Sass-like nesting is easily enabled.  Using Tailwind CSS within Scoped CSS files is a bit of a departure from the standard Blazor practices.

## "Inner Loop" goodies

Blazor's [Hot Reload](https://docs.microsoft.com/en-us/aspnet/core/test/hot-reload){target="_blank"} allows (certain) edits to be applied immediately without needing to pause or restart a running app, ideally retaining state.  Tailwind 3.0 was a major overhaul, replacing the original “generate then purge” approach with [Just-In-Time](https://tailwindcss.com/blog/tailwindcss-v3#just-in-time-all-the-time){target="_blank"} CSS generation. Even better, `tailwindcss --watch` will perform a full CSS build then perform much faster incremental builds, only appending fresh CSS based on file edits.

# Prerequisites

You'll need the .NET 7 SDK, Node.JS, and of course a development environment — *PowerShell optional*

*Only a couple minor things described on this site actually require .NET 7: the new “empty” template, and the new “`--blazor-load-progress` variables.”*

## SDKs:

- [.NET 7 SDK](https://dotnet.microsoft.com/download/dotnet/7.0){target="_blank"}, included with the VS install. If you're like me and use both VS and VSCode - VSCode [will use](https://www.tailblazor.dev/images/vscode_msbuild_bits.png){target="_blank"}  Visual Studio's bits.
- [Node.js 12.13+](https://nodejs.org/en/download/){target="_blank"}.

## Optional:

- [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell){target="_blank"}. I'll be sharing simple PowerShell scripts to properly fire off both `dotnet` and `tailwindcss` in watch mode. These can be adapted to bash et al, but PowerShell is my go-to.

# Let's set things up !

Hopefully, i won't miss any steps or be overly verbose in this howto. I’m a C# developer new to front-end stuff, so the level of detail may lean more toward the JS/Tailwind side of things, and be a bit sparse on the dotnet/C# side. Feel free to [submit](https://github.com/McNerdius/TailBlazor/issues){target="_blank"} any clarification requests or suggestions.

To fast forward through this howto and see what it looks like "on disk", see the the [`tailblazor` template](https://www.github.com/McNerdius/tailblazor-templates){target="_blank"}.
****
::::
