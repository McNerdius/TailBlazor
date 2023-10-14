import { html, unsafeCSS, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js'
import { BlitElement } from '../blit-element';
import iconLinkCSS from './icon-link.css?inline';

@customElement('icon-link')
export class IconLink extends BlitElement 
{
    static styles = [ ...BlitElement.styles, unsafeCSS(iconLinkCSS) ];

    @property({ type: Boolean }) public NewTab: Boolean = false;
    @property({ type: Boolean }) public Large: Boolean = false;
    @property() public Text!: string;
    @property() public Link!: string;

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('popstate', this.navFunction);
    }
    
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('popstate', this.navFunction)
    }

    protected firstUpdated()
    {
        this.nav();
    }

    navFunction = this.nav.bind(this);
    nav()
    {
        const path = window.location.pathname.replace('/', '');
        // console.log(path);
        this.active = path == this.Link;
    }

    @state() private active!: Boolean;

    render()
    {
        const common = "justify-start flex items-center";

        return html`
            <div class="link-container">${
                this.Link
                    ? html`<a ?active=${this.active} class=${common} href="/${this.Link}" target=${this.NewTab?'_blank':nothing}>${this.inner()}</a>`
                    : html`<div ?active=${this.active} class=${common}>${this.inner()}</div>`  
            }</div>
        `;
    }

    private inner() 
    {
        const sizing = "w-5 sm:w-6 md:w-7"; // this.Large ? "w-5 sm:w-6" : "w-4 sm:w-5";

        return html`
            <span class="relative ${sizing}" aria-hidden="true">
                <slot></slot>
            </span> 
            <span>
                ${this.Text}
            </span>
        `;
    }

}
