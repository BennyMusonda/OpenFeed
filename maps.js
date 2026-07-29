// Initialize map parameters, starting out wide to emphasize a global layout view
const map = L.map('map', {
    center:,
    zoom: 2,
    minZoom: 2,
    maxZoom: 18,
    worldCopyJump: true // Enables seamless wrapping when scrolling around across edges
});

// Attach beautiful OpenStreetMap Map tiles with an elegant modern layout
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

// Keep track of active interactive state pins
let currentMarker = null;

// --- Global Spinning Effect Variables & Logic ---
let spinInterval = null;
const spinVelocity = 0.3; // Degree movement jump per ticking frame
const frameRateMs = 40;   // Interval tick rate (~25 frames per second drift animation)
let interactionTimeout = null;

// Starts or resumes the automated horizontal map movement simulation
function startMapSpinning() {
    if (spinInterval) return; // Prevent creating duplicate system loops
    
    spinInterval = setInterval(() => {
        const currentCenter = map.getCenter();
        // Shift longitude smoothly to create a horizontal spinning/rotating illusion
        let newLng = currentCenter.lng + spinVelocity;
        
        // Wrap coordinates to stay within realistic bounds
        if (newLng > 180) newLng -= 360;
        
        map.setView([currentCenter.lat, newLng], map.getZoom(), { animate: false });
    }, frameRateMs);
    
    document.getElementById('status-badge').className = "badge spinning";
    document.getElementById('status-badge').textContent = "Spinning Globe";
}

// Halts the horizontal spinning automation completely
function stopMapSpinning() {
    if (spinInterval) {
        clearInterval(spinInterval);
        spinInterval = null;
    }
    document.getElementById('status-badge').className = "badge tracking";
    document.getElementById('status-badge').textContent = "Tracking Active";
}

// Automatically pauses spinning during user interaction and triggers a resume countdown
function handleUserInteraction() {
    stopMapSpinning();
    clearTimeout(interactionTimeout);
    
    // Resume spinning if no user activity happens for 8 seconds
    interactionTimeout = setTimeout(() => {
        startMapSpinning();
    }, 8000);
}

// Bind native Leaflet listeners to detect user manual movement manipulations
map.on('movestart', () => {
    // Check if the movement was caused by user dragging, not the automated system script
    if (!spinInterval) clearTimeout(interactionTimeout); 
});
map.on('dragstart', stopMapSpinning);
map.on('zoomstart', stopMapSpinning);
map.on('mousedown', stopMapSpinning);


// --- Operational Geocode Location Search Query Execution handler ---
const searchForm = document.getElementById('map-search-form');
const searchInput = document.getElementById('search-input');
const locationDisplay = document.getElementById('location-display');

searchForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page from refreshing on form submission
    
    const query = searchInput.value.trim();
    if (!query) return;

    // Halt spinning immediately during programmatic lookups
    stopMapSpinning();
    clearTimeout(interactionTimeout);
    
    locationDisplay.textContent = `Searching for "${query}"...`;

    // Connect to OpenStreetMap Nominatim Open Web Service to convert string to coordinate maps
    const url = `https://openstreetmap.org{encodeURIComponent(query)}&limit=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const target = data[0];
                const lat = parseFloat(target.lat);
                const lon = parseFloat(target.lon);
                const displayName = target.display_name;

                // Adjust map zoom level selectively based on geographical entity category type
                const properZoom = target.type === 'country' ? 5 : 10;

                // Move map directly over the targeted results area
                map.setView([lat, lon], properZoom);

                // Clean up prior marker asset references
                if (currentMarker) {
                    map.removeLayer(currentMarker);
                }

                // Place a marker pinpoint over the located geographical coordinates
                currentMarker = L.marker([lat, lon]).addTo(map)
                    .bindPopup(`<b>${target.name || 'Location Result'}</b><br><span style="font-size:12px;">${displayName}</span>`)
                    .openPopup();

                // UI Display string verification adjustment feedback updates
                locationDisplay.textContent = target.name || displayName;
                searchInput.value = ''; // Clean form fields inputs
                
                // Allow world rotation script parameters to restart automatically shortly after focusing target
                interactionTimeout = setTimeout(startMapSpinning, 10000);
            } else {
                locationDisplay.textContent = "Location not found. Try another query.";
                interactionTimeout = setTimeout(startMapSpinning, 4000);
            }
        })
        .catch(err => {
            console.error("Geocoding transaction process failure exception:", err);
            locationDisplay.textContent = "Connection error. Please try again.";
            interactionTimeout = setTimeout(startMapSpinning, 4000);
        });
});

// Kickstart automated spinning configuration sequence right at boot runtime initialization
startMapSpinning();
