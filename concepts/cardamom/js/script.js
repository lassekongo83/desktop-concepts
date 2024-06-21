// WINDOW
// Make the DIV element draggable:
dragElement(document.querySelector(".open-window"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.querySelector(elmnt.id + ".header-bar")) {
    // if present, the header is where you move the DIV from:
    document.querySelector(elmnt.id + ".header-bar").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// START MENU
const startButton = document.querySelector('.start-button');
const startMenuDiv = document.querySelector('#start-menu');

startButton.addEventListener('click', function() {
  startMenuDiv.classList.toggle('hidden');
});

// Close app menu when clicking outside it
document.addEventListener('mousedown', function(event) {
  if (!startMenuDiv.contains(event.target) && event.target!== startButton) {
    startMenuDiv.classList.add('hidden');
  }
});

// CLOCK
function displayTime() {
  var elt = document.getElementById("clock");
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();

  // Ensure hours and minutes are two digits
  hours = hours.toString().padStart(2, "0"); // Pad hours with leading zero if needed
  minutes = minutes.toString().padStart(2, "0"); // Pad minutes with leading zero if needed

  // Combine hours and minutes
  var t = hours + ":" + minutes;

  elt.innerHTML = t;
}

setInterval(displayTime, 60000);
displayTime();

// SHOW DESKTOP BUTTON
const showDesktop = document.querySelector('#show-desktop');
const openWindow = document.querySelector('.open-window');
const task = document.querySelector('.task');

function updateClasses(element) {
  // Check if '.hidden' or '.minimized' class exists
  if (element.classList.contains('hidden') || element.classList.contains('minimized')) {
    // Remove '.active' class if it exists
    element.classList.remove('active');
  } else {
    // Add '.active' class if neither '.hidden' nor '.minimized' class exists
    element.classList.add('active');
  }
}

showDesktop.addEventListener('click', function() {
  openWindow.classList.toggle('hidden');

  task.classList.toggle('active');
  task.classList.toggle('minimized');
  updateClasses(openWindow);
});

task.addEventListener('click', function() {
  openWindow.classList.toggle('hidden');
  
  task.classList.toggle('active');
  task.classList.toggle('minimized');
  updateClasses(openWindow);
});
