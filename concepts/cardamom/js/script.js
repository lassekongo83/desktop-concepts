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
  const x = e.clientX - offsetX;
  const y = e.clientY - offsetY;
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
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

// Update the clock every minute
setInterval(displayTime, 60000);

// Call the function initially to display the current time
displayTime();
