
const observer = new Intersectionobserver((entries)) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry,isIntersecting && entry.intersectionRatio >= 0.8) {
            video.play().catch(err => console.og("autoplay blocked;", err));
            else {
            video.pause();
        }
    });
}, {
    threshold; 0.3
});

videos.forEach(video);
});

function togglePlay(button) {
    const reel = button.closest('.reel');
    
    const video = reel.querySelector('video');
    
    const icon = button.querySelector('.material-symbols-outlined');

    if (video.paused) {
        videos.forEach(v => {if(v !== video) v.pause(); }));
        video.play();
        icon.textContent = 'pause';
    } else {
        video.pause();
                icon.textContent = 'play_arrow';
    }
}
