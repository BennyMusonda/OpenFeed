document.addEventListener("DOMContentLoaded", () => {
    const followBtn = document.getElementById("followBtn");
    const followerCount = document.getElementById("followerCount");
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    let isFollowing = false;
    let baselineFollowers = 1248;

    // Follower State Toggle Event
    followBtn.addEventListener("click", () => {
        isFollowing = !isFollowing;
        
        if (isFollowing) {
            followBtn.textContent = "Following";
            followBtn.classList.add("following");
            followerCount.textContent = (baselineFollowers + 1).toLocaleString();
        } else {
            followBtn.textContent = "Follow";
            followBtn.classList.remove("following");
            followerCount.textContent = baselineFollowers.toLocaleString();
        }
    });

    // Content Tab Switching Logic
    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetTab = button.getAttribute("data-tab");

            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabPanels.forEach(panel => panel.classList.remove("active"));

            button.classList.add("active");
            document.getElementById(targetTab).classList.add("active");
        });
    });
});
