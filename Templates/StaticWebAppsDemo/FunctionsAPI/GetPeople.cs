using System.Net;

using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

using TailBlazor.Core;

namespace TailBlazor.Functions
{
    public class GetPeople
    {
        private readonly IPersonService personService;

        public GetPeople( IPersonService personService ) => this.personService = personService;

        [Function( "GetPeople" )]
        public async Task<HttpResponseData> Run
        (
            [HttpTrigger( AuthorizationLevel.Function, "get", "post", Route = "GetPeople/{count?}" )] HttpRequestData req,
            int? count = null
        )
        {
            var people = await personService.GetPeopleAsync( count ?? 10 );

            var response = req.CreateResponse( HttpStatusCode.OK );
            await response.WriteAsJsonAsync( people );

            return response;
        }
    }
}