import { html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js'
import { BlitElement } from '../blit-element';
import elementCSS from "./dark-switch.css?inline";

@customElement('dark-switch')
export class DarkSwitch extends BlitElement
{
    static styles = [
        ...super.styles,
        unsafeCSS(elementCSS)
    ];

    protected firstUpdated()
    {
        this.loadTheme();
    }

    render() {
        return html`
        <div class="relative text-[16px] leading-[23px]">
        <button type="button" class="group max-w-min select-none focus:outline-none"
                @click=${() => this.toggleTheme()}>
            <div class="flex m-auto h-[24px] w-[48px] bg-[rgb(75,85,99)] rounded-full">
                <div class="group w-[24px] h-[24px] opacity-0 dark:opacity-100">🌜</div>
                <div class="group w-[24px] h-[24px] opacity-100 dark:opacity-0">🌞</div>
            </div>
            <div class="group absolute theme-knob dark:translate-x-[24px]"></div>
        </button>
        </div>`;
    }

    private loadTheme()
    {
        var theme =
            localStorage.getItem("theme") ??
            (window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light");

        switch (theme)
        {
            case "light":
                document.documentElement.classList.remove("dark");
                break;
            case "dark":
                document.documentElement.classList.add("dark");
                break;
            default:
                console.log("unsupported theme: " + theme);
                localStorage.removeItem("theme");
                document.documentElement.classList.remove("dark");
                break;
        }

        localStorage.theme = theme;
        this.requestUpdate();
    }

    private toggleTheme()
    {
        var theme = localStorage.getItem('theme') ??
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

        switch (theme)
        {
            case 'light':
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
                break;
            case 'dark':
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
                break;
            default:
                console.log("unsupported theme: " + theme);
                localStorage.removeItem("theme");
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
                break;
        };
        this.requestUpdate();

    }
}
