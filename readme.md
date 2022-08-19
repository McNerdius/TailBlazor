![activity](https://img.shields.io/github/commit-activity/m/McNerdius/TailBlazor)
![commit](https://img.shields.io/github/last-commit/McNerdius/TailBlazor)
![deploy](https://img.shields.io/github/workflow/status/McNerdius/TailBlazor/swa-deploy)

No, i'm not dead !  Disappointed by Blazor WASM's several "gotchas", i've been experimenting with [Statiq](https://www.statiq.dev/guide/) - a different beast entirely.  I'll still be using Blazor for personal projects where its gotchas don't matter, so `tailblazor.dev` and `tailblazor-templates` aren't going anywhere.  Lots of little things to come:

# tailblazor.dev & tailblazor-templates:

Both will be moved to .NET 7.  The only functional difference will be making use of the new [progress properties](https://devblogs.microsoft.com/dotnet/asp-net-core-updates-in-dotnet-7-preview-7/#new-blazor-loading-page).

- [ ] Ensure `settings.json` are up to date: things like `explorer.fileNesting`, `terminal.integrated.autoReplies`, etc.
- [ ] Make sure tasks and watch scripts are up to date.


# tailblazor-templates:

Blazor Hybrid being a disappointment and Blazor WASM's gotchas have narrowed my interest in Blazor (for the time being at least) and in turn the scope of this project.  To make it easier to maintain it will become a single template: a solution with a shared `razorclasslib`, along with `blazor-wasm` and/or `blazor-server`.  Other project types may be added back in the future, but having working example templates and `tailblazor.dev` to refer to should make fully integrating Tailwind into any project type fairly simple.

- [ ] Minimize content: no meta info about the template pack, just a "what's in the box" and link to `tailblazor.dev`
- [ ] Make use of .NET 7's new progress info
- [ ] Merge into a single solution template with options:
    * --wasm (default)
    * --server (only)
    * --full (both)
- [ ] Other current issues
- [ ] ...

# tailblazor.dev:

- [ ] Setup steps now take advantage of the new empty (bootstrap-free) template.
- [ ] Make home page more of a hybrid TOC / "What's in the box" landing page for `tailblazor-templates` users.
- [ ] Flatten things out a bit, consider breaking it down differently.
  * For instance, put everything related to VS, VS Code, `dotnet` CLI in one location rather than peppered throughout.
- [ ] Make sure to mention suggested vscode settings.
- [ ] Finish the "see also" page and link it.
- [ ] mention wasm tools
- [ ] @import gotcha re: QuickGrid / other external stuff
- [ ] Other current issues
- [ ] ...

