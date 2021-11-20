
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

using TailBlazor.Core;
using TailBlazor.Client;

var builder = WebAssemblyHostBuilder.CreateDefault( args );
builder.RootComponents.Add<App>( "#app" );

// builder.Services.AddScoped( _ => new HttpClient { BaseAddress = new Uri( baseAddress ) } );
builder.Services.AddScoped<IPersonService, RandomPersonService>();

await builder.Build().RunAsync();
