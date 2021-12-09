start "dotnet" -ArgumentList "watch" # -NoNewWindow

while (!(Test-Path "./obj/scopedcss/bundle/TailBlazor.styles.css")) { sleep -ms 200 } # tailwind needs this file

npm run watch