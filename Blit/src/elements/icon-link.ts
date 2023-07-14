import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js'
import { BlitElement } from './blit-element';

@customElement('icon-link')
export class IconLink extends BlitElement {
    static styles = [
        ...super.styles,
        css`
            :host {
                display: block;
            }
        `,
    ];

    render() {
        return html``;
    }
}
