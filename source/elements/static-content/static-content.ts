import { html, unsafeCSS } from 'lit';
import { until } from 'lit/directives/until.js';
import { customElement, property } from 'lit/decorators.js'

import { BlitElement } from '../blit-element';

import staticCSS from './static-content.css?inline';
import codeBlockCSS from './codeblock.nested.css?inline';
import prismCSS from './prism-vsc-dark-plus.css?inline';

// import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.1.0/dist/components/include/include.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('static-content')
export class StaticContent extends BlitElement
{
    static styles = [...super.styles, unsafeCSS(staticCSS), unsafeCSS(codeBlockCSS),unsafeCSS(prismCSS) ];

    @property() page!: string;

    async loadContent()
    {
        let foo;

        if ((foo = await fetch(`/content/${this.page}.html`).catch()).ok)
        {
            return unsafeHTML(await foo.text());
        }
        else
        {
            return html`<not-found></not-found>`;
        }
    }

    render = () => html`
        <div class="w-full h-full prose prose-sm md:prose-base lg:prose-lg 2xl:prose-xl dark:prose-invert
                markdown">
            ${until(this.loadContent(), html`<awesome-loader></awesome-loader>`)}
        </div>
    `;
}
