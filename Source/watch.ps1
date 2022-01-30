# dotnet build
# start "dotnet" -ArgumentList "watch run --property:tailwindbuild=false" # -NoNewWindow

start "dotnet" -ArgumentList "watch" # -NoNewWindow

while (!(Test-Path "./node_modules/.package-lock.json")) { sleep -ms 100 } 
while (!(Test-Path "./obj/scopedcss/bundle/TailBlazor.styles.css")) { sleep -ms 200 } # tailwind needs this file

npm run watch