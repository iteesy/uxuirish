document.addEventListener("DOMContentLoaded", function() {
      const addAbout = document.getElementsByClassName('about')[0];  
      addAbout.innerHTML = "<span id='name'>Irish Tee-Sy</span> is designing experiences in <span id='work'>spatial awareness and computer vision for emerging technologies.</span>"; 
      const nameElement = document.getElementById('name');
      const headshot = document.querySelector('.headshot'); 

      // typing animation
      const captions = document.querySelectorAll('.caption');
      captions.forEach(caption => {
        const text = caption.innerHTML;
        caption.innerHTML = `<span class="caption-text">${text}</span>`;
        
        // add animation complete class after animation finishes
        if (caption.classList.contains('caption')) {
          const captionText = caption.querySelector('.caption-text');
          captionText.addEventListener('animationend', () => {
            captionText.classList.add('animation-complete');
          });
        }
      });

      //spanify effect to #work 
      const workElement = document.getElementById('work');
      spanify(workElement); // Apply spanify to individual letters

      // hover each character
      const letters = workElement.querySelectorAll("span");
      letters.forEach(letter => {
        letter.addEventListener('mouseenter', function() {
          // permanently remove background after hover!
          if (!letter.classList.contains('hovered')) {
            letter.classList.add('hovered');
          }
        });
      });

      // Initialize clock
      updateClock();
      setInterval(updateClock, 1000);
    });

    function spanify(element) {
  let letters = element.innerText.split(""); // split text to charaacters
  console.log(letters);
  
  element.innerText = ""; // clear content so we add spaces

  letters.forEach(letter => {
    // If letter is a space, create a span for it
    if (letter === " ") {
      element.insertAdjacentHTML("beforeend", `<span>&nbsp;</span>`); // Non-breaking space
    } else {
      element.insertAdjacentHTML("beforeend", `<span>${letter}</span>`); // Normal letter
    }
  });
  
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let amPm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; // to 12-hour format
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  const timeString = hours + ':' + minutes + ':' + seconds + ' ' + amPm;
  const clockElement = document.getElementById('clock');
  if (clockElement) {
    clockElement.textContent = timeString;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a mobile 
  if (window.innerWidth <= 768) {
    // Set a timeout to 5 seconds
    setTimeout(function() {
      document.getElementById('mobile-message').classList.add('visible');
    }, 10000); 
  }
});

const hydra = new Hydra({
  canvas: document.getElementById('hydraCanvas'),
  detectAudio: false,
  width: window.innerWidth,
  height: window.innerHeight
});

voronoi(300, 0.5)
  .luma(0.5)
  .add(shape(1, 1).luma(1))
  .modulate(
      osc(-300, -25)
          .modulate(osc(0.1).luma())
  )
  .scale(1.2)
  .pixelate(20, 20)
  .posterize(4)
  .blend(o0)
  .blend(o0)
  .blend(o0)
  .blend(o0)
  .out();
