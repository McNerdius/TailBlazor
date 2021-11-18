# dotnet build -property TailwindBuild=false # [wonky things](https://github.com/dotnet/aspnetcore/issues/34500) can happen without explicit pre-build - fixed in RC1 (?)
start "dotnet" -ArgumentList "watch run -- -property TailwindBuild=false" # -nonewwindow
npm run watch