
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

using BlazorWasm;
using SharedClassLibrary;

var builder = WebAssemblyHostBuilder.CreateDefault( args );
builder.RootComponents.Add<App>( "#app" );

builder.Services.AddScoped<IPersonService, RandomPersonService>();

await builder.Build().RunAsync();
