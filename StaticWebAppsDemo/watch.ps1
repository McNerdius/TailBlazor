start "dotnet" -ArgumentList "watch --project ./FunctionsAPI msbuild /t:RunFunctions" # -NoNewWindow
sleep 1
cd "BlazorWasm"
start "dotnet" -ArgumentList "watch" # -NoNewWindow

while (!(Test-Path "./obj/scopedcss/bundle/BlazorWasm.styles.css")) { sleep -ms 200 } # tailwind needs this file

npm run watch