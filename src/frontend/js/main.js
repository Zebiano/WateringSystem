// Variables: var
var socket = io() // Might have to be a 'var'... Not sure anymore.

// Variables: const
const amountSwipeScreens = 3
const containerSwipe = document.querySelector(".swipe-area-box")
const content1 = document.querySelector(".content-1-js")
const content2 = document.querySelector(".content-2-js")
const content3 = document.querySelector(".content-3-js")
const point1 = document.querySelector(".indicator-1")
const point2 = document.querySelector(".indicator-2")
const point3 = document.querySelector(".indicator-3")

// Variables: let
let startSwipeMenu = null
let counter = 0
let currentSwipeScreen = 1

// Refresh states every second
setInterval(updateStates, 1000)

// Update timers
socket.on("valve1Duration", (duration) => (document.getElementById("valve1Duration").value = duration))
socket.on("valve2Duration", (duration) => (document.getElementById("valve2Duration").value = duration))
socket.on("valve3Duration", (duration) => (document.getElementById("valve3Duration").value = duration))
socket.on("valve4Duration", (duration) => (document.getElementById("valve4Duration").value = duration))
socket.on("valve8Duration", (duration) => (document.getElementById("valve8Duration").value = duration))
socket.on("valve9Duration", (duration) => (document.getElementById("valve9Duration").value = duration))

// CSS Swipe-Menu touch start event
containerSwipe.addEventListener("touchstart", function (event) {
  // Just one finger touched
  if (event.touches.length === 1) startSwipeMenu = event.touches.item(0).clientX
  // A second finger hit the screen 
  else startSwipeMenu = null
})

// CSS Swipe-Menu touch end event
containerSwipe.addEventListener("touchend", function (event) {
  // Variables
  let offset = 50

  // The finger left the screen
  if (startSwipeMenu) {
    let end = event.changedTouches.item(0).clientX

    // Check if valid swipe
    if (Math.abs(startSwipeMenu - end) >= offset) {
      // Left swipe
      if (end > startSwipeMenu - offset && currentSwipeScreen > 1) currentSwipeScreen--

      // Right swipe
      if (end < startSwipeMenu + offset && currentSwipeScreen < amountSwipeScreens) currentSwipeScreen++

      // Show appropriate screen
      switch (currentSwipeScreen) {
        case 1:
          updateContentClass(content1, "center")
          updateContentClass(content2, "right")
          updateContentClass(content3, null)
          content1.classList.remove()

          updatePoints(point1)
          break
        case 2:
          updateContentClass(content1, "left")
          updateContentClass(content2, "center")
          updateContentClass(content3, "right")

          updatePoints(point2)
          break
        case 3:
          updateContentClass(content1, null)
          updateContentClass(content2, "left")
          updateContentClass(content3, "center")

          updatePoints(point3)
          break
      }
    }
  }
})

/**
 * Update content classes appropriately
 */
function updateContentClass(content, desiredState) {
  // If no desiredState, remove all classes
  if (!desiredState) content.classList.remove("left", "center", "right")
  // Else update to desiredState by replacing or adding
  else {
    if (content.classList.contains("left")) content.classList.replace("left", desiredState)
    else if (content.classList.contains("center")) content.classList.replace("center", desiredState)
    else if (content.classList.contains("right")) content.classList.replace("right", desiredState)
    else content.classList.add(desiredState)
  }
}

/**
 * Activates one point and deactivates all others
 */
function updatePoints(point) {
  // Deactivate all points first
  point1.classList.remove("active")
  point1.classList.add("non-active")
  point2.classList.remove("active")
  point2.classList.add("non-active")
  point3.classList.remove("active")
  point3.classList.add("non-active")

  // Activate point for current screen
  point.classList.add("active")
}

/**
 * Send request to server to get states and update frontend accordingly
 */
function updateStates() {
  // Ask for states
  socket.emit("states", (ws, valve1, valve2, valve3, valve4, valve8, valve9, tapWater, pumpWaterUp, transferWaterDown) => {
    // Disable or enable checkboxes
    document.getElementById("switchValve1").disabled = !valve1.stateAllowed ? true : false
    document.getElementById("switchValve2").disabled = !valve2.stateAllowed ? true : false
    document.getElementById("switchValve3").disabled = !valve3.stateAllowed ? true : false
    document.getElementById("switchValve4").disabled = !valve4.stateAllowed ? true : false
    document.getElementById("switchValve8").disabled = !valve8.stateAllowed ? true : false
    document.getElementById("switchValve9").disabled = !valve9.stateAllowed ? true : false
    document.getElementById("switchTapWater").disabled = !tapWater.stateAllowed ? true : false
    document.getElementById("switchPumpWaterUp").disabled = !pumpWaterUp.stateAllowed ? true : false
    document.getElementById("switchTransferWaterDown").disabled = !transferWaterDown.stateAllowed ? true : false

    // Status message and manual mode
    document.getElementById("textStatus").innerHTML = ws.status.msg
    document.getElementById("switchManual").checked = ws.manual

    // If status message is Warning
    if (ws.status.msg.includes("WARNING")) {
      document.getElementById("textStatus").className = "warning"
      counter = 0
    }
    // Status message is not a Warning
    else {
      document.getElementById("textStatus").className = "information"
      if (counter >= 5) document.getElementById("textStatus").className = "hide"
      else counter += 1
    }

    // Valves
    document.getElementById("switchValve1").checked = ws.states.valve1
    document.getElementById("switchValve2").checked = ws.states.valve2
    document.getElementById("switchValve3").checked = ws.states.valve3
    document.getElementById("switchValve4").checked = ws.states.valve4
    document.getElementById("switchValve8").checked = ws.states.valve8
    document.getElementById("switchValve9").checked = ws.states.valve9
    document.getElementById("switchTapWater").checked = ws.states.tapWater
    document.getElementById("switchPumpWaterUp").checked = ws.states.pumpWaterUp
    document.getElementById("switchTransferWaterDown").checked = ws.states.transferWaterDown

    // Rain
    document.getElementById("switchRain").checked = ws.states.rain

    // Floaters
    document.getElementById("switchFloater1").checked = ws.states.floater1
    document.getElementById("switchFloater2").checked = ws.states.floater2
    document.getElementById("switchFloater3").checked = ws.states.floater3
    document.getElementById("switchFloater4").checked = ws.states.floater4
    document.getElementById("switchFloater5").checked = ws.states.floater5
  })
}

