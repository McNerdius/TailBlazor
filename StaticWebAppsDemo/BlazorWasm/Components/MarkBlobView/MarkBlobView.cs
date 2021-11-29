using Microsoft.AspNetCore.Components;

namespace StaticWebAppsDemo.Components;

public partial class MarkBlobView : ComponentBase
{
    [Inject] public HttpClient HttpClient { get; set; }

    [EditorRequired]
    [Parameter] public string Blob { get; set; }

    [EditorRequired]
    [Parameter] public RenderFragment BlobLoading { get; set; }

    [EditorRequired]
    [Parameter] public RenderFragment BlobNotFound { get; set; }

    private string? content = null;
    private bool? found { get; set; } = null;

    private string? blob = null;

    protected override async Task OnParametersSetAsync()
    {
        if ( string.IsNullOrEmpty( Blob ) || blob == Blob )
            return;

        found = null;
        blob = Blob;

        var response = await HttpClient.GetAsync( $"{HttpClient.BaseAddress}api/blob/{Blob}.md" )
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