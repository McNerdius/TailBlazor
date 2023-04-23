:::: nav

Plugins { .font-bold }
- [Tailwind](/next)
- [PostCSS](/next#postcss)
  
  
[Razor Class Libraries](/next#rcl)
[MS Web Components](/next#components)

::::

:::: content
# Tailwind Plugins {#tailwind}

## `tailwindcss-debug-screens`

Like Bootstrap, Tailwind CSS is [responsive](https://tailwindcss.com/docs/responsive-design){target="_blank"} and mobile-first: when you use `class="lg:text-2xl"`, text will be default-sized up until the `lg` media query kicks in.  The [debug-screens](https://github.com/jorenvanhee/tailwindcss-debug-screens){target="_blank"} Tailwind plugin makes designing for this a breeze (no pun intended...), letting you know which screen/breakpoint is currently active.

You'll have to run `npm install -D tailwindcss-debug-screens` and add it to your `tailwind.config.ts`:

```typescript:tailwind.config.ts
export default {
    content: [ ... ],
    ...
    plugins: [
+        require('tailwindcss-debug-screens'),
        ...
    ]
} satisfies Config
```

## Others

There are some [official plugins](https://tailwindcss.com/docs/plugins#official-plugins){target="_blank"}; i'm using `tailwindcss/typography` (with some tweaks) both here and in the [tailblazor templates](https://www.tailblazor.net){target="_blank"}.  *Note you'll need 0.5.x+ for Tailwind 3+.*

Also nifty is [tailwind-scrollbar](https://github.com/adoxography/tailwind-scrollbar){target="_blank"}, which i'm using for the code block containers.

---

# PostCSS Plugins {#postcss}

## `tailwindcss/nesting` {#nesting}

Worth mentioning twice, Tailwind has a built-in PostCSS plugin, [tailwindcss/nesting](https://tailwindcss.com/docs/using-with-preprocessors#nesting){target="_blank"} that allows for, well, CSS nesting.  No install needed, just add it to your `postcss.config.js` and nest away:

```javascript:postcss.config.js
module.exports = {
    plugins: {
        'postcss-import': {},
+        'tailwindcss/nesting': {},
        tailwindcss: {}
    }
};
```

Note the placement: after `postcss-import` inlines your files, but before `tailwindcss` does its magic.

There are *[loads](https://www.postcss.parts/){target="_blank"}* of other PostCSS plugins out there.

::: info

The ability to use arbitrary PostCSS / Tailwind plugins is a key reason i recommend installing as a node.js package.  The standalone executable allows usage of first-party Tailwind plugins only, ruling out `tailwindcss-debug-screens`.  Last i checked, using PostCSS plugins of any sort was not possible, ruling out the first-party `tailwindcss/nesting`.  Using either of these requires a node.js install - a one-liner for CD scenarios via `npm`.


:::

---

# Fluent UI Web Components: Easy drop-ins while prototyping {#components}

Rather than resorting to using something like Bootstrap alongside Tailwind/Blazor, i've been using Microsoft's [Fluent UI Web Components](https://fluent-components.azurewebsites.net/?path=/docs/getting-started-overview--page){target="_blank"} via [the CDN](https://github.com/microsoft/fluentui/tree/master/packages/web-components#from-cdn){target="_blank"} to start, phasing in my own components as a project progresses until i can eliminate the ~85kb dependency. Notice there is a [Blazor NuGet Package](https://github.com/microsoft/fast-blazor){target="_blank"} but there is a [fundamental issue](https://github.com/microsoft/fast-blazor/issues/125){target="_blank"} with styling the Razor Components. (You may have experienced this sort of thing with NavLink.)  Since i typically use them as stand-ins while i build my own, i take the quick and dirty Web Components CDN route.

---

::: {.text-xl .italic .light .text-right .pr-6 }
[next: notes](/notes)
::: 
::::
