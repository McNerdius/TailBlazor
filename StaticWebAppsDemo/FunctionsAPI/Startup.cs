
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using SharedClassLibrary;

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices( services => services.AddSingleton<IPersonService, RandomPersonService>() )
    .Build();

host.Run();
