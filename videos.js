
const observer = new IntersectionObserver((entries) => { 
  entries.forEach(entry => { 
    const video = entry.target; 
    
   
    if (entry.isIntersecting && entry.intersectionRatio >= 0.8) { 
      video.play().catch(err => console.log("autoplay blocked:", err)); 
    } else { 
      video.pause(); 
    } 
  }); 
}, { threshold: 0.8 }); 

videos.forEach(video => {
  observer.observe(video);
});


function togglePlay(button) { 
  const reel = button.closest('.reel'); 
  const video = reel.querySelector('video'); 
  const icon = button.querySelector('.material-symbols-outlined'); 
  
  if (video.paused) { 
      
    videos.forEach(v => {
      if (v !== video) v.pause(); 
    }); 
    video.play().catch(err => console.log("Play blocked:", err)); 
    icon.textContent = 'pause'; 
  } else { 
    video.pause(); 
    icon.textContent = 'play_arrow'; 
  } 
}