/**
 * Toggle reboot
 */
function toggleReboot() {
  io().emit("reboot")
}

/**
 * Toggle manual
 * @param {boolean} state
 */
function toggleManual(state) {
  io().emit("manual", state, (res) => {
    if (!res.stateAllowed) alert(res.msg)
    updateStates()
  })
}

/**
 * Toggle valve1
 * @param {boolean} state
 */
function toggleValve1(state) {
  const duration = document.getElementById("valve1Duration").value * 1000
  io().emit("valve1", state, duration, (res) => {
    if (!res.stateAllowed) alert(res.msg)
    updateStates()
  })
}

/**
 * Toggle valve2
 * @param {boolean} state
 */
function toggleValve2(state) {
  const duration = document.getElementById("valve2Duration").value * 1000
  io().emit("valve2", state, duration, (res) => {
    if (!res.stateAllowed) alert(res.msg)
    updateStates()
  })
}

/**
 * Toggle valve3
 * @param {boolean} state
 */
function toggleValve3(state) {
  const duration = document.getElementById("valve3Duration").value * 1000
  io().emit("valve3", state, duration, (res) => {
    if (!res.stateAllowed) alert(res.msg)
    updateStates()
  })
}

/**
 * Toggle valve4
 * @param {boolean} state
 */
function toggleValve4(state) {
  const duration = document.getElementById("valve4Duration").value * 1000
  io().emit("valve4", state, duration, (res) => {
    if (!res.stateAllowed) alert(res.msg)
    updateStates()
  })
}

/**
 * Toggle valve8
 * @param {boolean} state
 */
function toggleValve8(state) {
  const duration = document.getElementById("valve8Duration").value * 1000
  io().emit("valve8", state, duration, (res) => {
    if (!res.stateAllowed) alert(res.msg)
    updateStates()
  })
}

/**
 * Toggle valve9
 * @param {boolean} state
 */
function toggleValve9(state) {
  const duration = document.getElementById("valve9Duration").value * 1000
  io().emit("valve9", state, duration, (res) => {
    if (!res.stateAllowed) alert(res.msg)
    updateStates()
  })
}

/**
 * Toggle tap water
 * @param {boolean} state
 */
function toggleTapWater(state) {
  io().emit("tapWater", state, (res) => {
    if (!res.stateAllowed) alert(res.msg)
    updateStates()
  })
}

/**
 * Toggle pumpWaterUp
 * @param {boolean} state
 */
function togglePumpWaterUp(state) {
  io().emit("pumpWaterUp", state, (res) => {
    if (!res.stateAllowed) alert(res.msg)
    updateStates()
  })
}

/**
 * Toggle transferWaterDown
 * @param {boolean} state
 */
function toggleTransferWaterDown(state) {
  io().emit("transferWaterDown", state, (res) => {
    if (!res.stateAllowed) alert(res.msg)
    updateStates()
  })
}

/**
 * Toggle rain
 * @param {boolean} state
 */
function toggleRain(state) {
  io().emit("rain", state, (res) => {
    if (!res.stateAllowed) alert(res.msg)
    updateStates()
  })
}

/**
 * Toggle floater1
 * @param {boolean} state
 */
function toggleFloater1(state) {
  io().emit("floater1", state, (res) => {
    if (!res.stateAllowed) alert(res.msg)
    updateStates()
  })
}

/**
 * Toggle floater2
 * @param {boolean} state
 */
function toggleFloater2(state) {
  io().emit("floater2", state, (res) => {
    if (!res.stateAllowed) alert(res.msg)
    updateStates()
  })
}

/**
 * Toggle floater3
 * @param {boolean} state
 */
function toggleFloater3(state) {
  io().emit("floater3", state, (res) => {
    if (!res.stateAllowed) alert(res.msg)
    updateStates()
  })
}

/**
 * Toggle floater4
 * @param {boolean} state
 */
function toggleFloater4(state) {
  io().emit("floater4", state, (res) => {
    if (!res.stateAllowed) alert(res.msg)
    updateStates()
  })
}

/**
 * Toggle floater5
 * @param {boolean} state
 */
function toggleFloater5(state) {
  io().emit("floater5", state, (res) => {
    if (!res.stateAllowed) alert(res.msg)
    updateStates()
  })
}
