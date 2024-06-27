let windowElem = document.querySelector('.open-window');

// WINDOW
// Make the DIV element draggable:
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
    if (windowElem.classList.contains('snap-left')) {
      windowElem.classList.remove('snap-left');
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

// tiling preview
let mouseIsDown = false;

const handleMouseEvent = (event) => {
  const snapPrev = document.querySelector('.snap-view');
  const rect = event.currentTarget.getBoundingClientRect();
  const cursorXRelativeToDesktop = event.clientX - rect.left;
  const desktopWidth = rect.width;

  if (event.type === 'mousedown') {
    mouseIsDown = true;
  }
  if (event.type === 'mouseup') {
    mouseIsDown = false;
  }

  if (mouseIsDown && ['mousedown', 'mousemove'].includes(event.type)) {
    if (cursorXRelativeToDesktop <= 0) {
      snapPrev.classList.add('left');
    }
    else {
      snapPrev.classList.remove('left');
    }
  }
  else if (!mouseIsDown && ['mousedown', 'mouseup'].includes(event.type)) {
    if (cursorXRelativeToDesktop <= 0) {
      snapPrev.classList.remove('left');
      windowElem.classList.add('snap-left');
    }
  }
};

document.querySelector('.desktop').addEventListener('mousedown', handleMouseEvent);
document.querySelector('.desktop').addEventListener('mousemove', handleMouseEvent);
document.querySelector('.desktop').addEventListener('mouseup', handleMouseEvent);

// SHOW DESKTOP / MINIMIZE
const showDesktop = document.querySelector('#show-desktop');
const task = document.querySelector('.task');
const minimize = document.querySelector('.minimize-button');

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
  let iconImages = document.querySelectorAll('.open-window img[name="maximize"]');

  maximizeButton.addEventListener('click', function() {
    document.querySelectorAll('.open-window').forEach(function(windowElement) {
      windowElement.classList.toggle('maximized');
      if (windowElement.classList.contains('snap-left')) {
        windowElement.classList.remove('snap-left');
      }
    });

    iconImages = document.querySelectorAll('.open-window img[name="maximize"]');

    iconImages.forEach(function(iconImage) {
      if (iconImage.closest('.open-window').classList.contains('maximized')) {
        iconImage.src = 'img/unmaximize-icon.webp';
      } else {
        iconImage.src = 'img/maximize-icon.webp';
      }
    });
  });
});

// change panel color when maximized
document.addEventListener('DOMContentLoaded', () => {
  function updatePanelBg() {
    if (windowElem.classList.contains('maximized')) {
      document.documentElement.style.setProperty('--panel-bg', 'rgba(33,33,33,1.0)');
    } else {
      document.documentElement.style.setProperty('--panel-bg', 'rgba(33,33,33,0.7)');
    }
  }

  updatePanelBg();

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        updatePanelBg();
      }
    });
  });

  observer.observe(windowElem, {
    attributes: true,
    attributeFilter: ['class']
  });
});

// START MENU
const startButton = document.querySelector('.start-button');
const startMenuDiv = document.querySelector('#start-menu');

startButton.addEventListener('click', function() {
  if (startMenuDiv.hasAttribute('data-closed')) {
    startMenuDiv.removeAttribute('data-closed');
    startMenuDiv.setAttribute('data-opened', '');
  } else {
    startMenuDiv.removeAttribute('data-opened');
    startMenuDiv.setAttribute('data-closed', '');
  }
});

// Close app menu when clicking outside it
document.addEventListener('mousedown', function(event) {
  if (!startMenuDiv.contains(event.target) && event.target!== startButton) {
    startMenuDiv.removeAttribute('data-opened');
    startMenuDiv.setAttribute('data-closed', '');
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
