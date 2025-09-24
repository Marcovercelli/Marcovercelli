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

function hideProjectCart() {
  if (!projectCart) return;

  // Applica il delay prima di togliere la classe 'visible'
  const exitDelay = 1000; // ms
  setTimeout(() => {
    projectCart.classList.remove('visible');
    const duration = parseFloat(getComputedStyle(projectCart).transitionDuration) * 1000 || 2000;
    setTimeout(() => {
      projectCart.classList.add('hidden');
    }, duration);
  }, exitDelay);
}

function showPrj1() {
  fadeOutProjectImages(); // Fade-out a cascata delle immagini
  hideProjectCart(); // Nasconde il cart con fade-out

  setTimeout(() => {
    if (gallery) gallery.classList.add('hidden');
    const gallery2 = document.getElementById('galleryPrj2');
    if (gallery2) gallery2.classList.add('hidden');
    const gallery3 = document.getElementById('galleryPrj3');
    if (gallery3) gallery3.classList.add('hidden');

    // Mostra la nuova gallery orizzontale
    const gallery1 = document.getElementById('galleryPrj1');
    if (gallery1) {
      gallery1.classList.remove('hidden');
      gallery1.classList.add('visible'); // fade-in della gallery

      // Resetta lo scroll alla posizione iniziale
      gallery1.scrollLeft = 0;

      const imgs = gallery1.querySelectorAll('.gallery-prj1-img');
      imgs.forEach(img => img.classList.remove('visible'));
      imgs.forEach((img, i) => {
        setTimeout(() => {
          img.classList.add('visible');
        }, 400 + i * 200);
      });

      // Mostra il pulsante "Go to End"
      const scrollToEndBtn = document.getElementById('scrollToEndBtn');
      if (scrollToEndBtn) {
        scrollToEndBtn.classList.remove('hidden');
        scrollToEndBtn.classList.add('visible');
      }

      // Mostra il pulsante "Arrow"
      const scrollToEndBtnArrow = document.getElementById('scrollToEndBtnArrow');
      if (scrollToEndBtnArrow) {
        scrollToEndBtnArrow.classList.remove('hidden');
        scrollToEndBtnArrow.classList.add('visible');
      }
    }

    const nav = document.querySelector('nav');
    if (nav) {
      nav.classList.add('fade-out');
      setTimeout(() => {
        nav.classList.add('hidden');
        nav.classList.remove('fade-out');

        // Mostra il Backbtn con fade-in
        const Backbtn = document.getElementById('Backbtn');
        if (Backbtn) {
          Backbtn.classList.remove('hidden');
          Backbtn.classList.add('fade-in');
        }
      }, 700); // Dopo il fade-out della navbar
    }
  }, 1200); // Aspetta che il fade-out delle immagini sia completato
}

function showPrj2() {
  fadeOutProjectImages(); // Fade-out a cascata delle immagini
  hideProjectCart();

  setTimeout(() => {
    if (gallery) gallery.classList.add('hidden');
    const gallery1 = document.getElementById('galleryPrj1');
    if (gallery1) gallery1.classList.add('hidden');
    const gallery3 = document.getElementById('galleryPrj3');
    if (gallery3) gallery3.classList.add('hidden');

    // Mostra la nuova gallery
    const gallery2 = document.getElementById('galleryPrj2');
    if (gallery2) {
      gallery2.classList.remove('hidden');
      const imgs = gallery2.querySelectorAll('.gallery-prj2-img');
      imgs.forEach(img => img.classList.remove('visible'));
      imgs.forEach((img, i) => {
        setTimeout(() => {
          img.classList.add('visible');
        }, 1700 + i * 80); // effetto fade-in a cascata
      });
    }

    // Mostra il testo "Scroll horizontally"
    const scrollHint = document.getElementById('scrollHint');
    if (scrollHint) {
      scrollHint.classList.add('visible'); // Fade-in del testo
      setTimeout(() => {
        scrollHint.classList.remove('visible'); // Fade-out dopo 2 secondi
      }, 1300);
    }

    const nav = document.querySelector('nav');
    if (nav) {
      nav.classList.add('fade-out');
      setTimeout(() => {
        nav.classList.add('hidden');
        nav.classList.remove('fade-out');

        // Mostra il Backbtn con fade-in
        const Backbtn = document.getElementById('Backbtn');
        if (Backbtn) {
          Backbtn.classList.remove('hidden');
          Backbtn.classList.add('fade-in');
        }
      }, 1800); // Dopo il fade-out della navbar
    }
  }, 1200);
}

