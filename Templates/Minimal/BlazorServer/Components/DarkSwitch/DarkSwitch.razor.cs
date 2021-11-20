
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

    private string currentTheme = "light";
    private bool isLightMode => currentTheme == "light";

    private async Task switchTheme()
    {
        var module = await Module;

        currentTheme = currentTheme switch
        {
            "light" => "dark",
            _ => "light"
        };

        await module.InvokeAsync<string>( "switchTheme", currentTheme );
    }
}
