// Elementi
const cursor = document.querySelector('.dot-cursor');
const contactSection = document.getElementById("contactSection");
const projectCart = document.querySelector('.project-cart');
const gallery = document.getElementById('projectsGallery');
const immagini = [
  "images/ShootingBTS1.jpg",
  "images/ShootingBTS3.jpg",
  "images/ShootingBTS2.jpg",
  "images/ShootingBTS4.jpg"
];
const imgElements = [
  document.getElementById("img1"),
  document.getElementById("img2")
];

// Variabili slideshow
let index = 0;
let current = 0;
let slideshowInterval = null;

// Helpers
function fadeIn(el, delay = 0, duration = 800, removeHidden = true) {
  if (!el) return;
  setTimeout(() => {
    if (removeHidden) el.classList.remove('hidden');
    el.classList.add('fade-in');
    setTimeout(() => el.classList.remove('fade-in'), duration);
  }, delay);
}

function fadeOut(el, delay = 0, duration = 800, hideAfter = true) {
  if (!el) return;
  setTimeout(() => {
    el.classList.add('fade-out');
    setTimeout(() => {
      el.classList.remove('fade-out');
      if (hideAfter) el.classList.add('hidden');
    }, duration);
  }, delay);
}

function hideGallery(galleryId, selector, step = 30, totalDelay = 400) {
  const g = document.getElementById(galleryId);
  if (!g || g.classList.contains('hidden')) return;
  const imgs = Array.from(g.querySelectorAll(selector));
  imgs.reverse().forEach((img, i) => setTimeout(() => {
    img.classList.remove('visible');
    img.classList.add('fade-out');
  }, i * step));
  setTimeout(() => {
    g.classList.add('hidden');
    imgs.forEach(img => img.classList.remove('fade-out'));
  }, imgs.length * step + totalDelay);
}

function updateCentered(galleryId, selector) {
  const g = document.getElementById(galleryId);
  if (!g) return;
  const imgs = g.querySelectorAll(selector);
  const center = g.getBoundingClientRect().left + g.offsetWidth / 2;
  let closest = null, minDist = Infinity;
  imgs.forEach(img => {
    const dist = Math.abs(center - (img.getBoundingClientRect().left + img.offsetWidth / 2));
    if (dist < minDist) { minDist = dist; closest = img; }
  });
  imgs.forEach(img => img.classList.remove('centered'));
  if (closest) closest.classList.add('centered');
}

// Cursor personalizzato
if (cursor) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
}

// Slideshow
function startSlideshow() {
  if (slideshowInterval) return;
  slideshowInterval = setInterval(() => {
    const nextIndex = (index + 1) % immagini.length;
    const fadingOut = imgElements[current];
    const fadingIn = imgElements[1 - current];

    fadingOut.classList.add("blurred");
    fadingIn.classList.add("blurred");

    setTimeout(() => {
      fadingIn.src = immagini[nextIndex];
      fadingIn.classList.add("visible");
      fadingOut.classList.remove("visible");
    }, 500);

    setTimeout(() => {
      fadingOut.classList.remove("blurred");
      fadingIn.classList.remove("blurred");
    }, 900);

    current = 1 - current;
    index = nextIndex;
  }, 2400);
}

function stopSlideshow() {
  clearInterval(slideshowInterval);
  slideshowInterval = null;
}

function hideSlideshowImages() {
  document.querySelectorAll('.homeimg').forEach(img => {
    img.classList.remove('visible', 'blurred');
    img.classList.add('fade-out');
    img.style.display = 'block';
    setTimeout(() => {
      img.style.display = 'none';
      img.classList.remove('fade-out');
    }, 700);
  });
}

// Overlay iniziale
window.addEventListener("load", () => {
  const overlay = document.querySelector(".blur-overlay");
  if (overlay) setTimeout(() => overlay.classList.add("blur-out"), 400);
  startSlideshow();
});

// Navigazione
function showContact() {
  if (contactSection) contactSection.classList.remove('hidden');
}

function hideContact() {
  if (contactSection) contactSection.classList.add('hidden');
}

function showHome() {
  const nav = document.querySelector('nav');
  if (nav) nav.classList.remove('hidden', 'fade-out');
  hideProjectCart();
  hideGallery('galleryPrj2', '.gallery-prj2-img');

  const projectImgs = document.querySelectorAll('#projectsGallery .project-img');
  projectImgs.forEach((img, i) => setTimeout(() => {
    img.classList.remove('visible');
    img.classList.add('fade-out');
  }, (projectImgs.length - 1 - i) * 400));

  setTimeout(() => {
    if (gallery) gallery.classList.add('hidden');
    projectImgs.forEach(img => img.classList.remove('fade-out'));
  }, 1000);

  if (contactSection) contactSection.classList.add('hidden');

  index = 0; current = 0;
  imgElements[0].src = immagini[0];
  imgElements[1].src = immagini[1];
  imgElements[0].classList.add('visible');
  imgElements[1].classList.remove('visible');
  imgElements.forEach(img => {
    img.style.display = 'block';
    img.style.opacity = '0';
    img.classList.remove('fade-out', 'blurred');
  });

  setTimeout(() => {
    imgElements[0].classList.add('visible');
    imgElements[0].style.opacity = '1';
    imgElements[1].style.opacity = '1';
    startSlideshow();
  }, 1700);
}

function showProjects() {
  stopSlideshow();
  hideSlideshowImages();
  hideGallery('galleryCollectionProcess', '.gallery-collection-img', 30, 400);
  hideGallery('galleryPrj3', '.gallery-prj3-img', 10, 400);
  hideLanguageSwitcher();
  hideMaterialDownload();
  if (contactSection) contactSection.classList.add("hidden");

  const about = document.getElementById('about');
  if (about && !about.classList.contains('hidden')) fadeOut(about, 0, 800);

  if (projectCart) {
    projectCart.classList.remove('hidden');
    void projectCart.offsetWidth;
    projectCart.classList.add('visible');
  }

  if (gallery) {
    gallery.classList.remove('hidden');
    const projectImgs = gallery.querySelectorAll('.project-img');
    const projectLabels = gallery.querySelectorAll('.project-label');
    projectImgs.forEach(img => img.classList.remove('visible'));
    projectLabels.forEach(label => label.classList.remove('visible'));
    const initialDelay = 700;
    const stepDelay = 425;
    projectImgs.forEach((img, i) => setTimeout(() => {
      img.classList.add('visible');
      if (projectLabels[i]) projectLabels[i].classList.add('visible');
    }, initialDelay + i * stepDelay));
  }
}

function hideProjectCart() {
  if (!projectCart) return;
  setTimeout(() => {
    projectCart.classList.remove('visible');
    const duration = parseFloat(getComputedStyle(projectCart).transitionDuration) * 1000 || 2000;
    setTimeout(() => projectCart.classList.add('hidden'), duration);
  }, 1000);
}
