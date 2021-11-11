
#pragma warning disable CA1050 // yes i am evil and putting an extension method outside a namespace
public static class IEnumerableExtensions
{
    public static IEnumerable<T> RandomElements<T>( this IEnumerable<T> source, int elements )
    {
        var repeat = (int) Math.Ceiling( elements / (double) source.Count() );

        return Enumerable.Range( 0, repeat ).SelectMany( _ => source )
                                            .OrderBy( _ => Random.Shared.Next() )
                                            .Take( elements );
    }
}