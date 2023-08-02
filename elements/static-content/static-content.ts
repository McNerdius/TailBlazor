import { html, unsafeCSS } from 'lit';
import { until } from 'lit/directives/until.js';
import { customElement, state } from 'lit/decorators.js'

import { BlitElement } from '../blit-element';

import { BeforeEnterObserver, RouterLocation } from '@vaadin/router';

import staticCSS from './static-content.css?inline';
import codeBlockCSS from './codeblock.nested.css?inline';
import prismCSS from './prism-vsc-dark-plus.css?inline';

import { unsafeHTML } from 'lit/directives/unsafe-html.js';

@customElement('static-content')
export class StaticContent extends BlitElement implements BeforeEnterObserver
{
    static styles = [...super.styles, unsafeCSS(staticCSS), unsafeCSS(codeBlockCSS), unsafeCSS(prismCSS)];

    @state() private page!: string;

    #observer?: MutationObserver;
    
    async onBeforeEnter(location: RouterLocation)
    {
        this.page = location.params["static"] as string;
    }

    connectedCallback()
    {
        super.connectedCallback();
        this.#observer = new MutationObserver(() => this.scrollToHash());
        this.#observer.observe(this.renderRoot, { childList: true, subtree: true });
        // window.onhashchange = () => this.scrollToHash();
        window.addEventListener('hashchange', this.scrollFunction);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('hashchange', this.scrollFunction);
        this.#observer?.disconnect();
    }

    scrollFunction = this.scrollToHash.bind(this);
    scrollToHash()
    {
        if (!location.hash) return;
        // console.log(`scroll @ ${location.hash}`);
        const anchor = this.renderRoot?.querySelector(location.hash);
        // console.dir(anchor);
        anchor?.scrollIntoView({ behavior: 'smooth' });
    }

    async loadContent()
    {
        // console.log(`@load: (${location.hash})`);

        let content = await fetch(`/content/${this.page}.html`).then(r => r.text()).catch();

        // function sleep(ms: number)
        // {
        //     return new Promise(resolve => setTimeout(resolve, ms));
        // }

        // await sleep(100000);

        return content
            ? html`<div class="content">${unsafeHTML(content)}</div>`
            : html`<not-found></not-found>`;
    }

    render()
    {
        // console.log(`@render: (${location.hash})`);

        return html`
        <div class="prose prose-sm md:prose-base lg:prose-lg 2xl:prose-xl dark:prose-invert
                    markdown animate-fade-in-fast">
            ${until(this.loadContent(), html`<awesome-loader></awesome-loader>`)}
        </div>`;
    }
}
