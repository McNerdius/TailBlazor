# Tailwind CSS + Blazor = <div class="emoji">💯</div>

_Getting the best out of both takes a couple `csproj` tweaks and a bit of config._ {.text-lg .font-bold}

---

[Blazor](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor){target="_blank" .tech} is a new feature of .NET, used for building interactive UI components with C# using the [well-estabished](https://weblogs.asp.net/scottgu/introducing-razor){target="_blank"} Razor syntax. These components can be used client-side via WebAssembly or server-side via ASP.NET Core. <abbr title="native rendering, not a 'bundled browser'; native API access">Native integration</abbr> with iOS/macOS, Windows, and Android apps via [.NET MAUI](https://docs.microsoft.com/en-us/dotnet/maui/){target="_blank"} is in preview.

[CSS Isolation](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation?view=aspnetcore-6.0){target="_blank"} is a simple way to limit the scope of styles to a particular Razor Component: by convention, styles defined in `.razor.css` (Scoped CSS) files will be rewritten at build time so they only apply to their associated `.razor` Component. [Hot Reload](https://docs.microsoft.com/en-us/aspnet/core/test/hot-reload?view=aspnetcore-6.0){target="_blank"} is an evolution of Visual Studio's Edit & Continue feature and the `dotnet watch` command, allowing most edits to be applied immediately without needing to pause or restart a running app.  This includes edits to code as well as markup and CSS.

Tweaks will be made to insert Tailwind CSS into the usual CSS Isolation process, to take advantage of Tailwind CSS and other features in `.razor.css` files.

---

[Tailwind CSS](https://tailwindcss.com/){target="_blank" .tech} is a utility-first CSS framework.  It pairs quite well with Blazor, being component oriented.  The [documentation](https://tailwindcss.com/docs/utility-first){target="_blank"} is great as well. (Random example: [position](https://tailwindcss.com/docs/position){target="_blank"}.)  Similar to .NET's Hot Reload, its [Just-In-Time](https://tailwindcss.com/blog/tailwindcss-v3#just-in-time-all-the-time){target="_blank"} CSS generation is the primary goodness Tailwind CSS 3 brings.  Initially it generates only what CSS is relevant to your markup and CSS, performing much faster incremental builds when changes are spotted.  To get the most out of the JIT generator and incremental builds, `tailwindcss --watch` must be run alongside .NET's Hot Reload.

Editing a Scoped CSS file will trigger a chain of events: Edit triggers Hot Reload; Fresh CSS Isolation bundle triggers `tailwindcss` incremental build; Fresh `tailwindcss` output pushed to browser by Hot Reload.  All of this should take under 200ms.


---

Hopefully, i won't miss any steps or be overly verbose in this howto. It'll be more detailed regarding the JS tooling side of things - i'm adding Tailwind CSS to a C# project, after all.  Feel free to [submit](https://github.com/McNerdius/TailBlazor/issues) any clarification requests or suggestions.

See [templates.tailblazor.dev](https://templates.tailblazor.dev/){target="_blank"} for a quick summary. Not every detail is covered as it's a snapshot of the `tailblazor-wasm` template found in the [tailblazor-templates repository](https://www.github.com/McNerdius/tailblazor-templates){target="_blank"} - the end result of this howto, roughly.

