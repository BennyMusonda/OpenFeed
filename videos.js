document.addEventListener("DOMContentLoaded", () => {
  const reels = document.querySelectorAll(".reel");

  // ==========================================================================
  // 1. AUTOPLAY & PAUSE ON SCROLL (Intersection Observer)
  // ==========================================================================
  // Plays the video currently in view and pauses all off-screen videos.
  const observerOptions = {
    root: document.querySelector(".reels-container"),
    threshold: 0.8, // Trigger when 80% of the video is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target.querySelector(".reel-video");

      if (entry.isIntersecting) {
        video.play().catch(() => {
          // Autoplay blocked handling: keeps video muted to ensure play works
          video.muted = true;
          video.play();
        });
      } else {
        video.pause();
        video.currentTime = 0; // Reset video position when scrolled past
      }
    });
  }, observerOptions);

  reels.forEach((reel) => observer.observe(reel));

  // ==========================================================================
  // 2. TAP VIDEO TO MUTE / UNMUTE
  // ==========================================================================
  reels.forEach((reel) => {
    const video = reel.querySelector(".reel-video");

    video.addEventListener("click", () => {
      video.muted = !video.muted;
      showMuteIndicator(reel, video.muted);
    });
  });

  // Brief visual feedback when muting/unmuting
  function showMuteIndicator(reel, isMuted) {
    const iconName = isMuted ? "volume-x" : "volume-2";
    const indicator = document.createElement("div");
    indicator.className = "mute-indicator";
    indicator.innerHTML = `<i data-feather="${iconName}"></i>`;

    reel.appendChild(indicator);
    feather.replace();

    // Trigger animation then remove
    requestAnimationFrame(() => indicator.classList.add("active"));
    setTimeout(() => {
      indicator.classList.remove("active");
      setTimeout(() => indicator.remove(), 200);
    }, 600);
  }

  // ==========================================================================
  // 3. INTERACTIVE LIKE BUTTON & DOUBLE-TAP TO LIKE
  // ==========================================================================
  reels.forEach((reel) => {
    const likeBtn = reel.querySelector('.action-btn:has([data-feather="heart"])');
    const video = reel.querySelector(".reel-video");
    let lastTap = 0;

    // Click on side like button
    if (likeBtn) {
      likeBtn.addEventListener("click", () => toggleLike(likeBtn));
    }

    // Double tap on video screen to like
    video.addEventListener("touchend", (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;

      if (tapLength < 300 && tapLength > 0) {
        e.preventDefault(); // Prevent default double-tap zoom
        if (likeBtn && !likeBtn.classList.contains("liked")) {
          toggleLike(likeBtn);
        }
        createHeartBurst(reel, e.changedTouches[0]);
      }
      lastTap = currentTime;
    });
  });

  function toggleLike(likeBtn) {
    const isLiked = likeBtn.classList.toggle("liked");
    const countSpan = likeBtn.querySelector("span");

    // Toggle color style directly or via class
    likeBtn.style.color = isLiked ? "#ff3040" : "#ffffff";

    // Optional: simple counter increment logic demo
    if (countSpan && !isNaN(parseFloat(countSpan.innerText))) {
      let currentVal = parseFloat(countSpan.innerText);
      countSpan.innerText = isLiked ? (currentVal + 0.1).toFixed(1) + "K" : (currentVal - 0.1).toFixed(1) + "K";
    }
  }

  // Floating heart effect on double tap
  function createHeartBurst(reel, touchLocation) {
    const heart = document.createElement("div");
    heart.className = "double-tap-heart";
    heart.innerHTML = `<i data-feather="heart"></i>`;

    // Position heart at tap location relative to the reel
    const rect = reel.getBoundingClientRect();
    const x = touchLocation.clientX - rect.left;
    const y = touchLocation.clientY - rect.top;

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    reel.appendChild(heart);
    feather.replace();

    setTimeout(() => heart.remove(), 800);
  }
});
