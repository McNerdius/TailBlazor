### WIP

See [templates.tailblazor.dev](https://templates.tailblazor.dev){target="_blank"} for a preview of [tailblazor-templates](https://github.com/McNerdius/TailBlazor-Templates){target="_blank"}'s content.  The template pack will grow, naming is still up in the air, but the near-future plan looks something like this:

+:------------------------+:-------------------------:+
| single-project templates                            |
+=========================+===========================+
| Template/Minimal/                                  |
+=========================+===========================+
| -- TailBlazorWasm       |  `tailblazor-wasm`        |
+-------------------------+---------------------------+
| -- TailBlazorServer     | `tailblazor-server`       |
+-------------------------+---------------------------+
| -- TailBlazorMaui       |  `tailblazor-maui`        |
+-------------------------+---------------------------+
| -- TailBlazorPages      | `tailblazor-pages`        |
+-------------------------+---------------------------+

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
| -- BlazorMaui           |                     |
+-------------------------+                     |
| -- RazorPages           |                     |
+-------------------------+---------------------+

Any comments / suggestions / feedback / whatever on the templates, path / template / project naming, toss it [in here](https://github.com/McNerdius/TailBlazor/issues/64){target="_blank"} !