function showPrj3() {
  fadeOutProjectImages(); // Fade-out a cascata delle immagini
  hideProjectCart();

  setTimeout(() => {
    if (gallery) gallery.classList.add('hidden');
    const gallery1 = document.getElementById('galleryPrj1');
    if (gallery1) gallery1.classList.add('hidden');
    const gallery2 = document.getElementById('galleryPrj2');
    if (gallery2) gallery2.classList.add('hidden');

    // Mostra la nuova gallery
    const gallery3 = document.getElementById('galleryPrj3');
    if (gallery3) {
      gallery3.classList.remove('hidden');
      const imgs = gallery3.querySelectorAll('.gallery-prj3-img');
      imgs.forEach(img => img.classList.remove('visible', 'centered'));
      imgs.forEach((img, i) => {
        setTimeout(() => {
          img.classList.add('visible');
        }, 700 + i * 80);
      });
    }
  }, 1200);
}

// Funzione per effetto zoom/blur su galleryPrj3
function updateCenteredImagePrj3() {
  const gallery3 = document.getElementById('galleryPrj3');
  if (!gallery3) return;
  const imgs = gallery3.querySelectorAll('.gallery-prj3-img');
  const galleryRect = gallery3.getBoundingClientRect();
  const galleryCenter = galleryRect.left + galleryRect.width / 2;

  let minDist = Infinity;
  let centeredImg = null;

  imgs.forEach(img => {
    const imgRect = img.getBoundingClientRect();
    const imgCenter = imgRect.left + imgRect.width / 2;
    const dist = Math.abs(galleryCenter - imgCenter);
    if (dist < minDist) {
      minDist = dist;
      centeredImg = img;
    }
  });

  imgs.forEach(img => img.classList.remove('centered'));
  if (centeredImg) centeredImg.classList.add('centered');
}

function updateCenteredImage(galleryId, imgSelector) {
  const gallery = document.getElementById(galleryId);
  if (!gallery) return;
  const imgs = gallery.querySelectorAll(imgSelector);
  const galleryRect = gallery.getBoundingClientRect();
  const galleryCenter = galleryRect.left + galleryRect.width / 2;

  let minDist = Infinity;
  let centeredImg = null;

  imgs.forEach(img => {
    const imgRect = img.getBoundingClientRect();
    const imgCenter = imgRect.left + imgRect.width / 2;
    const dist = Math.abs(galleryCenter - imgCenter);
    if (dist < minDist) {
      minDist = dist;
      centeredImg = img;
    }
  });

  imgs.forEach(img => img.classList.remove('centered'));
  if (centeredImg) centeredImg.classList.add('centered');
}

// Aggiorna l'immagine centrata quando scrolli
const gallery2 = document.getElementById('galleryPrj2');
if (gallery2) {
  gallery2.addEventListener('scroll', () => updateCenteredImage('galleryPrj2', '.gallery-prj2-img'));
  setTimeout(() => updateCenteredImage('galleryPrj2', '.gallery-prj2-img'), 1200);
}

document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo');
  const overlay = document.getElementById('whiteOverlay');
  if (logo && overlay) {
    // Rimuovi eventuali altri listener precedenti
    logo.replaceWith(logo.cloneNode(true));
    const newLogo = document.querySelector('.logo');
    newLogo.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // <--- aggiungi questa riga!
      overlay.classList.add('active');
      setTimeout(() => {
        window.location.reload();
      }, 1300);
    });
  }

  const gallery1 = document.getElementById('galleryPrj1');
  const lastOverlay = document.querySelector('.last-img-overlay');
  if (gallery1 && lastOverlay) {
    gallery1.addEventListener('scroll', () => {
      // Calcola se sei vicino al margine destro (tolleranza 40px)
      const scrollRight = gallery1.scrollLeft + gallery1.clientWidth;
      const scrollMax = gallery1.scrollWidth;
      if (scrollMax - scrollRight < 40) {
        lastOverlay.classList.add('active');
      } else {
        lastOverlay.classList.remove('active');
      }
    });
  }

  // Aggiungi il fade-in all'apertura del sito
  document.body.classList.add("fade-in");
});

