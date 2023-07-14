import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js'
import { BlitElement } from './blit-element';

@customElement('dark-switch')
export class DarkSwitch extends BlitElement
{
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
