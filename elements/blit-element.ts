import { LitElement, unsafeCSS } from 'lit';
import tailwindCSS from '../app.css?inline';
    
export class BlitElement extends LitElement
{
    static styles = [
        unsafeCSS(tailwindCSS)
    ];
}
