
:::: content

# Changes

6/21/2022

* Update content to reflect state of MAUI & release of Tailwind 3.1
* Apply dll renaming workaround mentioned below
* This file

---

# Issues

## Firewall / Security blockage

See the [GitHub issue](https://github.com/McNerdius/TailBlazor/issues/129).  A Blazor issue really, but it's a pretty big one IMO.  I've [applied the renaming workaround](https://github.com/McNerdius/TailBlazor/pull/130/files?diff=unified&w=0) to the `tailblazor.dev` repo but the dll-with-bin-extension files were still being blocked for the issue submitter, so i didn't merge it into the templates.  A 'drop in' sort of fix that actually works certainly belongs in the templates.  Coming up with such a fix isn't easy when i don't know how to reproduce various unknown security restrictions.  My google-fu is pretty weak on this topic too.

## Hot Reload

As mentioned, hot reload / `dotnet watch` behavior differs between the project types.  As tooling improves, improving the experience means relying on tricks and workarounds.  I've implemented some in the `tailblazor-templates` repo, but it's still not ideal.  todo: more specifics perhaps

---

# Thanks

* Thanks to `niktek` for the VS Code [background task regex](https://github.com/McNerdius/TailBlazor-Templates/issues/14) for the `tailwindcss` CLI.
* to credit: targets improvements
* to credit: security issue
* to credit: hot reload inconsistencies

---

::: info

Site design inspired by [ohmyposh.dev docs](https://ohmyposh.dev/docs/){target="_blank"}

:::

::::