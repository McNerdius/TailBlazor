import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js'
import { BlitElement } from './blit-element';

@customElement('nav-bar')
export class NavBar extends BlitElement {
    static styles = [
        ...super.styles,
        css`
            :host {
                display: block;
            }
        `,
    ];

    render()
    {
        return html`<div class="m-2"></div>`;
    }
}

declare global { interface HTMLElementTagNameMap { 'nav-bar': NavBar } };
