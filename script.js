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

  // Musik-Player initialisieren
  initMusicPlayer()
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
// MUSIK-PLAYER (Spotify-Style)
// ============================================

const songs = [
  { file: "The Blood of Kings.mp3", title: "The Blood of Kings - SWTOR" },
  { file: "Coruscant, The Capital.mp3", title: "Coruscant, The Capital - SWTOR" },
  { file: "Dromund Kaas,the Seat of Power.mp3", title: "Dromund Kaas,the Seat of Power - SWTOR" },
]

let currentSongIndex = 0
let isPlaying = false
let isMuted = false

function initMusicPlayer() {
  const audio = document.getElementById("music-audio")
  const playBtn = document.getElementById("play-btn")
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")
  const muteBtn = document.getElementById("mute-btn")
  const volumeSlider = document.getElementById("volume")

  if (!audio) return

  // Ersten Song laden
  loadSong(currentSongIndex)

  // Lautstärke setzen
  audio.volume = volumeSlider.value / 100

  // Play/Pause Button
  playBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause()
      isPlaying = false
      updatePlayIcon()
    } else {
      audio.play()
      isPlaying = true
      updatePlayIcon()
    }
  })

  // Vorheriger Song
  prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length
    loadSong(currentSongIndex)
    if (isPlaying) audio.play()
  })

  // Nächster Song
  nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length
    loadSong(currentSongIndex)
    if (isPlaying) audio.play()
  })

  // Mute Button
  muteBtn.addEventListener("click", () => {
    isMuted = !isMuted
    audio.muted = isMuted
    updateVolumeIcon()
  })

  // Lautstärke-Slider
  volumeSlider.addEventListener("input", (e) => {
    audio.volume = e.target.value / 100
    if (e.target.value == 0) {
      isMuted = true
    } else {
      isMuted = false
      audio.muted = false
    }
    updateVolumeIcon()
  })

  // Song zu Ende -> nächster Song
  audio.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length
    loadSong(currentSongIndex)
    audio.play()
  })
}

function loadSong(index) {
  const audio = document.getElementById("music-audio")
  const titleEl = document.getElementById("music-title")

  if (audio && songs[index]) {
    audio.src = songs[index].file
    if (titleEl) titleEl.innerText = songs[index].title
  }
}

function updatePlayIcon() {
  const playIcon = document.getElementById("play-icon")
  if (playIcon) {
    if (isPlaying) {
      // Pause Icon
      playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'
    } else {
      // Play Icon
      playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>'
    }
  }
}

function updateVolumeIcon() {
  const volumeIcon = document.getElementById("volume-icon")
  if (volumeIcon) {
    if (isMuted) {
      // Muted Icon
      volumeIcon.innerHTML =
        '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>'
    } else {
      // Volume Icon
      volumeIcon.innerHTML =
        '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>'
    }
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
