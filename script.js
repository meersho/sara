/* ── HAPPY BIRTHDAY SARA 🌸 ── */

// ── PHOTOS DATA ──
// You can replace images/img1.jpeg through img8.jpeg with your own photos of Sara!
const photos = [
  {
    src: "images/img1.jpeg",
    caption: "Sweetest Soul & Sunshine 🌸",
    tapeColor: "rgba(255, 179, 198, 0.85)",
    tapeRot: "-2deg",
    rot: -3.5,
    delay: 0.1
  },
  {
    src: "images/img2.jpeg",
    caption: "Certified Nakama 👒🏴‍☠️",
    tapeColor: "rgba(255, 223, 186, 0.85)",
    tapeRot: "2.5deg",
    rot: 2.2,
    delay: 0.22
  },
  {
    src: "images/img3.jpeg",
    caption: "Sweetest Voice in the Crew 🎙️✨",
    tapeColor: "rgba(255, 202, 212, 0.85)",
    tapeRot: "-1.8deg",
    rot: -2.0,
    delay: 0.35
  },
  {
    src: "images/img4.jpeg",
    caption: "Finding the One Piece (Our Dosti) 💖",
    tapeColor: "rgba(226, 236, 233, 0.85)",
    tapeRot: "3deg",
    rot: 3.8,
    delay: 0.48
  },
  {
    src: "images/img5.jpeg",
    caption: "Pure Aesthetic Vibes 🎀",
    tapeColor: "rgba(252, 246, 189, 0.85)",
    tapeRot: "-2.8deg",
    rot: -3.0,
    delay: 0.6
  },
  {
    src: "images/img6.jpeg",
    caption: "Heart of Pure Gold 🌷",
    tapeColor: "rgba(255, 218, 224, 0.85)",
    tapeRot: "1.5deg",
    rot: 1.8,
    delay: 0.72
  },
  {
    src: "images/img7.jpeg",
    caption: "Gorgeous Main Character 🌟",
    tapeColor: "rgba(223, 204, 241, 0.85)",
    tapeRot: "-3.2deg",
    rot: -1.5,
    delay: 0.85
  },
  {
    src: "images/img8.jpeg",
    caption: "Forever Our Favorite 🥂",
    tapeColor: "rgba(254, 226, 230, 0.85)",
    tapeRot: "2.2deg",
    rot: 3.2,
    delay: 0.98
  }
];

// ── RENDER POLAROID GALLERY ──
const galleryGrid = document.getElementById('gallery-grid');
if (galleryGrid) {
  photos.forEach((photo, idx) => {
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    card.style.setProperty('--rot', `${photo.rot}deg`);
    card.style.setProperty('--delay', `${photo.delay}s`);
    card.style.setProperty('--tape-color', photo.tapeColor);
    card.style.setProperty('--tape-rot', photo.tapeRot);

    card.innerHTML = `
      <div class="washi-tape"></div>
      <div class="polaroid-img-wrap">
        <img src="${photo.src}" alt="${photo.caption}" loading="lazy" onerror="this.src='images/img${(idx % 8) + 1}.jpeg'">
      </div>
      <div class="polaroid-caption">${photo.caption}</div>
      <span class="view-badge">🔍 view</span>
    `;

    card.addEventListener('click', () => openLightbox(idx));
    galleryGrid.appendChild(card);
  });
}

// ── LIGHTBOX LOGIC ──
let currentPhotoIdx = 0;
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCounter = document.getElementById('lightbox-counter');
const lightboxCloseBtn = document.getElementById('lightbox-close');
const lightboxPrevBtn = document.getElementById('lightbox-prev');
const lightboxNextBtn = document.getElementById('lightbox-next');

function openLightbox(index) {
  currentPhotoIdx = index;
  updateLightboxContent();
  lightboxModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxModal.classList.remove('active');
  document.body.style.overflow = '';
}

function updateLightboxContent() {
  const item = photos[currentPhotoIdx];
  lightboxImg.src = item.src;
  lightboxCaption.textContent = item.caption;
  lightboxCounter.textContent = `Memory ${currentPhotoIdx + 1} of ${photos.length}`;
}

function showPrevPhoto() {
  currentPhotoIdx = (currentPhotoIdx - 1 + photos.length) % photos.length;
  updateLightboxContent();
}

function showNextPhoto() {
  currentPhotoIdx = (currentPhotoIdx + 1) % photos.length;
  updateLightboxContent();
}

if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrevPhoto(); });
if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNextPhoto(); });

if (lightboxModal) {
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });
}

window.addEventListener('keydown', (e) => {
  if (!lightboxModal.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrevPhoto();
  if (e.key === 'ArrowRight') showNextPhoto();
});

// ── BACKGROUND CANVAS (STARS + FLOATING HEARTS) ──
const canvas = document.getElementById('particles-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Star {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * (canvas ? canvas.width : 800);
    this.y = Math.random() * (canvas ? canvas.height : 600);
    this.r = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random();
    this.speed = Math.random() * 0.015 + 0.005;
    this.color = Math.random() > 0.4 ? 'rgba(255, 182, 193,' : 'rgba(235, 175, 80,';
  }
  update() {
    this.alpha += this.speed;
    if (this.alpha > 1 || this.alpha < 0) this.speed = -this.speed;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `${this.color}${Math.abs(Math.sin(this.alpha)) * 0.75})`;
    ctx.fill();
  }
}

