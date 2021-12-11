# Tailwind CSS + Blazor = 😃

[Blazor](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor){ target="_blank"} is a new feature of ASP.NET, used for building interactive components with C#. These can be used server-side, or client-side via WebAssembly, and there's preview support for <abbr title="native rendering, not a 'bundled browser'; native API access">native integration</abbr> with iOS/macOS, Windows, and Android apps via [.NET MAUI](https://docs.microsoft.com/en-us/dotnet/maui/){ target="_blank"}.  **There are also a couple [experimental methods](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/?view=aspnetcore-6.0#blazor-custom-elements){ target="_blank"} of using Razor Components with other frameworks, such as Angular or React.**

[Tailwind CSS](https://tailwindcss.com/){ target="_blank"} is a utility-first CSS framework & class generator, and pairs quite well with Blazor, being component oriented. Being able to put **_usage_** of CSS _**first**_ has made learning CSS much more approachable for me. The [documentation](https://tailwindcss.com/docs/utility-first){ target="_blank"} is great as well.  (Random example: [position](https://tailwindcss.com/docs/position).)

---

Here on [tailblazor.dev](https://www.tailblazor.dev/) i'll be sharing steps i take to pair Tailwind CSS with Blazor by transforming a standard `dotnet new` template and adding in the `npm` bits. Over on [tailblazor.net] you'll find a quick summary.  Not every detail is covered - it's a snapshot of the `tailblazor-wasm` template found in the [tailblazor-templates repository](https://www.github.com/McNerdius/tailblazor-templates){ target="_blank"}.

I'll try to cover all the basics without being too verbose. It'll likely be more detail-oriented regarding the JS tooling side of things - this is about adding Tailwind CSS to a C# developer's toolbelt after all. Feel free to [submit](https://github.com/McNerdius/TailBlazor/issues) any clarification requests or suggestions.
