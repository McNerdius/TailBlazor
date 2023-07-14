import { AwesomeLoader } from "./elements/awesome-loader";  //✅
import { DarkSwitch } from "./elements/dark-switch/dark-switch";        //✅
import { IconLink } from "./elements/icon-link/icon-link";            //✅
import { IndexPage } from "./elements/index-page";          //✅
import { MainLayout } from "./main-layout";                 //✅
import { NavMenu } from "./elements/nav-menu";              //✅
import { NotFound } from "./elements/not-found";            //✅
import { StaticContent } from "./elements/static-content";  //✅
import { TailBlazorApp } from "./tailblazor-app";           //✅

export
{
    AwesomeLoader,  //✅
    DarkSwitch,     //✅
    IconLink,       //✅
    IndexPage,      //✅
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
        'index-page': IndexPage,            //✅
        'main-layout': MainLayout,          //✅
        'nav-menu': NavMenu,                //✅
        'not-found': NotFound,              //✅
        'static-content': StaticContent,    //✅
        'tailblazor-app': TailBlazorApp     //✅
    }
};
