import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js'
import { Router } from "@lit-labs/router";
import { BlitElement } from './elements/blit-element';

@customElement('tailblazor-app')
export class TailBlazorApp extends BlitElement
{
    static styles = [
        ...super.styles,
        css`:host, div{ display: block; height: 100%; background-color:inherit; }`
    ];

    #router = new Router(this,
    [
        { path: "/",       render: () => html`<static-content page="overview"></static-content>` },
        { path: "/:page",  render: ({ page }) => html`<static-content .page=${page!}></static-content>` },
        { path: "/:page/", render: ({ page }) => html`<static-content .page=${page!}></static-content>` }
    ]);

    render = () => html`
        <div class="bg-white dark:bg-neutral-900 transition-[background-color] duration-500 w-full h-full overflow-hidden" id="app">
            <main-layout>
                ${this.#router.outlet()}
            </main-layout>
        </div>`;
}
