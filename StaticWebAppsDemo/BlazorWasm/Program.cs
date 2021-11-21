
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

using SharedClassLibrary;

using StaticWebAppsDemo;

var builder = WebAssemblyHostBuilder.CreateDefault( args );
builder.RootComponents.Add<App>( "#app" );

var baseAddress = builder.Configuration["FunctionsAddress"] ?? builder.HostEnvironment.BaseAddress;
builder.Services.AddScoped( _ => new HttpClient { BaseAddress = new Uri( baseAddress ) } );
builder.Services.AddScoped<IPersonService, HttpPersonService>();

await builder.Build().RunAsync();
