start "dotnet" -ArgumentList "watch" # -NoNewWindow

while (!(Test-Path "../RazorClassLibrary/obj/scopedcss/bundle/RazorClassLibrary.styles.css")) { sleep -ms 100 } # tailwind needs this file
while (!(Test-Path "../node_modules/.install-stamp")) { sleep -ms 100 } # npm run needs this file 

npm --prefix ../ run watch