// Nuove funzioni
function fadeOutProjectImages() {
  const projectImgs = document.querySelectorAll('.project-img');
  const projectLabels = document.querySelectorAll('.project-label'); // Seleziona i testi
  const totalImgs = projectImgs.length;

  projectImgs.forEach((img, i) => {
    setTimeout(() => {
      img.classList.add('fade-out');
      if (projectLabels[i]) {
        projectLabels[i].classList.add('fade-out'); // Applica il fade-out al testo
      }
    }, (totalImgs - 1 - i) * 200); // Ritardo a cascata (da destra a sinistra)
  });

  // Rimuovi le immagini e i testi dopo il fade-out
  setTimeout(() => {
    projectImgs.forEach(img => img.classList.remove('visible', 'fade-out'));
    projectLabels.forEach(label => label.classList.remove('fade-out')); // Rimuovi la classe dal testo
  }, totalImgs * 400 + 500); // Tempo totale del fade-out
}

// Seleziona tutte le immagini della gallery 3
const images = document.querySelectorAll(".gallery-prj3-img");
let imgIndex;
let imgSrc;

// Aggiungi evento click a ogni immagine
images.forEach((img, i) => {
  img.addEventListener("click", (e) => {
    imgSrc = e.target.src;
    imgIndex = i; // Salva l'indice dell'immagine cliccata
    imgModal(imgSrc); // Mostra il modal
  });
});

// Funzione per creare il modal
let imgModal = (src) => {
  const modal = document.createElement("div");
  modal.setAttribute("class", "modal");

  // Aggiungi il modal al body
  document.body.append(modal);

  // Aggiungi immagine al modal
  const newImage = document.createElement("img");
  newImage.setAttribute("src", src);
  newImage.setAttribute("class", "modal-img");

  // Crea il pulsante di chiusura
  const closeBtn = document.createElement("button");
  closeBtn.setAttribute("class", "closeBtn");
  closeBtn.textContent = "X"; // Testo del pulsante
  closeBtn.onclick = () => {
    modal.remove(); // Rimuovi il modal al click
  };

  // Crea il pulsante "Next"
  const nextBtn = document.createElement("button");
  nextBtn.setAttribute("class", "nextBtn");
  nextBtn.textContent = ">"; // Testo del pulsante
  nextBtn.onclick = () => {
    newImage.setAttribute("src", nextImg());
  };

  // Crea il pulsante "Previous"
  const prevBtn = document.createElement("button");
  prevBtn.setAttribute("class", "prevBtn");
  prevBtn.textContent = "<"; // Testo del pulsante
  prevBtn.onclick = () => {
    newImage.setAttribute("src", prevImg());
  };

  // Aggiungi immagine e pulsanti al modal
  modal.append(newImage, closeBtn, nextBtn, prevBtn);
};

// Funzione per ottenere l'immagine successiva
let nextImg = () => {
  imgIndex++;
  if (imgIndex >= images.length) {
    imgIndex = 0; // Torna alla prima immagine
  }
  return images[imgIndex].src;
};

// Funzione per ottenere l'immagine precedente
let prevImg = () => {
  imgIndex--;
  if (imgIndex < 0) {
    imgIndex = images.length - 1; // Torna all'ultima immagine
  }
  return images[imgIndex].src;
};


