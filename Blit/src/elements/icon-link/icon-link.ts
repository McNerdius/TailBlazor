import { html, unsafeCSS, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import { BlitElement } from '../blit-element';
import iconLinkCSS from './icon-link.css?inline';

@customElement('icon-link')
export class IconLink extends BlitElement
{
    
    static styles = [
        ...super.styles,
        unsafeCSS(iconLinkCSS)];

    @property({ type: Boolean })
    public NewTab: Boolean = false;
    
    @property({ type: Boolean })
    public Large: Boolean = false;

    @property()
    public Text!: string;
    
    @property()
    public Link?: string;

    render()
    {
        const common = "justify-start flex items-center";

        return html`
            <div class="link-container first:mt-4 ${this.Large? 'mt-0' :'ml-2'}">
        
            ${  this.Link
                    ? html`<a class=${common} href=${this.Link} target=${this.NewTab?'_blank':nothing}>${this.inner()}</a>`
                    : html`<div class=${common}>${this.inner()}</div>`  }
        
            </div>
        `;
    }

    private inner() 
    {
        const sizing = this.Large ? "w-6 ml-1" : "w-4 ml-2";

        return html`
            <span class="relative ${sizing}" aria-hidden="true">
                <slot></slot>
            </span> 
            <span class="ml-3">
                ${this.Text}
            </span>
        `;
    }

}
