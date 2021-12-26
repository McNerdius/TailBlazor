// #! /usr/bin/env node

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