// #! /usr/bin/env node

/* 

this file is a hack, part of a WIP GitHub Action to format/highlight markdown code blocks through MarkDig.

* MarkDigger is the GitHub Action, which pipes input markdown through specified MarkDig extensions.
* CodeBlockFormatter is a MarkDig extension found in the MarkDigger repo, which formats the code blocks 
    on this site to include the filename header and diff info in a CSS grid-oriented manner.
* CodeBlockFormatter takes an optional ICodeBlockHighlighter.  PrismHighlighter is the first implementation,
    and is just a shim for this file.
* When MarkDigger launches, the current working directory is the root of this project.
    It runs `node mcprism.js`.  Not sure what the best solution is - embed/extract ?

---

* When deployed, MarkDigger converts all `md` files to `html` using CodeBlockFormatter + PrismHighlighter.
    Generated `html` is then embedded into `TailBlazor.dll` - no client-side formatting or HTML fetching.
* For local development, LocalMarkDownProvider.cs loads `md` files from disk and converts them using
    CodeBlockFormatter, with no ICodeBlockHighlighter.

---

https://github.com/xoofx/markdig/
https://github.com/McNerdius/MarkDigger
https://github.com/McNerdius/MarkDigger/blob/main/CodeBlockFormatter/PrismHighlighter/PrismHighlighter.cs

*/

const Prism = require('prismjs');
var fs = require('fs');

const args = require('yargs').argv;
const language = args.language;
const file = args.file;

const loadLanguages = require('prismjs/components/');
loadLanguages([language]);

const code = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' }).toString();
const html = Prism.highlight(code, grammar(language), language);

console.log(html);

function grammar(name)
{
    const grammars = {
        'csharp': Prism.languages.csharp,
        'javascript': Prism.languages.javascript,
        'json': Prism.languages.json,
        'xml': Prism.languages.xml,
        'powershell': Prism.languages.powershell,
        'css': Prism.languages.css,
        'html': Prism.languages.html
    };

    return grammars[name] || "csharp";
}