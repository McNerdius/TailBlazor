import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js'
import { BlitElement } from './blit-element';

@customElement('nav-menu')
export class NavMenu extends BlitElement 
{
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
