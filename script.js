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
