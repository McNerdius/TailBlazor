import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js'

@customElement('target-blank')
export class TargetBlank extends LitElement
{
    @property() href!: string;
    @property() text?: string;

    render = () => html`<a href="${this.href}" target="_blank">${this.text ?? this.href}</a>`;
    protected createRenderRoot() { return this; } // no shadow DOM
}
