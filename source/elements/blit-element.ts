import { LitElement, unsafeCSS } from 'lit';
import { } from 'lit/decorators.js'
import tailwindCSS from '../../tailblazor.css?inline';
    
export class BlitElement extends LitElement {
    static styles = [
        unsafeCSS( tailwindCSS )
    ];
}
