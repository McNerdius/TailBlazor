import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js'
import { BlitPage } from './blit-page';

@customElement('index-page')
export class IndexPage extends BlitPage {
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
        return html`<div class="m-20"></div>`;
    }
}

declare global { interface HTMLElementTagNameMap { 'index-page': IndexPage } };