function showCollectionProcess() {
  const gallery1 = document.getElementById('galleryPrj1');
  const video = document.querySelector('.gallery-prj1-video');
  const collectionGallery = document.getElementById('galleryCollectionProcess');
  const nav = document.querySelector('nav');
  const backBtn = document.getElementById('Backbtn'); // Back button

  // Nascondi il Backbtn con fade-out
  if (backBtn) {
    backBtn.classList.remove('fade-in');
    backBtn.classList.add('fade-out');
    setTimeout(() => {
      backBtn.classList.add('hidden');
      backBtn.classList.remove('fade-out');
    }, 700); // Durata del fade-out
  }

  // Fade-out della gallery e del video
  if (gallery1) {
    gallery1.style.transition = 'opacity 1s ease';
    gallery1.style.opacity = '0';
    setTimeout(() => {
      gallery1.classList.add('hidden');
      gallery1.style.opacity = '';
    }, 1000);
  }

  if (video) {
    video.style.transition = 'opacity 1s ease';
    video.style.opacity = '0';
    setTimeout(() => {
      video.classList.add('hidden');
      video.style.opacity = '';
    }, 1000);
  }

  // Mostra la nuova gallery e la navbar con fade-in
  if (collectionGallery) {
    setTimeout(() => {
      collectionGallery.classList.remove('hidden');
      const imgs = collectionGallery.querySelectorAll('.gallery-collection-img');
      imgs.forEach((img, i) => {
        setTimeout(() => {
          img.classList.add('visible');
        }, i * 200);
      });

      // NAV BAR FADE-IN
      if (nav) {
        nav.classList.remove('hidden');
        // Forza il reflow per assicurare la transizione
        void nav.offsetWidth;
        nav.classList.add('fade-in');
        setTimeout(() => {
          nav.classList.remove('fade-in');
        }, 1500);
      }
    }, 1000);
  }
}

// --- MODAL PER GALLERY COLLECTION PROCESS (CP) ---

// Seleziona tutte le immagini della gallery collection process
const imagesCP = document.querySelectorAll(".gallery-collection-img");
let imgIndexCP;
let imgSrcCP;

// Aggiungi evento click a ogni immagine della collection process
imagesCP.forEach((img, i) => {
  img.addEventListener("click", (e) => {
    imgSrcCP = e.target.src;
    imgIndexCP = i; // Salva l'indice dell'immagine cliccata
    imgModalCP(imgSrcCP); // Mostra il modal CP
  });
});

// Funzione per creare il modal CP
let imgModalCP = (src) => {
  const modalCP = document.createElement("div");
  modalCP.setAttribute("class", "modalCP");

  // Aggiungi il modal al body
  document.body.append(modalCP);

  // Aggiungi immagine al modal
  const newImageCP = document.createElement("img");
  newImageCP.setAttribute("src", src);
  newImageCP.setAttribute("class", "modal-imgCP");

  // Crea il pulsante di chiusura
  const closeBtnCP = document.createElement("button");
  closeBtnCP.setAttribute("class", "closeBtnCP");
  closeBtnCP.textContent = "X";
  closeBtnCP.onclick = () => {
    modalCP.remove();
  };

  // Crea il pulsante "Next"
  const nextBtnCP = document.createElement("button");
  nextBtnCP.setAttribute("class", "nextBtnCP");
  nextBtnCP.textContent = ">";
  nextBtnCP.onclick = () => {
    newImageCP.setAttribute("src", nextImgCP());
  };

  // Crea il pulsante "Previous"
  const prevBtnCP = document.createElement("button");
  prevBtnCP.setAttribute("class", "prevBtnCP");
  prevBtnCP.textContent = "<";
  prevBtnCP.onclick = () => {
    newImageCP.setAttribute("src", prevImgCP());
  };

  // Aggiungi immagine e pulsanti al modal
  modalCP.append(newImageCP, closeBtnCP, nextBtnCP, prevBtnCP);
};

// Funzione per ottenere l'immagine successiva CP
let nextImgCP = () => {
  imgIndexCP++;
  if (imgIndexCP >= imagesCP.length) {
    imgIndexCP = 0;
  }
  return imagesCP[imgIndexCP].src;
};

// Funzione per ottenere l'immagine precedente CP
let prevImgCP = () => {
  imgIndexCP--;
  if (imgIndexCP < 0) {
    imgIndexCP = imagesCP.length - 1;
  }
  return imagesCP[imgIndexCP].src;
};

