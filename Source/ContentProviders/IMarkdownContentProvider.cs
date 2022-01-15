namespace TailBlazor.ContentProviders;

public interface IContentProvider
{
    public string Path { get; init; }
    public Task<string?> GetContent( string name );
}
