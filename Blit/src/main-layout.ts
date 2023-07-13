import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js'
import twBaseOnly from "tailwindcss/base.css?inline";

@customElement('main-layout')
export class MainLayout extends LitElement {

    static styles = [
        unsafeCSS(twBaseOnly)
        // class="h-full w-full m-0 p-0"
    ]

    render() {
        return html`
        <div>
            <slot></slot> <!-- this is where routed content goes -->
        </div>`;
    }
}

// not needed, no props:
// declare global { interface HTMLElementTagNameMap { 'main-layouy': MainLayout } };
