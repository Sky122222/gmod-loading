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
// COLOR CYCLE (10s RED / 10s BLUE)
// ============================================
function initColorCycle() {
  const sidepanel = document.getElementById("sidepanel")
  const topLogo = document.getElementById("top-right-logo")
  let isRed = true

  // Initial state
  sidepanel.classList.add("color-red")
  topLogo.classList.add("glow-red")

  setInterval(() => {
    isRed = !isRed
    if (isRed) {
      sidepanel.classList.replace("color-blue", "color-red")
      topLogo.classList.replace("glow-blue", "glow-red")
    } else {
      sidepanel.classList.replace("color-red", "color-blue")
      topLogo.classList.replace("glow-red", "glow-blue")
    }
  }, 10000) // 10 second interval
}

// ============================================
// INFO-TEXT ROTATION
// ============================================
const infoTexts = [
  "Willkommen bei Infinity Gaming.",
  "Erlebe den ewigen Konflikt auf unserem Server.",
  "Fragen? Unser Support hilft dir gerne auf Discord.",
  "Bitte lies dir vor Spielbeginn unsere Regeln durch.",
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
const holoMessages = [
  { char: "sith", text: "Tritt heute noch dem Sith-Imperium bei!" },
  { char: "jedi", text: "Schütze die Republik vor der Dunkelheit!" },
  { char: "sith", text: "Die dunkle Seite verleiht grenzenlose Macht." },
  { char: "jedi", text: "Möge die Macht mit dir sein, Rekrut." },
]

let holoIndex = 0

function initHologram() {
  const characters = document.querySelectorAll(".hologram-character")
  const textEl = document.getElementById("hologram-text")
  const beam = document.querySelector(".hologram-beam")

  setInterval(() => {
    holoIndex = (holoIndex + 1) % holoMessages.length
    const currentMsg = holoMessages[holoIndex]

    // Update character visibility
    characters.forEach((c) => c.classList.remove("active"))
    const nextChar = document.querySelector(`.hologram-character.${currentMsg.char}`)
    if (nextChar) nextChar.classList.add("active")

    // Update colors based on faction
    if (currentMsg.char === "sith") {
      textEl.style.color = "#ff3333"
      textEl.parentElement.style.borderColor = "#ff3333"
      textEl.style.textShadow = "0 0 8px rgba(255, 51, 51, 0.6)"
      beam.style.background = "radial-gradient(ellipse at bottom, rgba(255, 50, 50, 0.3) 0%, rgba(255, 50, 50, 0) 70%)"
    } else {
      textEl.style.color = "#00ffff"
      textEl.parentElement.style.borderColor = "#00ffff"
      textEl.style.textShadow = "0 0 8px rgba(0, 255, 255, 0.6)"
      beam.style.background = "radial-gradient(ellipse at bottom, rgba(0, 255, 255, 0.3) 0%, rgba(0, 255, 255, 0) 70%)"
    }

    // Typewriter effect
    typeWriter(textEl, currentMsg.text)
  }, 8000)

  // Initial text
  typeWriter(textEl, holoMessages[0].text)
}

function typeWriter(element, text) {
  element.innerText = ""
  let i = 0
  const speed = 50

  function type() {
    if (i < text.length) {
      element.innerText += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }
  type()
}

// ============================================
// FAKE LOADING (NUR FÜR BROWSER-TEST!)
// ============================================
function startFakeLoading() {
  initColorCycle()
  initParallax()
  initHologram() // Initialized Hologram system

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

startFakeLoading()
