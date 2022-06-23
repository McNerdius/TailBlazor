:::: content

Take the default `dotnet new` templates and apply the steps described on this site, and you get [tailblazor-templates](https://github.com/McNerdius/TailBlazor-Templates){target="_blank"}.  The `tailblazor-wasm` template is hosted at [templates.tailblazor.dev](https://templates.tailblazor.dev){target="_blank"}.

::: info

With MAUI/Blazor Hybrid not being what i'd hoped, a `tailblazor-maui` template won't be happening anytime soon, if ever.  (The setup process is much like that of a WASM project.)  This voids one of the `tailblazor-templates` goals: to be a complete Blazor + Tailwind template package.  

:::

 The template pack will grow, naming is still up in the air, but the near-future plan looks something like this:

+:------------------------------+:-------------------------:+
| single-project templates                                  |
+===============================+===========================+
| Template/Minimal/                                         |
+===============================+===========================+
| -- TailBlazorWasm             |  `tailblazor-wasm`        |
+-------------------------------+---------------------------+
| -- TailBlazorServer           |  `tailblazor-server`      |
+-------------------------------+---------------------------+
| -- ~~TailBlazorMaui~~         |                           |
+-------------------------------+---------------------------+
| -- TailBlazorPages            |  `tailblazor-pages`       |
+-------------------------------+---------------------------+

+-------------------------+:-------------------:+
|  multi-project template                       |
+=========================+=====================+
| Template/Full/          |  `tailblazor-full`  |
+=========================+=====================+
| -- RazorClassLibrary    | All UI goes here,   |
|                         | shared below        |            
+-------------------------+---------------------+
| -- BlazorWasm           |                     |
+-------------------------+ shares UI with RCL  |
| -- BlazorServer         |                     |
+-------------------------+                     |
| -- ~~BlazorMaui~~       |                     |
+-------------------------+                     |
| -- RazorPages           |                     |
+-------------------------+---------------------+

There's not much different between the `Server` and `Pages` flavors:
* `Server` is made from `dotnet new blazorserver`
* `Pages` is made from `dotnet new razor` (aka Razor Pages)
* `Server` templates use `MainLayout.razor` as layout, and `Pages` uses `_Layout.cshtml`, skipping Blazor's LayoutComponent approach.
* `Server` templates have a `razor` landing page, `Pages` uses `cshtml`.  The only real difference at this point is the file extension, but this along with using `_Layout.cshtml` should make it clear that intermingling Razor Components, Routable Components, and Razor Pages is the point of the `Pages` templates.

Any comments / suggestions / feedback / whatever on the templates, path / template / project naming, toss it [in here](https://github.com/McNerdius/TailBlazor/issues/64){target="_blank"} !

::::