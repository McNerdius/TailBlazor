using Microsoft.AspNetCore.Components;

namespace StaticWebAppsDemo.Components;

public partial class MarkBlobView : ComponentBase
{
    [Inject] public HttpClient HttpClient { get; set; }

    [EditorRequired]
    [Parameter] public string Blob { get; set; }

    [EditorRequired]
    [Parameter] public RenderFragment Loading { get; set; }

    [EditorRequired]
    [Parameter] public RenderFragment NotFound { get; set; }

    private string? content = null;

    private bool? found { get; set; } = null;

    protected override async Task OnParametersSetAsync()
    {
        if ( string.IsNullOrEmpty( Blob ) )
            return;

        found = null;

        var response = await HttpClient.GetAsync( $"http://localhost:7071/api/blob/{Blob}" )
                                       .ConfigureAwait( false );

        if ( response.IsSuccessStatusCode )
        {
            content = await response.Content.ReadAsStringAsync()
                                            .ConfigureAwait( false );

            found = true;
        }
        else
        {
            found = false;
        }
    }
}