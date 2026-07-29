<!-- Leaflet Map JavaScript dependencies -->
    <script src="https://unpkg.com" crossorigin=""></script>

        // Global structural application states
        let map;
        let userMarker;
        let userAccuracyCircle;
        let isFirstLoad = true;

        // Initialize the geographic canvas layout
        function initMap() {
            // Default setup pointing to global view coordinates before tracking hooks activate
            map = L.map('map').setView([0, 0], 2);

            // Fetch and render open street map standard layout layers
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Establish real-time persistent browser hardware tracking loops
            startLiveTracking();
        }

        // Establish connection hooks directly into hardware Geolocation APIs
        function startLiveTracking() {
            if (!navigator.geolocation) {
                updateUIError("Your browser or device layout lacks hardware location engines.");
                return;
            }

            // Real-time position watching thread
            navigator.geolocation.watchPosition(
                handlePositionSuccess, 
                handlePositionError, 
                {
                    enableHighAccuracy: true, // Forces precise GPS tracking metrics
                    timeout: 10000,           // Times out stream loops after 10 seconds of freeze
                    maximumAge: 0             // Prevents processing cached location data
                }
            );
        }

        // Processing loop handling newly streamed coordination snapshots
        function handlePositionSuccess(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            // Reverse Geocoding via open-source communities to extract region titles
            fetch(`https://openstreetmap.org{lat}&lon=${lng}`)
                .then(response => response.json())
                .then(data => {
                    // Extract clear street/neighborhood context
                    const areaName = data.address.suburb || data.address.neighbourhood || data.address.city || "New Shared Region";
                    const fullAddress = data.display_name;
                    
                    document.getElementById('location-display').innerText = `Entered: ${areaName} (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
                    document.getElementById('status-badge').innerText = "Live Active Status";
                    document.getElementById('status-badge').style.background = "#d4edda";
                    document.getElementById('status-badge').style.color = "#155724";

                    // Bind context bubbles to map markers
                    updateMarkerOnMap(lat, lng, accuracy, `<b>You entered here!</b><br>${areaName}`);
                })
                .catch(() => {
                    document.getElementById('location-display').innerText = `Coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                    updateMarkerOnMap(lat, lng, accuracy, "<b>Your Position</b>");
                });
        }

        // Update visual marker assets on live view adjustments
        function updateMarkerOnMap(lat, lng, accuracy, popupMessage) {
            if (userMarker) {
                // Shift properties dynamically if element assets exist
                userMarker.setLatLng([lat, lng]).setPopupContent(popupMessage);
                userAccuracyCircle.setLatLng([lat, lng]).setRadius(accuracy);
            } else {
                // Initialize elements when coordinates arrive for the first time
                userMarker = L.marker([lat, lng]).addTo(map).bindPopup(popupMessage).openPopup();
                userAccuracyCircle = L.circle([lat, lng], { radius: accuracy, opacity: 0.3 }).addTo(map);
            }

            // Automatically pan map view instantly to center your newest coordinates
            if (isFirstLoad) {
                map.setView([lat, lng], 16); // Snap to neighborhood layout closeness zoom
                isFirstLoad = false;
            } else {
                map.panTo([lat, lng]);
            }
        }

        // Handling structural failure anomalies safely
        function handlePositionError(error) {
            let message = "Unable to determine your precise zone coordinates.";
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    message = "Location tracking request denied by user permission rules.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    message = "Network issues or poor signal connection broke location data streams.";
                    break;
                case error.TIMEOUT:
                    message = "Location tracking request timed out.";
                    break;
            }
            updateUIError(message);
        }

        function updateUIError(errorMessage) {
            document.getElementById('location-display').innerText = errorMessage;
            document.getElementById('status-badge').innerText = "Offline/Error";
            document.getElementById('status-badge').style.background = "#f8d7da";
            document.getElementById('status-badge').style.color = "#721c24";
        }

        // Trigger map allocation pipeline execution on document presentation lifecycle events
        window.onload = initMap;
