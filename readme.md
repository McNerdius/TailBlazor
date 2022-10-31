![activity](https://img.shields.io/github/commit-activity/m/McNerdius/TailBlazor)
![commit](https://img.shields.io/github/last-commit/McNerdius/TailBlazor)
![deploy](https://img.shields.io/github/workflow/status/McNerdius/TailBlazor/swa-deploy)

I'm currently working on an overhaul of `tailblazor.dev` and `tailblazor-templates`.  For `tailblazor.dev`, this is primarily a content rehash.  It will be moved to .NET 7, but it seems the only functional difference will be making use of the new [progress properties](https://devblogs.microsoft.com/dotnet/asp-net-core-updates-in-dotnet-7-preview-7/#new-blazor-loading-page).

- [ ] Bump to .NET 7
  - [ ] make use of .NET 7's new progress info
  - [ ] Rewrite content to use the new `blazorwasm-empty` template
- [ ] Make home page more of a hybrid TOC / "What's in the box" landing page for `tailblazor-templates` users.
- [ ] Flatten things out a bit, consider breaking it down differently.
- [ ] mention wasm tools
- [ ] @import gotcha re: QuickGrid / other external stuff
- [ ] Finish the "see also" page and link it.
- [ ] Ensure `settings.json` are up to date: things like `explorer.fileNesting`, `terminal.integrated.autoReplies`, etc.
- [ ] Ensure tasks and watch scripts are up to date.
  * For instance, put everything related to VS, VS Code, `dotnet` CLI in their own location rather than peppered throughout.
- [ ] Make sure to mention suggested vscode settings.
- [ ] Other current issues
- [ ] ...

