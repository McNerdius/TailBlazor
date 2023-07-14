import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js'
import { Router } from "@lit-labs/router";

@customElement('tailblazor-app')
export class TailBlazorApp extends LitElement
{
    static styles = css`:host, div{ display: block; height: 100%; }`;

    #router = new Router(this,
    [
        { path: "/",      render: () => html`<static-content page="overview"></static-content>` },
        { path: "/:page", render: ({ page }) => html`<static-content .page=${page!}></static-content>` }
    ]);

    render = () => html`
        <main-layout>
            ${this.#router.outlet()}
        </main-layout>`;
}
