using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

using TailBlazor.Core;

namespace API
{
    public class GetPeople
    {
        private readonly IPersonService personService;

        public GetPeople( IPersonService personService ) => this.personService = personService;

        [Function( "GetPeople" )]
        public async Task<HttpResponseData> Run( [HttpTrigger( AuthorizationLevel.Anonymous, "get", "post", Route = "GetPeople/{count?}" )] HttpRequestData req,
             int? count = null )
        {
            var people = await personService.GetPeopleAsync( count ?? 10 );

            var response = req.CreateResponse( HttpStatusCode.OK );
            await response.WriteAsJsonAsync( people );
            return response;
        }
    }
}
