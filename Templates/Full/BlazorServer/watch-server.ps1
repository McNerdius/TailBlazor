start "dotnet" -ArgumentList "watch -- run -p:TailwindBuild=false" # -NoNewWindow

while (!(Test-Path "../RazorClassLibrary/obj/scopedcss/bundle/RazorClassLibrary.styles.css")) { sleep -ms 200 } # tailwind needs this file

npm --prefix ../ run watch-server