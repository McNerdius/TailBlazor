dotnet build # need to do explicit build or wonky things can happen
start "dotnet" -ArgumentList "watch --project ../FunctionsAPI msbuild /t:RunFunctions" # -NoNewWindow
start "dotnet" -ArgumentList "watch run" # -NoNewWindow
npm --prefix ../../ run watch-wasm