import { Routes } from "./routes";
import { Router } from '@vaadin/router';
import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, query } from 'lit/decorators.js'
import twBaseOnly from "tailwindcss/base.css?inline";

// services go here:
// import { provide } from "@lit-labs/context";

@customElement('tailblazor-app')
export class TailBlazorApp extends LitElement
{
    static styles = [
        unsafeCSS(twBaseOnly)
        // class="h-full w-full m-0 p-0"
    ]

    protected async firstUpdated()
    {
        this.router = new Router(this.outlet);
        this.router.setRoutes(Routes);
    }

    private router!: Router;

    @query("#outlet") public outlet!: HTMLDivElement;

    render()
    {
        return html`<div id="outlet"></div>`;

    }
}

// not needed, no props:
// declare global { interface HTMLElementTagNameMap { 'tailblazor-app': TailBlazorApp } };
