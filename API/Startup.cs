
using Microsoft.Azure.Functions.Extensions.DependencyInjection;

using Karmatach.McNerd.Net.Functions;
using Microsoft.Extensions.DependencyInjection;
using TailBlazor.Core;

[assembly: FunctionsStartup( typeof( Startup ) )]
namespace Karmatach.McNerd.Net.Functions
{
    public class Startup : FunctionsStartup
    {
        public override void Configure( IFunctionsHostBuilder builder )
        {
            builder.Services.AddSingleton<IPersonService, RandomPersonService>();
        }
    }
}