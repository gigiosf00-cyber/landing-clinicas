# GUSMAO-WATCHER.ps1 - iniciado pelo start.bat
# A cada vez que o Go grava o JSON:
#  1) coloca na frente TODAS as fotos de public\fotos\custom\gusmao-*
#  2) remove fotos repetidas (compara o conteudo do arquivo, nao o nome)
#  3) limita a 10 fotos  -> capa = gusmao-nova1.jpg

$site      = "D:\geradordesite\meu-site"
$jsonPath  = "$site\src\data\barbearia\gusmao-barbershop.json"
$pastaJson = Split-Path $jsonPath
$custom    = "$site\public\fotos\custom"
$maxFotos  = 10
$utf8      = New-Object System.Text.UTF8Encoding($false)

function Caminho-Disco($url) {
    if ($url -notlike "/fotos/*") { return $null }
    return Join-Path "$site\public" ($url.TrimStart('/') -replace '/', '\')
}

function Aplicar-Custom {
    Start-Sleep -Milliseconds 1000
    try {
        $raw = [IO.File]::ReadAllText($jsonPath)
        $j   = $raw | ConvertFrom-Json

        $fotosCustom = @(Get-ChildItem $custom -Filter "gusmao-*" -File -ErrorAction SilentlyContinue |
            Where-Object { $_.Extension -match '^\.(jpg|jpeg|png|webp)$' } |
            Sort-Object Name | ForEach-Object { "/fotos/custom/$($_.Name)" })

        $api = @($j.lead.fotos) | Where-Object { $_ -and $_ -notlike "/fotos/custom/*" }

        $vistos = @{}; $final = @()
        foreach ($f in ($fotosCustom + $api)) {
            $disco = Caminho-Disco $f
            if ($disco) {
                if (-not (Test-Path $disco)) { continue }
                $chave = (Get-FileHash $disco -Algorithm MD5).Hash
            } else { $chave = $f }
            if ($vistos.ContainsKey($chave)) { continue }
            $vistos[$chave] = $true
            $final += $f
            if ($final.Count -ge $maxFotos) { break }
        }

        $atual = (@($j.lead.fotos) -join '|')
        if ($atual -eq ($final -join '|')) { return }   # ja esta certo, nao regrava (evita loop)

        $j.lead.fotos = $final
        if ($j.lead.PSObject.Properties.Name -contains 'fotos_ambiente') { $j.lead.fotos_ambiente = $final }
        else { $j.lead | Add-Member -NotePropertyName fotos_ambiente -NotePropertyValue $final }

        [IO.File]::WriteAllText($jsonPath, ($j | ConvertTo-Json -Depth 20), $utf8)
        Write-Host "$(Get-Date -Format 'HH:mm:ss') OK - $($fotosCustom.Count) custom + API sem repetidas = $($final.Count) fotos. Capa: $($final[0])" -ForegroundColor Cyan
    } catch {
        Write-Host "$(Get-Date -Format 'HH:mm:ss') ERRO: $_" -ForegroundColor Red
    }
}

if (Test-Path $jsonPath) { Aplicar-Custom }

$watcher = New-Object System.IO.FileSystemWatcher $pastaJson, "gusmao-barbershop.json"
$watcher.NotifyFilter = [System.IO.NotifyFilters]::LastWrite
Write-Host "Gusmao Watcher ativo - aguardando geracoes do Go..." -ForegroundColor Green

while ($true) {
    $c = $watcher.WaitForChanged([System.IO.WatcherChangeTypes]::Changed, 10000)
    if (-not $c.TimedOut) { Aplicar-Custom }
}
