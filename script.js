// ============================================
// GMOD LOADING SCREEN - SCRIPT.JS
// ============================================

function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

document.addEventListener("DOMContentLoaded", () => {
  const steamid = getUrlParam("steamid")
  const mapname = getUrlParam("mapname")
  const gamemode = getUrlParam("gamemode")

  if (steamid) {
    const avatarEl = document.getElementById("avatar")
    if (avatarEl) {
      avatarEl.style.backgroundImage =
        "url('https://steamcommunity.com/actions/DisplayAvatar?steamid=" + steamid + "&avatarsize=full')"
    }
  }

  if (mapname) {
    const mapEl = document.getElementById("map")
    if (mapEl) mapEl.innerText = "Map: " + mapname
  }

  if (gamemode) {
    const gamemodeEl = document.getElementById("gamemode")
    if (gamemodeEl) gamemodeEl.innerText = "Gamemode: " + gamemode
  }
})

let filesTotal = 0
let filesNeeded = 0

function SetProgressChanged(progress) {
  const bar = document.getElementById("progress")
  if (bar) {
    bar.style.width = progress + "%"
  }
}

function SetStatusChanged(status) {
  const text = document.getElementById("status")
  const downloadInfo = document.getElementById("download-info")

  if (text) {
    text.innerText = status
  }

  if (downloadInfo && filesTotal > 0) {
    const downloaded = filesTotal - filesNeeded
    downloadInfo.innerText = "Dateien: " + downloaded + " / " + filesTotal
  }
}

function SetFilesNeeded(needed) {
  filesNeeded = needed
  updateDownloadInfo()
}

function SetFilesTotal(total) {
  filesTotal = total
  updateDownloadInfo()
}

function updateDownloadInfo() {
  const downloadInfo = document.getElementById("download-info")
  if (downloadInfo && filesTotal > 0) {
    const downloaded = filesTotal - filesNeeded
    downloadInfo.innerText = "Dateien: " + downloaded + " / " + filesTotal
  }
}

function GameDetails(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
  const serverEl = document.getElementById("servername")
  const mapEl = document.getElementById("map")
  const gamemodeEl = document.getElementById("gamemode")
  const avatarEl = document.getElementById("avatar")

  if (serverEl && servername) serverEl.innerText = servername
  if (mapEl) mapEl.innerText = "Map: " + mapname
  if (gamemodeEl) gamemodeEl.innerText = "Gamemode: " + gamemode

  if (steamid && avatarEl) {
    avatarEl.style.backgroundImage =
      "url('https://steamcommunity.com/actions/DisplayAvatar?steamid=" + steamid + "&avatarsize=full')"
  }
}

// ============================================
// INFO-TEXT ROTATION
// ============================================
const infoTexts = [
  "Willkommen auf unserem Roleplay Server.",
  "Fragen? Unser Support hilft dir gerne auf Discord.",
  "Bitte lies dir vor Spielbeginn unsere Regeln durch.",
  "Events finden regelmäßig auf dem Server statt.",
  "Respektvolles Roleplay steht bei uns an erster Stelle.",
]

let infoIndex = 0

setInterval(() => {
  const infoEl = document.getElementById("infotext")
  if (infoEl) {
    infoIndex = (infoIndex + 1) % infoTexts.length
    infoEl.innerText = infoTexts[infoIndex]
  }
}, 5000)

// ============================================
// LOGO ROTATION
// ============================================
let currentLogo = 0

setInterval(() => {
  const logos = document.querySelectorAll("#logo .logo-img")
  if (logos.length > 0) {
    logos[currentLogo].classList.remove("active")
    currentLogo = (currentLogo + 1) % logos.length
    logos[currentLogo].classList.add("active")
  }
}, 5000)

// ============================================
// FAKE LOADING (NUR FÜR BROWSER-TEST!)
// ============================================
let fakeProgress = 0

function startFakeLoading() {
  SetFilesTotal(150)
  SetFilesNeeded(150)

  setInterval(() => {
    if (fakeProgress < 100) {
      fakeProgress += 1
      SetProgressChanged(fakeProgress)

      if (filesNeeded > 0) {
        SetFilesNeeded(filesNeeded - 1)
      }
    }
  }, 100)

  const fakeStatuses = [
    "Verbinde mit Server...",
    "Workshop Inhalte werden geladen...",
    "Downloading: models/player/trooper.mdl",
    "Downloading: materials/custom/texture.vtf",
    "Lade Spielwelt...",
    "Fast fertig...",
  ]

  let statusIndex = 0
  setInterval(() => {
    if (statusIndex < fakeStatuses.length) {
      SetStatusChanged(fakeStatuses[statusIndex])
      statusIndex++
    }
  }, 2000)

  GameDetails("Mein RP Server", "", "rp_downtown_v4c", 64, "76561198000000000", "DarkRP")
}

startFakeLoading()
