
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TailBlazor.Core
{
    public interface IPersonService
    {
        Task<IEnumerable<Person>?> GetPeopleAsync( int count );
    }
}