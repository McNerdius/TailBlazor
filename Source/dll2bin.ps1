$path = $pwd.Path + "\bin\Release\publish\wwwroot\_framework\"
$bootJson = $path + "blazor.boot.json"

# remove old bin files, if any

Remove-Item $path\*.bin
Remove-Item $path\*.bin.gz
Remove-Item $path\*.bin.br

# rename dll files

dir $path | Rename-Item -NewName { $_.name -replace ".dll",".bin" }
((Get-Content $bootJson -Raw) -replace '.dll"','.bin"') | Set-Content $bootJson

# recreate compressed boot.json files

$source = New-Object System.IO.FileStream($bootJson, ([IO.FileMode]::Open),([IO.FileAccess]::Read),([IO.FileShare]::Read))

## gzip

$bootGzip = $path + "blazor.boot.json.gz"
rm $bootGzip -force -ErrorAction SilentlyContinue

$destination = New-Object System.IO.FileStream($bootGzip, ([IO.FileMode]::Create),([IO.FileAccess]::Write),([IO.FileShare]::None))

$gzip = New-Object System.IO.Compression.GZipStream($destination,([System.IO.Compression.CompressionMode]::Compress))
$source.CopyTo($gzip)
$gzip.Dispose()

## brotli

$bootBrotli = $path + "blazor.boot.json.br"
rm $bootBrotli -force -ErrorAction SilentlyContinue

$source.Seek(0,[System.IO.SeekOrigin]::Begin)

$destination = New-Object System.IO.FileStream($bootBrotli, ([IO.FileMode]::Create),([IO.FileAccess]::Write),([IO.FileShare]::None))
$brotli = New-Object System.IO.Compression.BrotliStream($destination,([System.IO.Compression.CompressionMode]::Compress))
$source.CopyTo($brotli)
$brotli.Dispose()

$source.Dispose()