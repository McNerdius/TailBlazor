# dotnet build -- -property TailwindBuild=false  # [wonky things](https://github.com/dotnet/aspnetcore/issues/34500) can happen without explicit pre-build - fixed in RC1 (?)
start "dotnet" -ArgumentList "watch --project ./FunctionsAPI msbuild /t:RunFunctions" # -NoNewWindow
sleep 1
start "dotnet" -ArgumentList "watch --project ./BlazorWasm/BlazorWasm.csproj run -- --property:TailwindBuild=false" # -NoNewWindow

while (!(Test-Path "./RazorClassLibrary/obj/scopedcss/bundle/RazorClassLibrary.styles.css")) { sleep -ms 200 } # tailwind needs this file

npm  run watch-wasm