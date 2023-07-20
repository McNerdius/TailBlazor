
:::: content

# Changes

2022-7-3

* Rewrite content regarding PostCSS and `postcss-import` for clarity and to reflect the changes in Tailwind 3.1

2022-6-22

* Update content to reflect state of MAUI & release of Tailwind 3.1
* Apply dll renaming workaround mentioned below
* This page

---

# Issues

## Firewall / Security blockage

See the [GitHub issue](https://github.com/McNerdius/TailBlazor/issues/129).  A Blazor issue really, but it's a pretty big one IMO.  I've [applied the renaming workaround](https://github.com/McNerdius/TailBlazor/pull/130/files?diff=unified&w=0) to the `tailblazor.dev` repo but the dll-with-bin-extension files were still being blocked for the issue submitter, so i didn't merge it into the templates.  A 'drop in' sort of fix that actually works certainly belongs in the templates.  Coming up with such a fix isn't easy when i don't know how to reproduce various unknown security restrictions.  My google-fu is pretty weak on this topic too.

## Hot Reload

As mentioned, hot reload / `dotnet watch` behavior differs between the project types.  As tooling improves, improving the experience means relying on tricks and workarounds.  I've implemented some in the `tailblazor-templates` repo, but it's still not ideal.

---

# Thanks

* Thanks to `niktek` for the VS Code [background task regex](https://github.com/McNerdius/TailBlazor-Templates/issues/14) for the `tailwindcss` CLI.
* Thanks to `thismat` for ideas on [improving the `tailwindcss.targets` setup](https://github.com/McNerdius/TailBlazor/issues/108).
* Thanks to `umanivannan-conga` for bringing the [security issue](https://github.com/McNerdius/TailBlazor-Templates/issues/26) to my attention.
* Thanks to `ErnieBernie10` for bringing .NET's [inconsistent Hot Reload behavior](https://github.com/McNerdius/TailBlazor-Templates/issues/5) to my attention.

---

::: info

Site design inspired by [ohmyposh.dev docs](https://ohmyposh.dev/docs/){target="_blank"}, using Tailwind Labs' [HeroIcons](https://github.com/tailwindlabs/heroicons) - see [here](https://heroicons.dev/) for an improved but unofficial icon-picker.

:::

::::