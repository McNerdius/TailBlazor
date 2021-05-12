
# Contributing to TailBlazor

*If you're reading this, you're probably better at this than me !*

Something something take a look at the issues, make an issue, pull requests welcome, etc etc.  Yo i see you like contributing.md, maybe contributing.md needs some contributing ?

[dotnet-format](https://github.com/dotnet/format) is handy, it will apply the `.editorconfig` settings.  (mini-PSA: [enable roslyn and editorconfig](https://gist.github.com/McNerdius/738ec9990a869e2f8a8f06388fe7c549#file-settings-jsonc-L5) in vs code if you haven't already, or if you've kicked the vs code tires and been disappointed !)

---

## Goals/priorities to keep in mind:

This project IS about:
* Connecting Blazor (in all its HTML flavors) with Tailwind CSS (JIT mode in particular)
* Having as straightforward a run/debug experience as possible
* Making it clear what steps have been taken to accomplish this

If there are Blazor or Tailwind features that are broken, if F5 doesn't work, or if i've left something out of the readme, that's a BIG priority.

This project is KINDA about:
* Demonstrating Blazor/Tailwind features.  The "scrolling cards" shows how DI and Scoped CSS are set up, there's a component to show Tailwind's Dark Mode & Blazor's JS Isolation/Interop, It's using a Razor Class Library to share UI between Blazor project types.
* Azure Static Web Apps deployment.  It's easy and (for the time being) free, so why not.

If there are Blazor/Tailwind features that could be demonstrated in a simple manner (other Blazor project types, CSS Custom Properties come to mind) that's a medium priority.

Things like best practices, accessibility, visual appeal, etc are lower priorities.  PRs still welcome, so long as they don't overcomplicate things or distract from the higher priorities.