class FloatingHeart {
  constructor() {
    this.reset(true);
  }
  reset(randomY = false) {
    this.x = Math.random() * (canvas ? canvas.width : 800);
    this.y = randomY ? Math.random() * (canvas ? canvas.height : 600) : (canvas ? canvas.height + 20 : 620);
    this.size = Math.random() * 10 + 8;
    this.speedY = Math.random() * 0.5 + 0.3;
    this.speedX = Math.sin(Math.random() * Math.PI) * 0.4;
    this.opacity = Math.random() * 0.4 + 0.15;
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = Math.random() * 0.02 + 0.01;
    this.color = ['#FFCAD4', '#F4ACB7', '#FDE2E4', '#FFB3C6'][Math.floor(Math.random() * 4)];
  }
  update() {
    this.y -= this.speedY;
    this.wobble += this.wobbleSpeed;
    this.x += Math.sin(this.wobble) * 0.5;
    if (this.y < -30) this.reset(false);
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.size / 20, this.size / 20);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    // Heart shape path
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-10, -10, -15, 5, 0, 15);
    ctx.bezierCurveTo(15, 5, 10, -10, 0, 0);
    ctx.fill();
    ctx.restore();
  }
}

function initParticles() {
  particles = [];
  if (!canvas) return;
  for (let i = 0; i < 90; i++) {
    particles.push(new Star());
  }
  for (let i = 0; i < 22; i++) {
    particles.push(new FloatingHeart());
  }
}

function animateParticles() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

if (canvas) {
  resizeCanvas();
  initParticles();
  animateParticles();
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
}

// ── PASTEL CONFETTI ENGINE ──
const CONFETTI_PALETTE = [
  '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA',
  '#FFCAD4', '#F4ACB7', '#E5A93C', '#FFF1F5', '#F72585', '#7209B7'
];

function spawnConfetti(count = 70) {
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const isRound = Math.random() > 0.45;
    const isSpecial = Math.random() > 0.88;
    const size = 7 + Math.random() * 9;
    const duration = 2.8 + Math.random() * 2.2;
    const delay = Math.random() * 0.8;
    const color = CONFETTI_PALETTE[Math.floor(Math.random() * CONFETTI_PALETTE.length)];

    if (isSpecial) {
      piece.textContent = Math.random() > 0.5 ? '🌸' : '✨';
      piece.style.fontSize = `${size + 4}px`;
    } else {
      piece.style.backgroundColor = color;
      piece.style.width = `${size}px`;
      piece.style.height = `${isRound ? size : size * 1.5}px`;
      piece.style.borderRadius = isRound ? '50%' : '2px';
    }

    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.animationDuration = `${duration}s`;
    piece.style.animationDelay = `${delay}s`;

    document.body.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}

// Initial gentle welcome shower
setTimeout(() => spawnConfetti(60), 600);

// ── SPARKS & FIREWORKS ──
function launchFireworks() {
  playCelebrationChime();
  spawnConfetti(110);

  const bursts = [
    { x: 22, y: 35 },
    { x: 78, y: 30 },
    { x: 50, y: 22 },
    { x: 35, y: 48 },
    { x: 65, y: 45 }
  ];

  bursts.forEach((point, idx) => {
    setTimeout(() => createBurst(point.x, point.y), idx * 240);
  });
}

function createBurst(xPercent, yPercent) {
  const container = document.createElement('div');
  container.className = 'firework-origin';
  container.style.left = `${xPercent}vw`;
  container.style.top = `${yPercent}vh`;
  document.body.appendChild(container);

  const sparkCount = 28;
  const baseColor = CONFETTI_PALETTE[Math.floor(Math.random() * CONFETTI_PALETTE.length)];

  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement('div');
    spark.className = 'firework-spark';
    const angle = (i / sparkCount) * Math.PI * 2 + (Math.random() * 0.2);
    const dist = 60 + Math.random() * 95;
    spark.style.background = Math.random() > 0.5 ? baseColor : '#FFFFFF';
    spark.style.boxShadow = `0 0 8px ${baseColor}`;
    spark.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    spark.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
    spark.style.animationDuration = `${0.8 + Math.random() * 0.4}s`;
    container.appendChild(spark);
  }

  setTimeout(() => container.remove(), 1400);
}

// ── WEB AUDIO API HARP / CHIME SYNTHESIZER ──
// Provides magical musical notes without needing external MP3 audio files
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
}

function playCelebrationChime() {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  // Sweet pentatonic arpeggio (C5, E5, G5, A5, C6)
  const notes = [523.25, 659.25, 783.99, 880.00, 1046.50, 1318.51];
  const now = audioCtx.currentTime;

  notes.forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.12);

    gain.gain.setValueAtTime(0.001, now + idx * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.12 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 0.9);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now + idx * 0.12);
    osc.stop(now + idx * 0.12 + 1.0);
  });
}

// Sound toggle button
const soundToggleBtn = document.getElementById('sound-toggle');
if (soundToggleBtn) {
  soundToggleBtn.addEventListener('click', () => {
    initAudio();
    soundEnabled = !soundEnabled;
    soundToggleBtn.innerHTML = soundEnabled ? '🔔 Sound: On' : '🔕 Sound: Off';
    if (soundEnabled) {
      playCelebrationChime();
    }
  });
}

// Expose celebrate function to global scope
window.launchFireworks = launchFireworks;
