import{B as d,r as k,x as s,A as u,e as m}from"./index-5865b3ce.js";import{n as v,t as w}from"./state-7dd720ce.js";const f=`.link-container{border-radius:4px;stroke:#000;font-size:.875rem;line-height:1.25rem;font-weight:500;line-height:1}@media (prefers-color-scheme: dark){.link-container{stroke:#fff}}@media (min-width: 560px){.link-container{font-size:1rem;line-height:1.5rem}}@media (min-width: 960px){.link-container{font-size:1.125rem;line-height:1.75rem}}.link-container a{margin-top:.25rem;margin-bottom:.25rem}.link-container a>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.375rem * var(--tw-space-x-reverse));margin-left:calc(.375rem * calc(1 - var(--tw-space-x-reverse)))}.link-container a{border-radius:4px;padding:.25rem .25rem .25rem .375rem}@media (prefers-color-scheme: dark){.link-container a{--tw-text-opacity: 1;color:rgb(245 245 245 / var(--tw-text-opacity))}}@media (min-width: 560px){.link-container a{margin-top:.375rem;margin-bottom:.375rem;padding-left:.5rem}}@media (min-width: 680px){.link-container a{margin-right:.375rem}.link-container a>:not([hidden])~:not([hidden]){--tw-space-x-reverse: 0;margin-right:calc(.75rem * var(--tw-space-x-reverse));margin-left:calc(.75rem * calc(1 - var(--tw-space-x-reverse)))}.link-container a{padding-top:.375rem;padding-bottom:.375rem}}.link-container a[active]{background-color:#e5e5e5cc}@media (prefers-color-scheme: dark){.link-container a[active]{background-color:#262626b3}}.link-container a:hover{background-color:#e5e5e5cc;text-decoration-line:none}@media (prefers-color-scheme: dark){.link-container a:hover{background-color:#404040b3}}
`;var x=Object.defineProperty,b=Object.getOwnPropertyDescriptor,h=(t,i,r,n)=>{for(var e=n>1?void 0:n?b(i,r):i,a=t.length-1,o;a>=0;a--)(o=t[a])&&(e=(n?o(i,r,e):o(e))||e);return n&&e&&x(i,r,e),e};let l=class extends d{constructor(){super(...arguments),this.NewTab=!1,this.Large=!1,this.navFunction=this.nav.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("popstate",this.navFunction)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("popstate",this.navFunction)}firstUpdated(){this.nav()}nav(){const t=window.location.pathname.replace("/","");this.active=t==this.Link}render(){const t="justify-start flex items-center";return s`
            <div class="link-container">${this.Link?s`<a ?active=${this.active} class=${t} href="/${this.Link}" target=${this.NewTab?"_blank":u}>${this.inner()}</a>`:s`<div ?active=${this.active} class=${t}>${this.inner()}</div>`}</div>
        `}inner(){return s`
            <span class="relative ${"w-5 sm:w-6 md:w-7"}" aria-hidden="true">
                <slot></slot>
            </span> 
            <span>
                ${this.Text}
            </span>
        `}};l.styles=[...d.styles,k(f)];h([v({type:Boolean})],l.prototype,"NewTab",2);h([v({type:Boolean})],l.prototype,"Large",2);h([v()],l.prototype,"Text",2);h([v()],l.prototype,"Link",2);h([w()],l.prototype,"active",2);l=h([m("icon-link")],l);var y=Object.defineProperty,M=Object.getOwnPropertyDescriptor,L=(t,i,r,n)=>{for(var e=n>1?void 0:n?M(i,r):i,a=t.length-1,o;a>=0;a--)(o=t[a])&&(e=(n?o(i,r,e):o(e))||e);return n&&e&&y(i,r,e),e};let p=class extends d{render(){return s`
        <div class="w-36 sm:w-40 md:w-48 lg:w-52  
                    md:pt-0.5
                    px-1 sm:px-1.5 md:pl-2 2xl:pl-3
                    first:mt-4 transition-[width,padding]">

            <icon-link Text="overview" Link="overview" Large >
                <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </icon-link>

            <icon-link Text="setup" Large Link="setup">
                <svg  fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </icon-link>

            <icon-link Text="build & watch" Large Link="build">
                <svg  fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>
            </icon-link>

            <icon-link Text="tidy css" Large Link="tidy_css">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6zM13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6z"/>
                </svg>
            </icon-link>

            <icon-link Text="more fun" Link="next" Large>
                <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </icon-link>

            <icon-link Text="notes" Link="notes" Large>
                <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            </icon-link>

            <icon-link Text="templates" Link="templates" Large>
                <svg  fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>
            </icon-link>

            <icon-link Text="readme" Link="readme" Large>
                <svg  fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </icon-link>


        </div>`}};p.styles=d.styles;p=L([m("nav-menu")],p);var $=Object.defineProperty,_=Object.getOwnPropertyDescriptor,g=(t,i,r,n)=>{for(var e=n>1?void 0:n?_(i,r):i,a=t.length-1,o;a>=0;a--)(o=t[a])&&(e=(n?o(i,r,e):o(e))||e);return n&&e&&$(i,r,e),e};let c=class extends d{constructor(){super(...arguments),this.menuVisible=!1,this.svg="transition-opacity absolute top-2 left-2 w-8 h-8 duration-medium",this.on="opacity-0",this.off="opacity-100",this.toggler=()=>s`

            <button @click=${()=>this.menuVisible=!this.menuVisible} 
                    class="absolute bottom-4 right-6 w-12 h-12 sm:hidden
                         !bg-blue-600/70 rounded-full shadow-2xl shadow-black text-dark" >
            
                <svg class="${this.svg} ${this.openCSS}" 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path>
                </svg>

                <svg class="${this.svg} ${this.hideCSS}"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>

            </button>`}render(){const t=this.menuVisible?"":"invisible w-0 sm:visible sm:w-auto";return s`
            
            <div class="grid grid-cols-[min-content,auto] grid-rows-[min-content,auto] h-full">

                ${c.topBar}

                <div class="${t}  border-r-2 border-border-light dark:border-border-dark" >
                    <nav-menu></nav-menu>
                </div>

                <div id="body"
                    class=" w-full h-full
                            overflow-x-hidden overflow-y-auto
                            scrollbar-thin !scrollbar-thumb-neutral-400 !scrollbar-track-neutral-200">
                    <slot><!-- "@Body" --></slot>
                </div>
            </div>

            ${this.toggler()}`}get openCSS(){return this.menuVisible?this.on:this.off}get hideCSS(){return this.menuVisible?this.off:this.on}};c.styles=d.styles;c.topBar=s`

        <div class="col-span-2 flex flex-row dark:bg-dark-focus
                    border-b border-border-light dark:border-border-dark
                    items-center self-center justify-between
                    
                    h-8 sm:h-10 md:h-11 lg:h-14

                    px-[2%]">

            <div class="text-center  text-blue-600 italic
                        transition-[font-size,line-height] duration-medium
                        font-bold     sm:font-extrabold    lg:font-black
                        tracking-wide sm:tracking-wider     
                        text-xl       sm:text-2xl          md:text-3xl     lg:text-4xl">
                        
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

        </div>`;g([w()],c.prototype,"menuVisible",2);c=g([m("main-layout")],c);export{c as MainLayout};
