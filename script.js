// ============================================
// GMOD LOADING SCREEN - SCRIPT.JS
// ============================================

function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

document.addEventListener("DOMContentLoaded", () => {
  const steamid = getUrlParam("steamid")

  if (steamid) {
    const avatarEl = document.getElementById("avatar")
    if (avatarEl) {
      avatarEl.style.backgroundImage =
        "url('https://steamcommunity.com/actions/DisplayAvatar?steamid=" + steamid + "&avatarsize=full')"
    }
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
  const avatarEl = document.getElementById("avatar")

  if (serverEl && servername) serverEl.innerText = "The Eternal Conflict"

  if (steamid && avatarEl) {
    avatarEl.style.backgroundImage =
      "url('https://steamcommunity.com/actions/DisplayAvatar?steamid=" + steamid + "&avatarsize=full')"
  }
}

// ============================================
// COLOR CYCLE (10s RED / 10s BLUE) - SYNCED SYSTEM
// ============================================
function initColorCycle() {
  const sidepanel = document.getElementById("sidepanel")
  const topPanel = document.getElementById("top-right-panel")
  let isRed = true

  // Initial state
  updateFraction(true)

  setInterval(() => {
    isRed = !isRed
    updateFraction(isRed)
  }, 10000) // 10 second interval
}

function updateFraction(isRed) {
  const sidepanel = document.getElementById("sidepanel")
  const topPanel = document.getElementById("top-right-panel")
  const textEl = document.getElementById("hologram-text")
  const beam = document.querySelector(".hologram-beam")
  const messageBox = document.querySelector(".hologram-message")
  const characters = document.querySelectorAll(".hologram-character")
  const logos = document.querySelectorAll("#logo .logo-img")

  // Update Main Panels
  if (isRed) {
    sidepanel.classList.remove("color-blue")
    sidepanel.classList.add("color-red")
    topPanel.classList.remove("color-blue")
    topPanel.classList.add("color-red")
  } else {
    sidepanel.classList.remove("color-red")
    sidepanel.classList.add("color-blue")
    topPanel.classList.remove("color-red")
    topPanel.classList.add("color-blue")
  }

  // Sync Logo Images (logo1 for Sith/Red, logo2 for Jedi/Blue)
  if (logos.length >= 2) {
    logos.forEach((l) => l.classList.remove("active"))
    const activeLogo = isRed ? logos[0] : logos[1] // logo1 is first, logo2 is second
    if (activeLogo) activeLogo.classList.add("active")
  }

  const fractionClass = isRed ? "sith" : "jedi"
  const color = isRed ? "#ff3333" : "#00ffff"
  const glow = isRed ? "rgba(255, 51, 51, 0.6)" : "rgba(0, 255, 255, 0.6)"
  const beamGrad = isRed
    ? "radial-gradient(ellipse at bottom, rgba(255, 50, 50, 0.3) 0%, rgba(255, 50, 50, 0) 70%)"
    : "radial-gradient(ellipse at bottom, rgba(0, 255, 255, 0.3) 0%, rgba(0, 255, 255, 0) 70%)"

  characters.forEach((c) => {
    c.style.display = "none"
    c.classList.remove("active")
  })

  const nextChar = document.querySelector(`.hologram-character.${fractionClass}`)
  if (nextChar) {
    nextChar.style.display = "block"
    // Small delay to trigger the CSS opacity transition
    setTimeout(() => nextChar.classList.add("active"), 10)
  }

  // Update UI Colors
  textEl.style.color = color
  messageBox.style.borderRightColor = color
  textEl.style.textShadow = `0 0 10px ${glow}`
  beam.style.background = beamGrad

  // Update Text Content (Select faction specific message)
  const messages = isRed ? sithMessages : jediMessages
  const randomMsg = messages[Math.floor(Math.random() * messages.length)]
  typeWriter(textEl, randomMsg)
}

// ============================================
// INFO-TEXT ROTATION
// ============================================
const infoTexts = [
  "Willkommen bei Infinity Gaming.",
  "Erlebe den ewigen Konflikt auf unserem Server.",
  "Fragen? Unser Support hilft dir gerne auf Discord.",
  "Bitte lies dir vor Spielbeginn unsere Regeln und unser Lore-Konzept im Forum durch.",
  "Serious Roleplay steht bei uns an erster Stelle.",
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
// HINTERGRUND-PARALLAX & CURSOR (MAUSBEWEGUNG)
// ============================================
function initParallax() {
  const bg = document.getElementById("background")
  const cursor = document.getElementById("custom-cursor")
  if (!bg) return

  document.addEventListener("mousemove", (e) => {
    // Parallax Effect
    const x = (window.innerWidth / 2 - e.pageX) / 50
    const y = (window.innerHeight / 2 - e.pageY) / 50
    bg.style.transform = `translate(${x}px, ${y}px)`

    if (cursor) {
      cursor.style.left = e.pageX + "px"
      cursor.style.top = e.pageY + "px"
    }
  })
}

// ============================================
// HOLOGRAM SYSTEM
// ============================================
const sithMessages = [
  "Tritt heute noch dem Sith-Imperium bei!",
  "Die dunkle Seite verleiht grenzenlose Macht.",
  "Frieden ist eine Lüge, es gibt nur Leidenschaft.",
  "Durch Macht erlange ich den Sieg.",
]

const jediMessages = [
  "Schütze die Republik vor der Dunkelheit!",
  "Möge die Macht mit dir sein.",
  "Es gibt keine Gefühle, nur Frieden.",
  "Die Jedi sind die Friedenswächter der Galaxis.",
]

let typewriterTimeout = null

function typeWriter(element, text) {
  if (typewriterTimeout) {
    clearTimeout(typewriterTimeout)
  }

  element.textContent = ""
  let i = 0
  const speed = 40

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
      typewriterTimeout = setTimeout(type, speed)
    }
  }
  type()
}

// ============================================
// FAKE LOADING (NUR FÜR BROWSER-TEST!)
// ============================================
function startFakeLoading() {
  initColorCycle() // This now controls the hologram sync too
  initParallax()

  initAudio()

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

  GameDetails("The Eternal Conflict", "", "rp_downtown_v4c", 64, "76561198000000000", "DarkRP")
}

let fakeProgress = 0

let audioContextStarted = false
const audioSith = document.getElementById("audio-sith")
const audioJedi = document.getElementById("audio-jedi")
const targetVolume = 0.15 // Slightly lower volume for better background feel
let currentFactionIsRed = true // Keep track of faction state

function logAudioError(audio, label) {
  if (!audio) return
  audio.addEventListener("error", (e) => {
    console.error(`[v0] Audio Error: '${label}' could not be loaded.`, e)
    console.log(`[v0] Network State: ${audio.networkState}, Ready State: ${audio.readyState}`)
    console.log(`[v0] Source path: ${audio.currentSrc || "Unknown"}`)
  })

  audio.addEventListener("canplaythrough", () => {
    console.log(`[v0] Audio Ready: '${label}' loaded successfully.`)
  })
}

logAudioError(audioSith, "sith.mp3")
logAudioError(audioJedi, "jedi.mp3")

function initAudio() {
  console.log("[v0] Audio system standby. Move mouse to start playback.")

  const startAudio = () => {
    if (audioContextStarted) return
    audioContextStarted = true

    console.log("[v0] Interaction detected. Initializing sequential playback...")

    if (audioSith) {
      audioSith.volume = 0
      audioSith.loop = false // Disable loop for sequential
      audioSith
        .play()
        .then(() => {
          console.log("[v0] Sith audio playback started.")
          syncAudioToFaction()
        })
        .catch((e) => console.error("[v0] Sith playback failed:", e))

      audioSith.onended = () => {
        console.log("[v0] Sith audio ended. Starting Jedi...")
        if (audioJedi) {
          audioJedi.currentTime = 0
          audioJedi.play()
          syncAudioToFaction()
        }
      }
    }

    if (audioJedi) {
      audioJedi.volume = 0
      audioJedi.loop = false // Disable loop for sequential
      audioJedi.onended = () => {
        console.log("[v0] Jedi audio ended. Restarting Sith...")
        if (audioSith) {
          audioSith.currentTime = 0
          audioSith.play()
          syncAudioToFaction()
        }
      }
    }

    // Remove listeners
    document.removeEventListener("mousemove", startAudio)
    document.removeEventListener("mousedown", startAudio)
  }

  document.addEventListener("mousemove", startAudio)
  document.addEventListener("mousedown", startAudio)
}

function syncAudioToFaction() {
  const sidepanel = document.getElementById("sidepanel")
  const isRed = sidepanel?.classList.contains("color-red")
  currentFactionIsRed = isRed

  // Volume cross-fade based on faction, while tracks play sequentially
  if (isRed) {
    fadeAudio(audioSith, targetVolume)
    fadeAudio(audioJedi, 0.02) // Keep other track very slightly audible for atmosphere
  } else {
    fadeAudio(audioSith, 0.02)
    fadeAudio(audioJedi, targetVolume)
  }
}

function fadeAudio(audio, target) {
  if (!audio) return
  const step = 0.01
  const intervalTime = 50

  if (audio.fadeTimer) clearInterval(audio.fadeTimer)

  audio.fadeTimer = setInterval(() => {
    // Ensure we don't fade up if the audio isn't actually playing
    if (target > 0 && audio.paused) {
      clearInterval(audio.fadeTimer)
      return
    }

    if (audio.volume < target) {
      audio.volume = Math.min(target, audio.volume + step)
    } else if (audio.volume > target) {
      audio.volume = Math.max(target, audio.volume - step)
    }

    if (Math.abs(audio.volume - target) < 0.01) {
      audio.volume = target
      clearInterval(audio.fadeTimer)
    }
  }, intervalTime)
}

// Hook into the faction switch
const originalUpdateFraction = updateFraction
updateFraction = (isRed) => {
  originalUpdateFraction(isRed)
  if (audioContextStarted) {
    syncAudioToFaction()
  }
}

startFakeLoading()
