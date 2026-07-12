

function togglePlay(button) {
    const reel = button.closest('.reel');
    
    const video = reel.querySelector('video');
    
    const icon = button.querySelector('.material-symbols-outlined');

    if (video.paused) {
        video.play();
        icon.textContent = 'pause';
    } else {
        video.pause();
                icon.textContent = 'play_arrow';
    }
}
