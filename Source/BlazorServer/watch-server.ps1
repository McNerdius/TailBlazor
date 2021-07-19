start "dotnet" -ArgumentList "watch --project ../FunctionsAPI msbuild /t:RunFunctions" # -NoNewWindow
start "dotnet" -ArgumentList "watch run" # -NoNewWindow
npm --prefix ../../ run watch-server