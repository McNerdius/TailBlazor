:::: nav

[Intro](/tidy_css)
[CSS Isolation](/tidy_css#isolation)
[@apply](/tidy_css#apply)
- [postcss-import](/tidy_css#import)
  
[Nesting](/tidy_css#nesting)

::::

:::: content

# Options for tidy CSS files {#intro}

Idiomatic usage of Tailwind puts the bulk of CSS styling directly in your component's HTML, but you'll probably end up having some CSS files around.  Let's look at some Blazor and Tailwind CSS features that can help us out, and how to set things up so they can work together.

---

## Tailwind's `@apply` directive {#apply}

A tiny rant about tidy HTML then i'll get back to the tidy CSS bits.  A relevant snippet from [the docs](https://tailwindcss.com/docs/reusing-styles#extracting-classes-with-apply){target="_blank"}:

> Whatever you do, don’t use @apply just to make things look “cleaner”. Yes, HTML templates littered with Tailwind classes are kind of ugly. Making changes in a project that has tons of custom CSS is worse.

A common criticism of the utility-class approach is that long strings of class names gets hard to read, requiring "horizontal panning" of the eyes.  What i don't understand is - why in all of the Tailwind CSS samples i see are all of the class strings on one line ?  In C# (and other languages of course), if a method has more than a few parameters, we format & indent them to look pretty (and fix that 'horizontal panning' thing).  This is an option in HTML class strings as well.  If my HTML is getting messy, i group my classes over multiple lines semantically.  Maybe i put font size/color classes on one line, padding/margins on the next, dark mode on another, give each responsive breakpoint a line of their own, and so on.  A line becomes a rectangle.  

OK with that out of my system, on to `@apply`, which lets us cut long class strings out of our HTML and paste them into a `css` file and go on our way.  Let's look at this site's [IconLink](https://github.com/McNerdius/TailBlazor/tree/main/Source/Components/IconLink){target="_blank"} Component as an example.  Without using `@apply` you'd see something like this:

```html:IconLink.razor
<div class="font-semibold text-base 
            leading-none 
            rounded-[4px]
            stroke-black dark:stroke-white 
            hover:no-underline 
            hover:bg-neutral-200/80
            hover:dark:bg-neutral-700/70">
    ...
</div>
```

I had to create a `.css` file for this component to style Blazor's `NavLink`, so i figured i'd pull this out while i was at it:

```html:IconLink.razor
<div class="link-container">
    ...
</div>
```

```css:IconLink.razor.css
.link-container {
  @apply font-semibold text-base 
         leading-none 
         rounded-[4px] 
         stroke-black dark:stroke-white
         hover:no-underline 
         hover:bg-neutral-200/80
         hover:dark:bg-neutral-700/70;
}
```

A simple cut-paste is all it takes.

Note i've put this in `IconLink.razor.css` - a [Scoped CSS](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation?view=aspnetcore-6.0) file.  **You could also just name it `IconLink.css`, `@import` the file directly in `site.css` and skip the Blazor integration steps that follow.**  But it only takes a couple edits to take advantage of CSS Isolation and only have to `@import` the Blazor-generated `Site.styles.css` bundle.


::: info
Here comes the necessary tweaks:  When we use `@apply` in a Scoped CSS file, the Blazor-generated `Site.styles.css` is no longer Vanilla CSS, and can't be linked directly in your HTML as shown [in the docs](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation?view=aspnetcore-6.0#css-isolation-bundling){target="_blank"}.
:::

By default, for a project `Site.csproj`, the CSS Isolation will be output to `obj/{CONFIGURATION}/{TARGET FRAMEWORK}/scopedcss/bundle/Site.styles.css` and copied to `wwwroot` when the project is published - `{Configuration}` typically being `Debug` or `Release`.  Let's tweak `Site.csproj` so the filename is constant:

```xml:Site.csproj
<PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
    ...
+    <IntermediateOutputPath>obj</IntermediateOutputPath>
+    <AppendTargetFrameworkToOutputPath>false</AppendTargetFrameworkToOutputPath>
    ...
</PropertyGroup>
```

The bundle will now be output to `/obj/scopedcss/bundle` for both `build` and `publish`.  Add this file to the root CSS created earler, `site.css`:

```css:site.css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
+@import "./obj/scopedcss/bundle/site.styles.css";
```

::: info
Make sure to build the Blazor project before attempting an `npm run build/watch/publish`, or the `*.styles.css` bundle may be out of date or absent.  Similarly, if you don't actually use Scoped CSS (`*.razor.css`), a `*.styles.css` bundle will not be created on disk and `npm run build/watch/publish` will fail !
:::

If you're using a `watch` script, it's a good idea to wait on `site.styles.css` to be created:

```powershell:watch.ps1
dotnet build -p:TailwindBuild=false
start "dotnet" -ArgumentList "watch" 
+while (!(Test-Path "./obj/net6.0/scopedcss/bundle/site.styles.css")) { sleep -ms 100 } 
while (!(Test-Path "./node_modules/.package-lock.json")) { sleep -ms 100 } 
npm run watch
```

---

## Nesting - there if you want it {#nesting}

Sass-like [nesting is included](https://tailwindcss.com/docs/using-with-preprocessors#nesting){target="_blank"} with `tailwindcss` and enabled by adding a line to your `postcss.config.js`, no extra dependencies, installs, build steps or boilerplate needed:

```javascript:postcss.config.js
module.exports = {
    plugins: {
        'postcss-import': {},
+        'tailwindcss/nesting': {},
        tailwindcss: {},
    },
}
```

A couple scenarios where i use nesting:

* Where i can't use CSS Isolation.  This site's content is embedded and rendered using [MarkupString](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.markupstring?view=aspnetcore-6.0){target="_blank"}.  Because the embedded HTML is not part of the component being used to render it, the necessary `b-string`s are absent, and styles would not be applied.  Instead i wrap the `MarkupString` in a `<div class="markdown">` and [nest away](https://github.com/McNerdius/TailBlazor/blob/main/Source/Pages/Markdown.nested.css){target="_blank"}.  

* To un-stack [some stackables](https://tailwindcss.com/docs/hover-focus-and-other-states){target="_blank"}.  Being able to "stack" variants is handy: `class="dark:hover:bg-foo"` but can get repetetive.  If i've already moved the classes out of my HTML into a CSS file, i may end up un-stacking some things.  Revisiting the `IconLink` CSS above:

```css:IconLink.razor.css
.link-container {
  @apply font-semibold text-base 
         leading-none 
         rounded-[4px] 
         stroke-black dark:stroke-white
         hover:no-underline 
         hover:bg-neutral-200/80
         hover:dark:bg-neutral-700/70;
}
```

What you'll find i'm actually using is:

```css:IconLink.razor.css
.link-container {
  @apply font-semibold text-base 
         leading-none 
         rounded-[4px] 
         stroke-black dark:stroke-white;
  &:hover {
    @apply no-underline bg-neutral-200/80 
                   dark:bg-neutral-700/70;
  }
}
```

Because why not ?

---

::: {.text-xl .italic .light .text-right .pr-6 }
[next: more fun](/next)
::: 

::::
