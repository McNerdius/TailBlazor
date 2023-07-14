import { LitElement, nothing } from 'lit';
import { customElement } from 'lit/decorators.js'

@customElement('page-title')
export class PageTitle extends LitElement {
    render()
    {
        window.document.title = this.innerHTML;
        return nothing;
    }
}
