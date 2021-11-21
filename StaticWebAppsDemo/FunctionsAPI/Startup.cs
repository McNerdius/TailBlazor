
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using TailBlazor.Core;

namespace TailBlazor.API
{
    public class Program
    {
        public static void Main()
        {
            var host = new HostBuilder()
                .ConfigureFunctionsWorkerDefaults()
                .ConfigureServices( services => services.AddSingleton<IPersonService, RandomPersonService>() )
                .Build();

            host.Run();
        }
    }
}