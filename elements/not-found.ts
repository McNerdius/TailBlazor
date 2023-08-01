import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js'
import { BlitElement } from './blit-element';

@customElement('not-found')
export class NotFound extends BlitElement {
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
        return html`
        <div class="text-center relative top-1/3">
            <div class="text-8xl mb-4">😢</div>
            <div class="text-3xl font-semibold">Not Found</div>
        </div>`
            ;
    }
}
