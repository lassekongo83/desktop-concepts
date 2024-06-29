let desktop = document.querySelector('.desktop');
let windowElem = document.querySelector('.open-window');

// WINDOW
// Make the DIV element draggable - https://www.w3schools.com/howto/howto_js_draggable.asp
dragElement(windowElem);

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

    // Remove other classes when dragging the window
    const snapClasses = ['snap-left', 'snap-right'];

    for (let i = 0; i < snapClasses.length; i++) {
      if (windowElem.classList.contains(snapClasses[i])) {
        windowElem.classList.remove(snapClasses[i]);
      }
    }

    if (windowElem.classList.contains('maximized')) {
      windowElem.classList.remove('maximized');
      document.querySelector('.open-window img[name="maximize"]').src = 'img/maximize-icon.webp';
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// snap window to edges
let mouseIsDown = false;
let snapView = document.querySelector('.snap-view');
let triggerTop = document.querySelector('.tile-trigger-top');
let triggerLeft = document.querySelector('.tile-trigger-left');
let triggerRight = document.querySelector('.tile-trigger-right');

function isElementHovered(element) {
  return element.matches(':hover');
}

const handleMouseEvent = (event) => {
  if (event.type === 'mousedown') {
    mouseIsDown = true;
  } else if (event.type === 'mouseup') {
    mouseIsDown = false;
  }

  if (mouseIsDown && ['mousedown', 'mousemove'].includes(event.type)) {
    if (isElementHovered(triggerTop)) {
      snapView.classList.add('top');
    } else {
      snapView.classList.remove('top');
    }

    if (isElementHovered(triggerLeft)) {
      snapView.classList.add('left');
    } else {
      snapView.classList.remove('left');
    }

    if (isElementHovered(triggerRight)) {
      snapView.classList.add('right');
    } else {
      snapView.classList.remove('right');
    }
  } else if (!mouseIsDown && event.type === 'mouseup') {
    if (isElementHovered(triggerTop)) {
      snapView.classList.remove('top');
      windowElem.classList.add('maximized');
      document.querySelector('.open-window img[name="maximize"]').src = 'img/unmaximize-icon.webp';
    } else if (isElementHovered(triggerLeft)) {
      snapView.classList.remove('left');
      windowElem.classList.add('snap-left');
    } else if (isElementHovered(triggerRight)) {
      snapView.classList.remove('right');
      windowElem.classList.add('snap-right');
    }
  }
};

desktop.addEventListener('mousedown', handleMouseEvent);
desktop.addEventListener('mousemove', handleMouseEvent);
desktop.addEventListener('mouseup', handleMouseEvent);

// SHOW DESKTOP / MINIMIZE
let showDesktop = document.querySelector('#show-desktop');
let task = document.querySelector('.task');
let minimize = document.querySelector('.minimize-button');

function updateClasses(element) {
  if (element.classList.contains('hidden') || element.classList.contains('minimized')) {
    element.classList.remove('active');
  } else {
    element.classList.add('active');
  }
}

let hideWindow = document.querySelectorAll('.open-window.active .minimize-button, .task.active, #show-desktop');

hideWindow.forEach(function (i) {
  i.addEventListener('click', function() {
    windowElem.classList.toggle('hidden');
    task.classList.toggle('active');
    task.classList.toggle('minimized');
    updateClasses(windowElem);
  });
});

// maximize
document.addEventListener('DOMContentLoaded', function() {
  const maximizeButton = document.querySelector('.maximize-button');
  const headerBar = document.querySelector('.header-bar');
  let iconImages = document.querySelectorAll('.open-window img[name="maximize"]');

  function toggleMaximized() {
    document.querySelectorAll('.open-window').forEach(function(windowElement) {
      windowElement.classList.toggle('maximized');

      if (windowElement.classList.contains('snap-left')) {
        windowElement.classList.remove('snap-left');
      }
      if (windowElement.classList.contains('snap-right')) {
        windowElement.classList.remove('snap-right');
      }
    });

    const iconImages = document.querySelectorAll('.open-window img[name="maximize"]');
    iconImages.forEach(function(iconImage) {
      if (iconImage.closest('.open-window').classList.contains('maximized')) {
        iconImage.src = 'img/unmaximize-icon.webp';
        document.documentElement.style.setProperty('--panel-bg', 'rgba(33,33,33,1.0)');
      } else {
        iconImage.src = 'img/maximize-icon.webp';
        document.documentElement.style.setProperty('--panel-bg', 'rgba(33,33,33,0.7)');
      }
    });
  }

  maximizeButton.addEventListener('click', toggleMaximized);
  headerBar.addEventListener('dblclick', toggleMaximized);
});

// START MENU
document.addEventListener('click', function(event) {
  const startButton = document.querySelector('.start-button');
  const startMenu = document.querySelector('#start-menu');

  if (event.target === startButton) {
    if (startMenu.hasAttribute('data-closed')) {
      startMenu.removeAttribute('data-closed');
      startMenu.setAttribute('data-opened', '');
    } else {
      startMenu.removeAttribute('data-opened');
      startMenu.setAttribute('data-closed', '');
    }
  } else if (!startMenu.contains(event.target)) {
    startMenu.removeAttribute('data-opened');
    startMenu.setAttribute('data-closed', '');
  }
});

// CLOCK
function displayTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();

  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");

  document.getElementById('date').textContent = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  document.getElementById('time').textContent = hours + ":" + minutes;
}

setInterval(displayTime, 60000);
displayTime();
