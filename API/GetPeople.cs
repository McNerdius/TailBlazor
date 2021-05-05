using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;

using TailBlazor.Core;

namespace TailBlazor.Functions
{
    public class GetPeople
    {
        private readonly IPersonService personService;

        public GetPeople( IPersonService personService ) => this.personService = personService;

        [FunctionName( "GetPeople" )]
        public async Task<IActionResult> Run(
            [HttpTrigger( AuthorizationLevel.Anonymous, "get", "post", Route = "GetPeople/{count?}" )] HttpRequest req,
            int? count = null )
        {
            var people = await personService.GetPeopleAsync( count ?? 10 );
            return new JsonResult( people );
        }
    }
}
