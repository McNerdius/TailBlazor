
using System.Net.Http.Json;

namespace TailBlazor.Core
{
    public class HttpPersonService : IPersonService
    {
        private readonly HttpClient httpClient;

        public HttpPersonService( HttpClient httpClient ) => this.httpClient = httpClient;

        public Task<IEnumerable<Person>?> GetPeopleAsync( int count )
            => httpClient.GetFromJsonAsync<IEnumerable<Person>?>( $"/api/GetPeople/{count}" );
    }
}