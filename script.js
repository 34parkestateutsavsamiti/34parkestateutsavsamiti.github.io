const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const yearNode = document.getElementById('year');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const sponsorTrigger = document.querySelector('.sponsor-trigger');
const gallery = document.querySelector('#royal-optics-gallery');
const galleryImage = gallery?.querySelector('.gallery-image');
const galleryCounter = gallery?.querySelector('.gallery-counter');
const galleryCloseButtons = gallery?.querySelectorAll('[data-gallery-close]');
const galleryPrevious = gallery?.querySelector('.gallery-prev');
const galleryNext = gallery?.querySelector('.gallery-next');
const galleryImages = Array.from({ length: 9 }, (_, index) => `assets/images/royal-optics${index + 1}.jpg`);
let galleryIndex = 0;

const updateGallery = () => {
  if (!galleryImage || !galleryCounter) return;

  galleryImage.src = galleryImages[galleryIndex];
  galleryImage.alt = `Royal Optics gallery image ${galleryIndex + 1}`;
  galleryCounter.textContent = `${galleryIndex + 1} / ${galleryImages.length}`;
};

const closeGallery = () => {
  if (!gallery) return;

  gallery.hidden = true;
  document.body.classList.remove('gallery-open');
};

const openGallery = () => {
  if (!gallery) return;

  galleryIndex = 0;
  updateGallery();
  gallery.hidden = false;
  document.body.classList.add('gallery-open');
  gallery.querySelector('.gallery-close')?.focus();
};

sponsorTrigger?.addEventListener('click', openGallery);
sponsorTrigger?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openGallery();
  }
});

galleryCloseButtons?.forEach((button) => button.addEventListener('click', closeGallery));
galleryPrevious?.addEventListener('click', () => {
  galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
  updateGallery();
});
galleryNext?.addEventListener('click', () => {
  galleryIndex = (galleryIndex + 1) % galleryImages.length;
  updateGallery();
});

document.addEventListener('keydown', (event) => {
  if (!gallery || gallery.hidden) return;

  if (event.key === 'Escape') closeGallery();
  if (event.key === 'ArrowLeft') galleryPrevious?.click();
  if (event.key === 'ArrowRight') galleryNext?.click();
});


/* =========================================================
   BACKGROUND YOUTUBE MUSIC
   Note: modern browsers may block unmuted autoplay until
   the visitor interacts with the page. We attempt autoplay
   and then unlock playback on the first interaction.
========================================================= */
/* const musicFrame = document.getElementById('background-youtube');
const musicToggle = document.getElementById('music-toggle');
const musicLabel = document.getElementById('music-label');
let musicMuted = false;

const youtubeCommand = (func, args = []) => {
  if (!musicFrame?.contentWindow) return;
  musicFrame.contentWindow.postMessage(JSON.stringify({
    event: 'command',
    func,
    args
  }), '*');
};

const setMusicUi = () => {
  if (!musicToggle) return;
  musicToggle.textContent = musicMuted ? '🔇' : '🔊';
  musicToggle.setAttribute('aria-label', musicMuted ? 'Play background music' : 'Mute background music');
  musicToggle.setAttribute('aria-pressed', String(musicMuted));
  if (musicLabel) musicLabel.textContent = musicMuted ? 'Music muted' : 'Bappa music';
};

musicToggle?.addEventListener('click', () => {
  if (musicMuted) {
    youtubeCommand('unMute');
    youtubeCommand('playVideo');
    musicMuted = false;
  } else {
    youtubeCommand('mute');
    musicMuted = true;
  }
  setMusicUi();
});

const unlockMusic = () => {
  if (musicMuted) return;
  youtubeCommand('playVideo');
  youtubeCommand('unMute');
};

['pointerdown', 'keydown', 'touchstart'].forEach((eventName) => {
  document.addEventListener(eventName, unlockMusic, { once: true, passive: true });
});

setMusicUi(); */

/* =========================================================
   UTSAV MOMENTS CAROUSEL
========================================================= */
const momentsCarousel = document.getElementById('moments-carousel');

if (momentsCarousel) {
  const slides = Array.from(momentsCarousel.querySelectorAll('.moment-slide'));
  const dots = Array.from(document.querySelectorAll('.carousel-dot'));
  const previous = momentsCarousel.querySelector('.carousel-prev');
  const next = momentsCarousel.querySelector('.carousel-next');
  let momentIndex = 0;

  const showMoment = (index) => {
    momentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === momentIndex);
      slide.setAttribute('aria-hidden', String(i !== momentIndex));
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === momentIndex);
      dot.setAttribute('aria-selected', String(i === momentIndex));
    });
  };

  previous?.addEventListener('click', () => showMoment(momentIndex - 1));
  next?.addEventListener('click', () => showMoment(momentIndex + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => showMoment(i)));

  let touchStartX = null;
  const viewport = momentsCarousel.querySelector('.carousel-viewport');

  viewport?.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  viewport?.addEventListener('touchend', (event) => {
    if (touchStartX === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 45) showMoment(momentIndex + (delta < 0 ? 1 : -1));
    touchStartX = null;
  }, { passive: true });

  showMoment(0);
}
