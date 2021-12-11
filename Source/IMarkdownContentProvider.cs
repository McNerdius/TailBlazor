public interface IMarkdownContentProvider
{
    public string Path { get; init; }
    public Task<string?> GetMarkdownContent( string name );
}
