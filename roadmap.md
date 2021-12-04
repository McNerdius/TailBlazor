vNext:

- PWA for `tailblazor-wasm`
- Razor Pages project in `tailblazor-full`
- Overhauled docs text and better css
- VSC Watch/Debug configs
- Flicker fix
- Push templates to nuget.org
- deprecate the Tailblazor-Lite repo

vNextNextish:

- Blazor Maui / Hybrid templates ("TailBlaui" ? lol)
  - Windows + Android
- Add a `@page` to each template, summarizing what's going on under the hood to connect Blazor, Tailwind, Scoped CSS, and Hot Reload/TW Inremental Builds. (The first step toward the long term "common template.")

- Longer Term:

- Keep up with Minor versions of both .NET and Tailwind, major versions of C#.
  - "Breaking Changes" are determined by release dates of the above, so the template package versioning will be by date: `DateTime.Now.ToString(yyyy.M.d-Hmm)` / 2021.12.4-058
- Provide common content for each template instead of cloning the default `dotnet` templates for `Minimal` and the original "Scrolling Cards" for `Full`.
  - Include examples of basics like tailwind config, integrating css custom properties with `tailwind.config.js`, responsive utilities, tailwind plugins (`debug screens`), postcss plugins (`tailwindcss/nesting`), ASP.NET DI, JS Interop (`DarkSwitch`), MS fluent-ui web components. Keep each simple, just enough to get a feel for what's going on - and seperate, so it's easy to rip out what is or is not interesting to the template user. Link to `tailblazor.net` for more info.
- How to DRY things up ? The above will help, but five or more copies of this content will still be in the repo because self-contained [Runnable Project Templates](https://github.com/dotnet/templating/wiki/Runnable-Project-Templates) is a goal. They share quite a bit:
  - `.razor` Components/Pages will differ only in `namespace`/`using` ?
  - project-level `.css`/`.min.css` will differ only in filename ?
    - `package.json`'s scripts point to these files
  - identical `tailwind.config.js`, `postcss.config.js`, `tailwindcss.targets`, ... ?
  - ... ?
- ... ?
