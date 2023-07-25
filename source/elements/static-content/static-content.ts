import { html, unsafeCSS } from 'lit';
import { until } from 'lit/directives/until.js';
import { customElement, state } from 'lit/decorators.js'

import { BlitElement } from '../blit-element';

import { BeforeEnterObserver, RouterLocation } from '@vaadin/router';

import staticCSS from './static-content.css?inline';
import codeBlockCSS from './codeblock.nested.css?inline';
import prismCSS from './prism-vsc-dark-plus.css?inline';

// import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.1.0/dist/components/include/include.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('static-content')
export class StaticContent extends BlitElement implements BeforeEnterObserver
{
    static styles = [ ...super.styles, unsafeCSS(staticCSS), unsafeCSS(codeBlockCSS), unsafeCSS(prismCSS) ];

    @state() private page!: string;
    
    async onBeforeEnter(location: RouterLocation)
    {
        this.page = location.params["static"] as string;
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('hashchange', () => this.scrollToHash());
    }

    scrollToHash()
    {
        console.log("scroll");
        const anchor = this.renderRoot.querySelector(`${location.hash}`);
        console.dir(anchor);
        anchor?.scrollIntoView({ behavior: 'smooth' });
    }

    

    async loadContent()
    {
        console.log(`@load: (${location.hash})`);

        let content = await fetch(`/content/${this.page}.html`).then(r => r.text()).catch();
    
        return content
            ? html`<div class="content">${unsafeHTML(content)}</div>`
            : html`<not-found></not-found>`;
    }

    render()
    {
        console.log(`@render: (${location.hash})`);

        return html`
        <div class="w-full h-full prose prose-sm md:prose-base lg:prose-lg 2xl:prose-xl dark:prose-invert
                markdown">
            ${until(this.loadContent(), html`<awesome-loader></awesome-loader>`)}
        </div>`;
    }
}
