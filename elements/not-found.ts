import { html } from 'lit';
import { customElement } from 'lit/decorators.js'
import { BlitElement } from './blit-element';

@customElement('not-found')
export class NotFound extends BlitElement {

    static styles = super.styles;

    render()
    {
        return html`
        <div class="flex flex-col h-full text-center relative gap-4 justify-center animate-fade-in-fast ease-in">
            <div class="text-8xl mb-4 md:text-[8rem]">😢</div>
            <div class="text-3xl font-semibold text-amber-500/80">not found</div>
        </div>`
            ;
    }
}
