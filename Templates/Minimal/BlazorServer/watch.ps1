start "dotnet" -ArgumentList "watch run -- -property TailwindBuild=false" # -nonewwindow

while (!(Test-Path "./obj/scopedcss/bundle/BlazorServer.styles.css")) { sleep -ms 200 } # tailwind needs this file

npm run watch