
using System;
using System.Collections.Generic;
using System.Linq;

#pragma warning disable CA1050 // yes i am evil and putting an extension method outside a namespace
public static class RangeEnumeratorExtension
{   // enables `foreach(int i in 1..10) {}`
    public static IEnumerator<int> GetEnumerator( this Range range )
        => Enumerable.Range( range.Start.Value, range.End.Value - range.Start.Value ).GetEnumerator();
}
