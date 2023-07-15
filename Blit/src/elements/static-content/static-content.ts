import { html, unsafeCSS } from 'lit';
import { until } from 'lit/directives/until.js';
import { customElement, property } from 'lit/decorators.js'

import { BlitElement } from '../blit-element';

import staticCSS from './static-content.css?inline';

// import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.1.0/dist/components/include/include.js';
import 'https://cdn.jsdelivr.net/gh/zerodevx/zero-md@2/dist/zero-md.min.js'

@customElement('static-content')
export class StaticContent extends BlitElement
{
    static styles = [...super.styles, unsafeCSS(staticCSS) ];

    @property() page!: string;

    async loadContent()
    {
        if ((await fetch(`/content/${this.page}.md`, { method: "HEAD" }).catch()).ok)
        {
            return html`<zero-md src="/content/${this.page}.md" no-shadow></zero-md>`;
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
