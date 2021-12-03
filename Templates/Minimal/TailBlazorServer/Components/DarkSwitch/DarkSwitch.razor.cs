
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace TailBlazorServer.Components;

public partial class DarkSwitch : ComponentBase
{

    [Inject]
    IJSRuntime JSRuntime
    { get; set; }

    private Task<IJSObjectReference> _module;
    private Task<IJSObjectReference> Module => _module ??= JSRuntime.InvokeAsync<IJSObjectReference>( "import", "./Components/DarkSwitch/DarkSwitch.razor.js" ).AsTask();

    private async Task switchTheme()
    {
        var module = await Module;
        await module.InvokeAsync<object>( "toggleTheme" );

    }

    protected override async void OnAfterRender( bool firstRender )
    {
        if ( firstRender )
        {
            var module = await Module;
            await module.InvokeAsync<object>( "loadTheme" );
        }
    }
}

