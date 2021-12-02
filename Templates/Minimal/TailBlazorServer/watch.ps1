start "dotnet" -ArgumentList "watch" # -nonewwindow

while (!(Test-Path "./obj/scopedcss/bundle/TailBlazorServer.styles.css")) { sleep -ms 200 } # tailwind needs this file

npm run watch