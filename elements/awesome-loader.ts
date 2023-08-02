import { html } from 'lit';
import { customElement } from 'lit/decorators.js'
import { BlitElement } from './blit-element';

@customElement('awesome-loader')
export class AwesomeLoader extends BlitElement 
{
    static styles = super.styles;

    render()
    {
        return html`
        <div class="flex flex-col justify-center h-full gap-4 animate-fade-in ease-in">
            <div class="relative w-[min(25vh,80vw-2rem)] mx-auto">
                <div style="background-image: repeating-conic-gradient(#539ffd 0 12deg, #0576f8 12deg 24deg);"
                     class="absolute rounded-full m-auto animate-spin-slow w-full h-full">
                </div>
                <svg class="relative p-[7%]" xmlns="http://www.w3.org/2000/svg" id="svg1923" viewBox="0 0 733 733">
                    <circle cy="366.5" cx="366.5" r="366.5"></circle>
                    <circle cy="366.5" cx="366.5" r="336.5" fill="#fede58"></circle>
                    <path d="m325 665c-121-21-194-115-212-233v-8l-25-1-1-18h481c6 13 10 27 13 41 13 94-38 146-114 193-45 23-93 29-142 26z"></path>
                    <path d="m372 647c52-6 98-28 138-62 28-25 46-56 51-87 4-20 1-57-5-70l-423-1c-2 56 39 118 74 157 31 34 72 54 116 63 11 2 38 2 49 0z" fill="#871945"></path>
                    <path d="m76 342c-13-26-13-57-9-85 6-27 18-52 35-68 21-20 50-23 77-18 15 4 28 12 39 23 18 17 30 40 36 67 4 20 4 41 0 60l-6 21z"></path>
                    <path d="m234 323c5-6 6-40 2-58-3-16-4-16-10-10-14 14-38 14-52 0-15-18-12-41 6-55 3-3 5-5 5-6-1-4-22-8-34-7-42 4-57.6 40-66.2 77-3 17-1 53 4 59h145.2z" fill="#fff"></path>
                    <path d="m378 343c-2-3-6-20-7-29-5-28-1-57 11-83 15-30 41-52 72-60 29-7 57 0 82 15 26 17 45 49 50 82 2 12 2 33 0 45-1 10-5 26-8 30z"></path>
                    <path d="m565 324c4-5 5-34 4-50-2-14-6-24-8-24-1 0-3 2-6 5-17 17-47 13-58-9-7-16-4-31 8-43 4-4 7-8 7-9 0 0-4-2-8-3-51-17-105 20-115 80-3 15 0 43 3 53z" fill="#fff"></path>
                    <path d="m504 590s-46 40-105 53c-66 15-114-7-114-7s14-76 93-95c76-18 126 49 126 49z" fill="#f9bedd"></path>
                </svg>
            </div>
            <div class="font-bold text-4xl text-center italic">loading...</div>
        </div>
    `;
    }
}