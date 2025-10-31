const btn = document.getElementById('giftButton');
const surprise = document.getElementById('surprise');
const song = document.getElementById('song');
const container = document.querySelector('.container');
const surpriseImage = document.getElementById('surpriseImage');

// Creepy messages
const messages = [
  "Klicke hier... wenn du dich traust",
  "Nein nicht da, hier!",
  "Fast... aber noch nicht ganz!",
  "Das ist deine letzte Chance..."
];

let step = 0;

// Typing effect
function typeMessage(element, message, speed = 60) {
  element.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    element.textContent += message[i];
    i++;
    if (i >= message.length) clearInterval(interval);
  }, speed);
}

// Button click logic
btn.addEventListener('click', () => {
  if (step < messages.length - 1) {
    const btnRect = btn.getBoundingClientRect();
    const padding = 20; // extra buffer for iOS safe area

    // iOS fix: get true visible height using visualViewport
    const viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
    const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;

    // Clamp random positions so button never leaves the visible area
    const maxX = Math.max(0, viewportWidth - btnRect.width - padding);
    const maxY = Math.max(0, viewportHeight - btnRect.height - padding);

    // Random new position within bounds
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Reset transform first to avoid compounding offsets
    btn.style.transform = "translate(0, 0)";
    btn.style.left = `${randomX}px`;
    btn.style.top = `${randomY}px`;

    typeMessage(btn, messages[step], 50);
    step++;
  } else {
    // Final click
    typeMessage(btn, "Na endlich... klicke auf das Bild", 50);
    btn.disabled = true;

    // Center button safely (works on all devices)
    btn.style.position = "fixed";
    btn.style.left = "50%";
    btn.style.top = "50%";
    btn.style.transform = "translate(-50%, -50%)";

    surprise.classList.remove('hidden');

 // Show the surprise image, but DO NOT play music yet
    surprise.classList.remove('hidden');
  }
});

// Image swap on click AND play music
const imageSources = [
  'assets/images/her1.png',
  'assets/images/her2.png'
];
let imageIndex = 0;

surpriseImage.addEventListener('click', () => {
  // Swap image
  imageIndex = (imageIndex + 1) % imageSources.length;
  surpriseImage.src = imageSources[imageIndex];

  // Play music when first clicked
  if (song.paused) {
    song.play();
  }
   // Hide the button
  btn.style.display = 'none';
});