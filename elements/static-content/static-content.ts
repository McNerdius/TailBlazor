import { html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js'

import { BlitElement } from '../blit-element';

import { BeforeEnterObserver, RouterLocation } from '@vaadin/router';

import markdownCSS from './markdown.css?inline';
import codeBlockCSS from './codeblock.css?inline';
import prismCSS from './prism-vsc-dark-plus.css?inline';
import prose from './prose.css?inline';

import { unsafeHTML } from 'lit/directives/unsafe-html.js';

// import '../awesome-loader';
import '../not-found';

@customElement('static-content')
export class StaticContent extends BlitElement implements BeforeEnterObserver
{
    static styles = [
        ...BlitElement.styles, 
        unsafeCSS(markdownCSS), 
        unsafeCSS(prismCSS), 
        unsafeCSS(prose), 
        unsafeCSS(codeBlockCSS), 
    ];

    /* @state() */ private page!: string;
    @state() content = html`<awesome-loader></awesome-loader>`;

    #observer?: MutationObserver;
    
    async onBeforeEnter(location: RouterLocation)
    {
        this.page = location.params["static"] as string;
    }

    async connectedCallback()
    {
        await super.connectedCallback();
        this.#observer = new MutationObserver(() => this.scrollToHash());
        this.#observer.observe(this.renderRoot, { childList: true, subtree: true });
        window.addEventListener('hashchange', this.scrollFunction);
        await this.loadContent();
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
        // console.log("scroll");
        const anchor = this.renderRoot?.querySelector(location.hash);
        anchor?.scrollIntoView({ behavior: 'smooth' });
    }

    async loadContent()
    {
        // function sleep(s: number)
        // {
        //     return new Promise(resolve => setTimeout(resolve, s*1000));
        // }

        // await sleep(5);

        let content = await fetch(`/content/${this.page}.html`).then(r => r.text()).catch();

        if (content)
        {
            this.content = html`
                <div class="markdown prose sm:prose-sm md:prose-md lg:prose-lg xl:prose-xl
                            animate-fade-in-fast">
                ${unsafeHTML(content)}</div>`;
        }
        else
        {
            this.content = html`<not-found></not-found>`;
        }

        document.dispatchEvent(new Event("content_loaded"));
    }

    render()
    {
        return this.content;
    }
}