function backToProjects() {
  const gallery2 = document.getElementById('galleryPrj2'); // Gallery visibile
  const gallery1 = document.getElementById('galleryPrj1'); // Gallery visibile
  const backBtn = document.getElementById('Backbtn'); // Back button
  const nav = document.querySelector('nav'); // Navbar

  // Nascondi la gallery prj2 visibile con fade-out
  if (gallery2 && !gallery2.classList.contains('hidden')) {
    const imgs = gallery2.querySelectorAll('.gallery-prj2-img');
    imgs.forEach((img) => {
      img.classList.remove('visible');
      img.classList.add('fade-out');
    });

    setTimeout(() => {
      gallery2.classList.add('hidden');
      imgs.forEach((img) => img.classList.remove('fade-out'));
    }, 700); // Durata del fade-out
  }

  // Nascondi la gallery prj1 visibile con fade-out
  if (gallery1 && !gallery1.classList.contains('hidden')) {
    const imgs = gallery1.querySelectorAll('.gallery-prj1-img');
    imgs.forEach((img) => {
      img.classList.remove('visible');
      img.classList.add('fade-out');
    });

    setTimeout(() => {
      gallery1.classList.add('hidden');
      imgs.forEach(img => img.classList.remove('fade-out', 'visible'));
    }, 700); // Durata del fade-out
  }

  // Nascondi il Backbtn con fade-out
  if (backBtn) {
    backBtn.classList.remove('fade-in');
    backBtn.classList.add('fade-out');
    setTimeout(() => {
      backBtn.classList.add('hidden');
      backBtn.classList.remove('fade-out');
    }, 700); // Durata del fade-out
  }

  // Mostra la navbar con fade-in dopo 1 secondo
  setTimeout(() => {
    if (nav) {
      nav.classList.remove('hidden'); // Rimuove la classe che nasconde la navbar
      void nav.offsetWidth; // Forza il reflow per applicare la transizione
      nav.classList.add('fade-in'); // Aggiunge la classe per il fade-in

      // Aggiungi un delay prima di rimuovere la classe fade-in
      setTimeout(() => {
        nav.classList.remove('fade-in'); // Rimuove la classe dopo il fade-in
      }, 2000); // Ritardo di 2 secondi prima di rimuovere la classe fade-in
    }

    // Chiama la funzione showProjects
    showProjects();
  }, 1000); // Delay di 1 secondo prima di mostrare la navbar
}

