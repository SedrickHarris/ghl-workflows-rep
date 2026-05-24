<#
.SYNOPSIS
  Mirrors HighLevel docs from a sibling repo into ./ghl-docs/.

.DESCRIPTION
  Copies <Source>\*  ->  .\ghl-docs\
  Mirror semantics: files removed at Source are also removed locally.
  The local ghl-docs/README.md is preserved across the mirror.
  No package installs, no network calls.

.PARAMETER Source
  Path to the upstream docs folder.
  Default: ..\ghl-docs-watcher-repo\docs  (sibling of this repo)

.EXAMPLE
  .\scripts\sync-ghl-docs.ps1
  .\scripts\sync-ghl-docs.ps1 -Source "C:\path\to\ghl-docs-watcher-repo\docs"
#>

[CmdletBinding()]
param(
    [string]$Source = (Join-Path $PSScriptRoot "..\..\ghl-docs-watcher-repo\docs")
)

$ErrorActionPreference = "Stop"

$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$Dest = Join-Path $RepoRoot "ghl-docs"

if (-not (Test-Path -LiteralPath $Source)) {
    Write-Error "Source path not found: $Source"
    exit 1
}

$SourceResolved = (Resolve-Path -LiteralPath $Source).Path

Write-Host "Source: $SourceResolved"
Write-Host "Dest  : $Dest"
Write-Host ""

# Preserve the local README.md across the mirror sweep.
$ReadmePath = Join-Path $Dest "README.md"
$ReadmeBackup = $null
if (Test-Path -LiteralPath $ReadmePath) {
    $ReadmeBackup = [System.IO.Path]::GetTempFileName()
    Copy-Item -LiteralPath $ReadmePath -Destination $ReadmeBackup -Force
}

# /MIR    = mirror (purge extras at dest + copy)
# /XF     = exclude these files from purge/copy (protects our README)
# /NFL /NDL /NJH /NJS /NP = quieter output
robocopy $SourceResolved $Dest /MIR /XF "README.md" /NFL /NDL /NJH /NJS /NP | Out-Host
$rc = $LASTEXITCODE

# Restore the preserved README if needed
if ($ReadmeBackup) {
    if (-not (Test-Path -LiteralPath $ReadmePath)) {
        Copy-Item -LiteralPath $ReadmeBackup -Destination $ReadmePath -Force
    }
    Remove-Item -LiteralPath $ReadmeBackup -Force
}

# robocopy exit codes: 0-7 are success, 8+ are errors.
if ($rc -ge 8) {
    Write-Error "robocopy failed with exit code $rc"
    exit $rc
}

Write-Host ""
Write-Host "Sync complete."
exit 0
