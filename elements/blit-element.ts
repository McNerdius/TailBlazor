import { LitElement, unsafeCSS } from 'lit';
import tailwindCSS from '../tailblazor.css?inline';
    
export class BlitElement extends LitElement
{
    static styles = [
        unsafeCSS(tailwindCSS)
    ];
}
