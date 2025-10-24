const player = document.getElementById('player');
const beyonce = document.getElementById('beyonce');
const gameArea = document.getElementById('game-area');
const bgMusic = document.getElementById('bg-music');
const toggleMusicBtn = document.getElementById('toggle-music');
const changeThemeBtn = document.getElementById('change-theme');
const volumeControl = document.getElementById('volume-control');

let playerPosition = { x: 100, y: 100 };
let beyoncePosition = { x: 300, y: 300 };
const playerSpeed = 40;
const beyonceSpeed = 1;

let musicStarted = false;
let musicMuted = false;
let currentTheme = 1;

window.addEventListener('keydown', (event) => {
  if (!musicStarted) {
    bgMusic.play();
    musicStarted = true;
  }

  switch (event.key) {
    case 'ArrowUp':
      if (playerPosition.y > 0) playerPosition.y -= playerSpeed;
      break;
    case 'ArrowDown':
      if (playerPosition.y < gameArea.clientHeight - 50) playerPosition.y += playerSpeed;
      break;
    case 'ArrowLeft':
      if (playerPosition.x > 0) playerPosition.x -= playerSpeed;
      break;
    case 'ArrowRight':
      if (playerPosition.x < gameArea.clientWidth - 50) playerPosition.x += playerSpeed;
      break;
  }
  updatePositions();
});

function moveBeyonce() {
  if (beyoncePosition.x < playerPosition.x) {
    beyoncePosition.x += beyonceSpeed;
  } else if (beyoncePosition.x > playerPosition.x) {
    beyoncePosition.x -= beyonceSpeed;
  }

  if (beyoncePosition.y < playerPosition.y) {
    beyoncePosition.y += beyonceSpeed;
  } else if (beyoncePosition.y > playerPosition.y) {
    beyoncePosition.y -= beyonceSpeed;
  }

  updatePositions();
  checkCollision();
}

function updatePositions() {
  player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`;
  beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`;
}

function checkCollision() {
  if (
    Math.abs(playerPosition.x - beyoncePosition.x) < 50 &&
    Math.abs(playerPosition.y - beyoncePosition.y) < 50
  ) {
    alert('¡Beyonce te atrapó!');
    playerPosition = { x: 100, y: 100 };
    beyoncePosition = { x: 300, y: 300 };
  }
}

function gameLoop() {
  moveBeyonce();
  requestAnimationFrame(gameLoop);
}

gameLoop();

toggleMusicBtn.addEventListener('click', () => {
  musicMuted = !musicMuted;
  bgMusic.muted = musicMuted;
  toggleMusicBtn.textContent = musicMuted ? 'Activar música' : 'Silenciar música';
});

changeThemeBtn.addEventListener('click', () => {
  if (currentTheme === 1) {
    gameArea.style.backgroundImage = "url('sonicBG.jpg')";
    gameArea.style.backgroundSize = "cover";
    beyonce.style.backgroundImage = "url('sonic.jpg')";
    bgMusic.src = "sonicST.mp3";
    if (!musicMuted) bgMusic.play();
    currentTheme = 2;
    changeThemeBtn.textContent = "Beyonce";
  } else {
    gameArea.style.backgroundImage = "none";
    gameArea.style.backgroundColor = "#f0f0f0";
    beyonce.style.backgroundImage = "url('beyonce.png')";
    bgMusic.src = "singleLadies.mp3";
    if (!musicMuted) bgMusic.play();
    currentTheme = 1;
    changeThemeBtn.textContent = "Sonic";
  }
});

volumeControl.addEventListener('input', () => {
  bgMusic.volume = volumeControl.value;
});
