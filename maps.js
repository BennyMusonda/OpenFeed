const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
const globe = document.getElementById('globe');

speedSlider.addEventListener('input', (e) => {
    const sliderVal = parseInt(e.target.value);

    if (sliderVal === 0) {
        // Halt animation if slider is at minimum
        globe.style.animationPlayState = 'paused';
        speedValue.textContent = 'Paused';
    } else {
        // Resume rotation mapping higher values to lower iteration durations
        globe.style.animationPlayState = 'running';
        
        // Max value is 20, map it so high slider input gives low (faster) seconds
        const seconds = 21 - sliderVal; 
        
        globe.style.animationDuration = `${seconds}s`;
        speedValue.textContent = `${seconds}s`;
    }
});const earth = document.getElementById('earth');

let isDragging = false;
let previousMouseX = 0;
let backgroundX = 0;
let rotationSpeed = 0.5; // Controls the speed of automatic rotation

// Frame loop for automatic spinning
function animate() {
  if (!isDragging) {
    backgroundX -= rotationSpeed;
    earth.style.backgroundPosition = `${backgroundX}px 0`;
  }
  requestAnimationFrame(animate);
}

// Mouse Down - Start dragging
earth.addEventListener('mousedown', (e) => {
  isDragging = true;
  previousMouseX = e.clientX;
});

// Mouse Move - Drag & slide map coordinates
window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  
  const deltaX = e.clientX - previousMouseX;
  previousMouseX = e.clientX;
  
  // Adjust background coordinate manually based on mouse travel direction
  backgroundX += deltaX * 0.8; 
  earth.style.backgroundPosition = `${backgroundX}px 0`;
});

// Mouse Up - Stop dragging
window.addEventListener('mouseup', () => {
  isDragging = false;
});

// Initialize the animation loop
animate();
