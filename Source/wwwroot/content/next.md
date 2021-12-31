
# Tailwind Plugins

## tailwindcss-debug-screens {.mono}

Like Bootstrap, Tailwind CSS is [responsive](https://tailwindcss.com/docs/responsive-design){target="_blank"} and mobile-first: when you use `class="lg:text-2xl"`, text will be default-sized up until the `lg` media query kicks in.  The [debug-screens](https://github.com/jorenvanhee/tailwindcss-debug-screens){target="_blank"} Tailwind plugin makes designing for this a breeze (no pun intended...), letting you know which screen/breakpoint is currently active.

You'll have to run `npm install -D tailwindcss-debug-screens` and add it to your `tailwind.config.js`:

```javascript:tailwind.config.js
module.exports = {
    content: [ './**/*.{razor,html}' ],
    ...
    plugins: [
+        require('tailwindcss-debug-screens'),
        ...
    ]
}
```

## Others

There are some [official plugins](https://tailwindcss.com/docs/plugins#official-plugins){target="_blank"}; i'm using `tailwindcss/typography` (with some tweaks) both here and in the [tailblazor templates](https://www.tailblazor.net){target="_blank"}.  *Note you'll need 0.5.x+ for Tailwind 3+.*

Also nifty is [tailwind-scrollbar](https://github.com/adoxography/tailwind-scrollbar){target="_blank"}.

---

# PostCSS Plugins

## tailwindcss/nesting {.mono #nesting}

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

---

# Razor Class Libraries: Sharing Razor Components

More to come on this topic, but for now...

By putting all or most of your UI into a [Razor Class Library](https://docs.microsoft.com/en-us/aspnet/core/razor-pages/ui-class?view=aspnetcore-6.0&tabs=visual-studio){target="_blank}, you can share Components, Pages / Routable Components, even your Layouts and `App.razor` with other Blazor-capable projects.  See [tailblazor-templates](https://github.com/McNerdius/TailBlazor-Templates/tree/main/Templates/MultiProject){target="_blank}'s MutliProject template to see this in action.  

Here's some notes on how i set up a solution, using a shared `RazorClassLibrary.csproj`:

* I keep the `npm` related files at the root of the solution, not in the Razor Class Library's folder.  This includes `package.json`, `tailwind.config.js`, `postcss.config.js`, `node-modules`, the root CSS file (call it `site.css` for these notes), and so on.
* `site.css` will reference the Razor Class Library's `*.styles.css` bundle: `@import "./RazorClassLibrary/obj/scopedcss/bundle/RazorClassLibrary.styles.css";`,
* and `package.json` will output to `RazorClassLibrary`: `./RazorClassLibrary/wwwroot/css/site.min.css`.  This folder will automatically get pulled into other projects, and placed at `wwwroot/_content/RazorClassLibrary`.
* This means that any references to these shared files must be prefixed.  For instance, a Blazor Wasm project consuming the Razor Class Library will need to use `<link rel="stylesheet" href="./_content/RazorClassLibrary/css/site.min.css"/>`, any Components using [JavaScript Isolation](https://docs.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet?view=aspnetcore-6.0#javascript-isolation-in-javascript-modules){target="_blank"} will use JSRuntime to import their scripts from `"./_content/RazorClassLibrary/Components/{ComponentName}/{ComponentName}.razor.js"`.
* While i won't place Components and the like in projects that reference the Razor Class Library, i still set up the `contents` value in `tailwind.config.js` to look at the solution as a whole, not just the Razor Class Library on the off chance i'm using Tailwind CSS classes in non-shared UI.  Also, be sure to include `cshtml`:  `content: [ './**/*.{razor,html,cshtml}' ]`.
* ... i'm probably forgetting stuff ...

---

# Fluent UI Web Components: Easy drop-ins while prototyping

Blazor and Tailwind CSS are both component-oriented, but neither provides components. Rather than resorting to using something like Bootstrap alongside Tailwind, i've been using Microsoft's [Fluent UI Web Components](https://fluent-components.azurewebsites.net/?path=/docs/getting-started-overview--page){target="_blank"} via [the CDN](https://github.com/microsoft/fluentui/tree/master/packages/web-components#from-cdn){target="_blank"} to start, phasing in my own components as a project progresses until i can eliminate the ~85kb dependency. Notice there is a [Blazor NuGet Package](https://github.com/microsoft/fast-blazor){target="_blank"} but there is a [fundamental issue](https://github.com/microsoft/fast-blazor/issues/125){target="_blank"} with styling the Razor Components. (You may have experienced this sort of thing with NavLink.)  Since i typically use them as stand-ins while i build my own, i take the quick and dirty Web Components CDN route.

---

::: {.text-xl .italic .light .text-right .pr-6 }
[next: templates](/templates)
::: 