
using Markdig;
using Markdig.Renderers;

using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

namespace StaticWebAppsDemo.API;

public class GetMarkdownBlob
{
    // private static IConfigurationRoot config;

    [Function( "GetMarkdownBlob" )]
    public HttpResponseData Run(
        [HttpTrigger( AuthorizationLevel.Anonymous, "get", "post", Route = "blob/{*blobName}" )] HttpRequestData request,
        [BlobInput( "tailblazor/{blobName}", Connection = "MarkBlobConnection" )] string blobContents )
    {
        var response = HttpResponseData.CreateResponse( request );
        response.WriteString( RenderHtml( blobContents ) );
        return response;
    }

    public static string RenderHtml( string markdown )
    {
        var pipeline = new MarkdownPipelineBuilder().UseCustomExtensions().Build();

        using var writer = new StringWriter();

        var renderer = new HtmlRenderer( writer );

        pipeline.Setup( renderer );

        var document = Markdown.Parse( markdown, pipeline );
        renderer.Render( document );
        renderer.Writer.Flush();
        return renderer.Writer.ToString();
    }
}