function scrollToEnd() {
  const gallery = document.getElementById('galleryPrj1'); // Seleziona la gallery
  if (!gallery) return;

  const maxScroll = gallery.scrollWidth - gallery.clientWidth; // Calcola la lunghezza massima dello scroll

  // Scrolla fino alla fine con un'animazione fluida
  gallery.scrollTo({
    left: maxScroll,
    behavior: 'smooth'
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const scrollToEndBtn = document.getElementById('scrollToEndBtn');
  if (scrollToEndBtn) {
    scrollToEndBtn.addEventListener('click', scrollToEnd);
  }
});

function showAbout() {
  stopSlideshow();
  hideSlideshowImages();

  // Nascondi la sezione Projects con fade-out
  if (gallery && !gallery.classList.contains('hidden')) {
    const projectImgs = gallery.querySelectorAll('.project-img');
    const projectLabels = gallery.querySelectorAll('.project-label');
    projectImgs.forEach(img => img.classList.add('fade-out'));
    projectLabels.forEach(label => label.classList.add('fade-out'));
    setTimeout(() => {
      gallery.classList.add('hidden');
      projectImgs.forEach(img => img.classList.remove('fade-out', 'visible'));
      projectLabels.forEach(label => label.classList.remove('fade-out', 'visible'));
    }, 800); // Durata del fade-out
  }

  // Nascondi la sezione Project1 con fade-out
  const gallery1 = document.getElementById('galleryPrj1');
  if (gallery1 && !gallery1.classList.contains('hidden')) {
    const imgs = gallery1.querySelectorAll('.gallery-prj1-img');
    imgs.forEach(img => img.classList.add('fade-out'));
    setTimeout(() => {
      gallery1.classList.add('hidden');
      imgs.forEach(img => img.classList.remove('fade-out', 'visible'));
    }, 800); // Durata del fade-out
  }

  // Nascondi la sezione Project2 con fade-out
  const gallery2 = document.getElementById('galleryPrj2');
  if (gallery2 && !gallery2.classList.contains('hidden')) {
    const imgs = gallery2.querySelectorAll('.gallery-prj2-img');
    imgs.forEach(img => img.classList.add('fade-out'));
    setTimeout(() => {
      gallery2.classList.add('hidden');
      imgs.forEach(img => img.classList.remove('fade-out', 'visible'));
    }, 800); // Durata del fade-out
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

  // Mostra la sezione About con fade-in
  const about = document.getElementById('about');
  if (about) {
    about.classList.remove('hidden');
    void about.offsetWidth; // Forza il reflow
    setTimeout(() => {
      about.classList.add('fade-in');
      about.classList.add('visible');
    }, 800);
  }

  // Mostra il material-download con fade-in
const materialDownload = document.querySelector('.material-download');
if (materialDownload) {
  materialDownload.classList.remove('hidden');
  setTimeout(() => {
    materialDownload.classList.add('fade-in');
  }, 800); // Ritardo di 800ms
}

  // Mostra i tasti IT e EN con fade-in
  const languageSwitcher = document.querySelector('.language-switcher');
  if (languageSwitcher) {
    languageSwitcher.classList.remove('hidden');
    setTimeout(() => {
      languageSwitcher.classList.add('fade-in');
    }, 800); // Ritardo di 800ms
  }
}

function hideMaterialDownload() {
  // Nascondi il material-download con fade-out
  const materialDownload = document.querySelector('.material-download');
  if (materialDownload) {
    materialDownload.classList.add('fade-out');
    setTimeout(() => {
      materialDownload.classList.add('hidden');
      materialDownload.classList.remove('fade-out');
    }, 800); // Durata del fade-out
  }
}
function hideLanguageSwitcher() {
  // Nascondi i tasti IT e EN con fade-out
  const languageSwitcher = document.querySelector('.language-switcher');
  if (languageSwitcher) {
    languageSwitcher.classList.add('fade-out');
    setTimeout(() => {
      languageSwitcher.classList.add('hidden');
      languageSwitcher.classList.remove('fade-out');
    }, 800); // Durata del fade-out
  }
}
function switchToItalian() {
  const aboutText = document.getElementById('aboutText');
  aboutText.innerHTML = `
Nato a Borgosesia il 12 Gennaio 1998, mi trasferisco a Milano nel 2017 per proseguire i miei studi. Appassionato di arte e cultura, dopo una Laurea triennale in Lettere Moderne all'Università Cattolica del Sacro Cuore, <br>
il mio desiderio di tradurre la mia passione per l’arte in elementi funzionali, contemporanei e volti alla valorizzazione della persona mi ha spinto a conseguire la <b> Laurea in Fashion Design </b> allo IED di Milano, <br>
dove mi sono laureato con una tesi incentrata sul concetto di <i>Modernità Liquida</i>.
Amo l’approccio di ricerca finalizzato alla creazione di una dimensione artistica e comunicativa unica, che mi appassiona tradurre in capi mediante la scelta di tessuti e materiali suggestivi ed efficaci che veicolino emozioni senza mai perdere di vista <b> funzionalità, contemporaneità e sostenibilità. </b> <br>
Il mio approccio ad ogni progetto si basa su un minuzioso lavoro di analisi e ricerca approfondita, creatività, visione contemporanea, con lo sguardo sempre attento anche alla <b>storia di un brand.</b>
  `;
}

function switchToEnglish() {
  const aboutText = document.getElementById('aboutText');
  aboutText.innerHTML = `
Born in Borgosesia on January 12, 1998, I moved to Milan in 2017 to continue my studies. Passionate about art and culture, after a bachelor's degree in Humanistic Studies at the Catholic University of the Sacred Heart, <br>
my desire to translate my passion for art into functional, contemporary elements aimed at enhancing the individual led me to pursue <b> Fashion Design Degree </b> at IED in Milan,<br>
where I graduated with honors with a thesis focused on the concept of <i>Liquid Modernity</i>.
I love the research approach aimed at creating a unique artistic and communicative dimension, which I am passionate about translating into garments through the choice of evocative and effective fabrics and materials that convey
emotions without ever losing sight of <b> functionality, contemporaneity, and sustainability </b>. <br>
My approach to each project is based on meticulous analysis and in-depth research, creativity, and a contemporary vision, always with a keen eye on the <b> heritage of a brand </b>.
  `;
}