import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js'
import { BlitElement } from './elements/blit-element';
// import { ifDefined } from 'lit/directives/if-defined.js';

import './nav-menu';

@customElement('main-layout')
export class MainLayout extends BlitElement 
{
    // private readonly debug = location.hostname === "localhost" || location.hostname === "127.0.0.1";

    static styles = BlitElement.styles;

    @state()
    private menuVisible: boolean = false;

    render()
    {
        // console.log(this.menuVisible);

        const navClasses = this.menuVisible ? "" : "invisible w-0 sm:visible sm:w-auto";

        return html`
        
        <div class="grid grid-cols-[min-content,auto] grid-rows-[min-content,auto] h-full">

            ${MainLayout.topBar}

            <div class="${navClasses}  border-r-2 border-neutral-300 dark:border-neutral-600" >
                <nav-menu></nav-menu>
            </div>

            <!-- @{ /* buggy: @onclick=@(_ => hidden = true) */ } -->
            <div id="body"
                class=" w-full h-full
                        overflow-x-hidden overflow-y-auto
                        scrollbar-thin !scrollbar-thumb-neutral-400 !scrollbar-track-neutral-200">
                <slot><!-- "@Body" --></slot>
            </div>

        </div>

        ${this.toggler()}`;
    }

    private static topBar = html`
        <div class="col-span-2 flex flex-row dark:bg-neutral-800
                    border-b border-neutral-300 dark:border-neutral-600
                    items-center self-center justify-between
                    
                    h-8 sm:h-10 md:h-11 lg:h-14

                    px-[2%]">

            <div class="text-center  text-blue-600 italic
                        transition-[font-size,line-height] duration-300
                        font-bold     sm:font-extrabold     lg:font-black
                        tracking-wide sm:tracking-wider     
                        text-xl       sm:text-2xl           md:text-3xl     lg:text-4xl">
                        
                TailBlazor for .NET 8
            </div>

            <div class="flex-grow"></div>

            <a href="https://github.com/McNerdius/TailBlazor/" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                    class="w-5 sm:w-6 md:w-7 lg:w-8 fill-black dark:fill-gray-50  transition-transform hover:scale-110" >
                    <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                </svg>
            </a>

            <!-- <div class="px-4">
                <dark-switch></dark-switch>
            </div> -->

        </div>`;

    private on = "transition-700 opacity-0"; 
    private off = "transition-50 opacity-100";

    private get openCSS() { return this.menuVisible ? this.on : this.off };
    private get hideCSS() { return this.menuVisible ? this.off : this.on };

    private toggler = () => html`
        <div class="absolute bottom-4 right-8 w-12 h-12 sm:hidden
                    !bg-blue-600/70 rounded-full shadow-2xl shadow-black">

            <button @click=${() => this.menuVisible = !this.menuVisible} class="relative w-12 h-12" >
            
                <svg class="transition-opacity absolute top-2 left-2 w-8 h-8 ${this.openCSS}" 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path>
                </svg>

                <svg class="transition-opacity absolute top-2 left-2 w-8 h-8 ${this.hideCSS}"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>

            </button>
        </div>`;
}
