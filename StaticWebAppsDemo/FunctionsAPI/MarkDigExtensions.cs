
using Markdig;

namespace TailBlazor.Functions;

public static class MarkDigExtensions
{
    public static MarkdownPipelineBuilder UseCustomExtensions( this MarkdownPipelineBuilder pipeline )
    {
        return pipeline
               .UseAbbreviations()
               .UseCustomContainers()
               .UseEmphasisExtras()
               .UseFootnotes()
               .UseGridTables()
               .UsePipeTables()
               .UseMediaLinks()
               .UseTaskLists()
               .UseAutoLinks()
               .UseEmojiAndSmiley()
               .UseAutoIdentifiers()
               .UseGenericAttributes(); // Must be last as it is one parser that is modifying other parsers
    }
}
