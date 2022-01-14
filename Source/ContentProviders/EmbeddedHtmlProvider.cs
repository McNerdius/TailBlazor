using System.Reflection;

namespace TailBlazor.ContentProviders;

public sealed class EmbeddedHtmlProvider : IContentProvider
{
    Assembly assembly;
    string prefix;
    List<string> resources;

    public EmbeddedHtmlProvider()
    {
        assembly = Assembly.GetExecutingAssembly();
        // TODO: magic string
        prefix = $"TailBlazor.wwwroot.{Path}.";
        resources = assembly.GetManifestResourceNames()
                            .Select( name => name.Replace( prefix, "" ) )
                            .ToList();
    }

    public string Path { get; init; } = "content";

    public async Task<string?> GetContent( string name )
    {
        if ( resources.Contains( $"{name}.html" ) is false )
            return null;
        using var reader = new StreamReader( assembly.GetManifestResourceStream( $"{prefix}{name}.html" )! );
        return await reader.ReadToEndAsync();
    }
}