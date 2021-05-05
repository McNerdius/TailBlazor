using System;
using System.Net.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using TailBlazor.Core;

namespace TailBlazor.Client
{
    public class Program
    {
        public static async Task Main( string[] args )
        {
            var builder = WebAssemblyHostBuilder.CreateDefault( args );
            builder.RootComponents.Add<App>( "#app" );

            var baseAddress = builder.Configuration["FunctionsAddress"] ?? builder.HostEnvironment.BaseAddress;
            builder.Services.AddScoped( _ => new HttpClient { BaseAddress = new Uri( baseAddress ) } );
            builder.Services.AddScoped<IPersonService, HttpPersonService>();

            await builder.Build().RunAsync();
        }
    }
}
