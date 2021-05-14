
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;

using TailBlazor.Core;

[assembly: FunctionsStartup( typeof( TailBlazor.API.Startup ) )]
namespace TailBlazor.API
{
    public class Startup : FunctionsStartup
    {
        public override void Configure( IFunctionsHostBuilder builder )
        {
            builder.Services.AddSingleton<IPersonService, RandomPersonService>();
        }
    }
}