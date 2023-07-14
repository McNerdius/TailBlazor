import { LitElement, css, unsafeCSS } from 'lit';
// import { property } from 'lit/decorators.js'

import tailwindCSS from '../../tailblazor.css?inline';

export class BlitPage extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `,
        unsafeCSS(tailwindCSS)
    ];
}
