

namespace TailBlazor.Core
{
    public interface IPersonService
    {
        Task<IEnumerable<Person>?> GetPeopleAsync( int count );
    }
}