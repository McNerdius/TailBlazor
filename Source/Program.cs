global using TailBlazor.ContentProviders;

using TailBlazor;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;


var builder = WebAssemblyHostBuilder.CreateDefault( args );
builder.RootComponents.Add<App>( "#app" );
builder.RootComponents.Add<HeadOutlet>( "head::after" );

#if RELEASE
builder.Services.AddSingleton<IContentProvider, EmbeddedHtmlProvider>();
#else
builder.Services.AddScoped( sp => new HttpClient { BaseAddress = new Uri( builder.HostEnvironment.BaseAddress ) } );
builder.Services.AddScoped<IContentProvider, LocalMarkdownProvider>();
#endif

await builder.Build().RunAsync();
