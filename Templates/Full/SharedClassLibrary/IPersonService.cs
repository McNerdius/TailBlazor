
namespace SharedClassLibrary;

public interface IPersonService
{
    Task<IEnumerable<Person>?> GetPeopleAsync( int count );
}