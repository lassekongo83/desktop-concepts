// WINDOW
let isDragging = false;
let offsetX, offsetY;

// Function to handle mousedown event
function handleMouseDown(e) {
  const target = e.target.closest('.header-bar');
  if (target) {
    isDragging = true;
    offsetX = e.clientX - target.getBoundingClientRect().left;
    offsetY = e.clientY - target.getBoundingClientRect().top;
  }
}

// Function to handle mousemove event
function handleMouseMove(e) {
  if (!isDragging) return;
  const target = document.querySelector('.open-window');
  // Calculate the new position based on mouse movement
  const newX = e.clientX - offsetX;
  const newY = e.clientY - offsetY;
  
  // Update the position of.open-window
  target.style.transform = `translate(${newX}px, ${newY}px)`;
}


// Function to handle mouseup event
function handleMouseUp() {
  isDragging = false;
}

// Add event listeners
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

// Optionally, remove event listeners when the component is destroyed or no longer needed

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
  // Get the current hours and minutes
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
