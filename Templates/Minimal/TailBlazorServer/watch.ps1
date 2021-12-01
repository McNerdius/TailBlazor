start "dotnet" -ArgumentList "watch -- run -p:TailwindBuild=false" # -nonewwindow

while (!(Test-Path "./obj/scopedcss/bundle/TailBlazorServer.styles.css")) { sleep -ms 200 } # tailwind needs this file

npm run watch