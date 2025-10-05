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

// Cursor personalizzato
if (cursor) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
}

// Slideshow functions
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

// Mostra overlay iniziale
window.addEventListener("load", () => {
  const overlay = document.querySelector(".blur-overlay");
  if (overlay) {
    setTimeout(() => {
      overlay.classList.add("blur-out");
    }, 400);
  }

  startSlideshow();
});

// Navigazione
function showContact() {
  // Non toccare slideshow o immagini homeimg
  if (contactSection) {
    contactSection.classList.remove('hidden');
  }
}

function hideContact() {
  if (contactSection) contactSection.classList.add('hidden');
}

function showHome() {
  // Mostra la navbar se era nascosta
  const nav = document.querySelector('nav');
  if (nav) {
    nav.classList.remove('hidden', 'fade-out');
  }

  hideProjectCart();

  // Nascondi la gallery orizzontale se attiva
  const gallery2 = document.getElementById('galleryPrj2');
  if (gallery2) {
    gallery2.classList.add('hidden');
    // Rimuovi anche la classe 'centered' e 'visible' dalle immagini
    const imgs = gallery2.querySelectorAll('.gallery-prj2-img');
    imgs.forEach(img => {
      img.classList.remove('centered', 'visible');
    });
  }

  const projectImgs = document.querySelectorAll('#projectsGallery .project-img');
  const totalImgs = projectImgs.length;
  projectImgs.forEach((img, i) => {
    setTimeout(() => {
      img.classList.remove('visible');
      img.classList.add('fade-out');
    }, (totalImgs - 1 - i) * 400);
  });

  setTimeout(() => {
    if (gallery) gallery.classList.add('hidden');
    projectImgs.forEach(img => img.classList.remove('fade-out'));
  }, 1000);

  if (contactSection) contactSection.classList.add('hidden');

  // Reset slideshow (ma non mostra subito le immagini)
  index = 0;
  current = 0;
  imgElements[0].src = immagini[0]; // Prima immagine
  imgElements[1].src = immagini[1]; // Seconda immagine
  imgElements[0].classList.add('visible');
  imgElements[1].classList.remove('visible');
  imgElements.forEach(img => {
    img.style.display = 'block';
    img.style.opacity = '0';
    img.classList.remove('fade-out', 'blurred');
  });

  // Delay + fade-in
  setTimeout(() => {
    imgElements[0].classList.add('visible');
    imgElements[0].style.opacity = '1';
    imgElements[1].style.opacity = '1';
    startSlideshow();
  }, 1700); // 700ms delay, puoi aumentare se vuoi più attesa
}

function showProjects() {
  stopSlideshow();
  hideSlideshowImages();

  // Nascondi la sezione About con fade-out
  const about = document.getElementById('about');
  if (about && !about.classList.contains('hidden')) {
    about.classList.remove('visible');
    about.classList.add('fade-out');
    setTimeout(() => {
      about.classList.add('hidden');
      about.classList.remove('fade-out');
    }, 800); // Durata del fade-out
  }

  // Nascondi i tasti IT e EN
  hideLanguageSwitcher();
  hideMaterialDownload();
  if (contactSection) contactSection.classList.add("hidden");

  // Nascondi la gallery collection process se visibile con fade-out a cascata inverso
  const collectionGallery = document.getElementById('galleryCollectionProcess');
  if (collectionGallery && !collectionGallery.classList.contains('hidden')) {
    const imgsCP = Array.from(collectionGallery.querySelectorAll('.gallery-collection-img'));
    const totalImgs = imgsCP.length;
    imgsCP.reverse().forEach((img, i) => {
      setTimeout(() => {
        img.classList.remove('visible');
        img.classList.add('fade-out');
      }, i * 30); // Puoi regolare la velocità qui
    });
    setTimeout(() => {
      collectionGallery.classList.add('hidden');
      imgsCP.forEach(img => img.classList.remove('fade-out'));
    }, totalImgs * 120 + 400); // Attendi la fine del fade-out prima di nascondere la gallery
  }

  // Nascondi la galleryPrj3 se visibile con fade-out a cascata inverso
  const gallery3 = document.getElementById('galleryPrj3');
  if (gallery3 && !gallery3.classList.contains('hidden')) {
    const imgsPrj3 = Array.from(gallery3.querySelectorAll('.gallery-prj3-img'));
    const totalImgsPrj3 = imgsPrj3.length;
    imgsPrj3.reverse().forEach((img, i) => {
      setTimeout(() => {
        img.classList.remove('visible');
        img.classList.add('fade-out');
      }, i * 10); // Puoi regolare la velocità qui
    });
    setTimeout(() => {
      gallery3.classList.add('hidden');
      imgsPrj3.forEach(img => img.classList.remove('fade-out'));
    }, totalImgsPrj3 * 120 + 400); // Attendi la fine del fade-out prima di nascondere la gallery
  }

  if (projectCart) {
    projectCart.classList.remove('hidden');
    void projectCart.offsetWidth; // Force reflow
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
    projectImgs.forEach((img, i) => {
      setTimeout(() => {
        img.classList.add('visible');
        if (projectLabels[i]) {
          projectLabels[i].classList.add('visible');
        }
      }, initialDelay + i * stepDelay);
    });
  }
}
