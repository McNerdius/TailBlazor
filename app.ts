import { Router } from '@vaadin/router'; import { css, html } from 'lit';
import { customElement, query } from 'lit/decorators.js'
import { BlitElement } from './elements/blit-element';

@customElement('tailblazor-app')
export class TailBlazorApp extends BlitElement
{
    static styles = [
        ...super.styles,
        css`:host, div{ display: block; height: 100%; background-color:inherit; }`
    ];

    protected async firstUpdated()
    {
        this.#router = new Router(this.outlet);
        this.#router.setRoutes(
        [{
            path: '/',
            component: 'main-layout',
            children:
            [
                { path: '/', redirect: '/overview' },
                { path: '/:static', component: 'static-content', }
            ]
        }]);
    }

    #router!: Router;
    
    @query("#outlet") public outlet!: HTMLDivElement;

    render = () => html`
        <div class="bg-white dark:bg-neutral-900 transition-[background-color] duration-500 w-full h-full overflow-hidden" id="app">
            <div id="outlet">
            </div>
        </div>`;
}
