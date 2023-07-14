import { css, html } from 'lit';
import { until } from 'lit/directives/until.js';
import { customElement, state } from 'lit/decorators.js'

import { BeforeEnterObserver, RouterLocation } from '@vaadin/router';

import { BlitElement } from './blit-element';

// import { cache } from 'lit/directives/cache.js';

// import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.1.0/dist/components/include/include.js';
import 'https://cdn.jsdelivr.net/gh/zerodevx/zero-md@2/dist/zero-md.min.js'

@customElement('static-content')
export class StaticContent extends BlitElement implements BeforeEnterObserver
{
    static styles = [ ...super.styles, css`` ];

    @state() private page!: string;

    async onBeforeEnter(location: RouterLocation)
    {
        this.page = location.params["static"] as string;
    }

    async loadContent()
    {
        if ((await fetch(`/content/${this.page}.md`, { method: "HEAD" }).catch()).ok)
        {
            return html`<zero-md src="/content/${this.page}.md"}></zero-md>`;
        }
        else
        {
            return html`<not-found></not-found>`;
        }
    }

    render = () => html`
        <div class="w-full h-full">
            ${until(this.loadContent(), html`<awesome-loader></awesome-loader>`)}
        </div>
    `;
}
