import { AwesomeLoader } from "./elements/awesome-loader";          //✅
import { DarkSwitch } from "./elements/dark-switch/dark-switch";    //✅
import { IconLink } from "./elements/icon-link/icon-link";          //✅
import { MainLayout } from "./main-layout";                         //✅
import { NavMenu } from "./elements/nav-menu";                      //✅
import { NotFound } from "./elements/not-found";                    //✅
import { StaticContent } from "./elements/static-content";          //✅
import { TailBlazorApp } from "./tailblazor-app";                   //✅

export
{
    AwesomeLoader,  //✅
    DarkSwitch,     //✅
    IconLink,       //✅
    MainLayout,     //✅
    NavMenu,        //✅
    NotFound,       //✅
    StaticContent,  //✅
    TailBlazorApp   //✅
};

declare global
{
    interface HTMLElementTagNameMap
    {
        'awesome-loader': AwesomeLoader,    //✅
        'dark-switch': DarkSwitch,          //✅
        'icon-link': IconLink,              //✅
        'main-layout': MainLayout,          //✅
        'nav-menu': NavMenu,                //✅
        'not-found': NotFound,              //✅
        'static-content': StaticContent,    //✅
        'tailblazor-app': TailBlazorApp     //✅
    }
};
