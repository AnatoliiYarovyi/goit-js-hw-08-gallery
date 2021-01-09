import galleryImg from './gallery-items.js';

const refs = {
  listGallery: document.querySelector('.js-gallery'),
  backdrop: document.querySelector('.js-lightbox'),
  overlay: document.querySelector('.lightbox__overlay'),
  modalImg: document.querySelector('.lightbox__image'),
  btnCls: document.querySelector('button[data-action="close-lightbox"]'),
};

const imgList = galleryImg.map(galleryImg => createGalleryImg(galleryImg));
imgList.forEach((li, index) => { 
  let img = li.firstElementChild.firstElementChild
  img.setAttribute("data-index", index);
});
refs.listGallery.append(...imgList);

refs.listGallery.addEventListener('click', onItemClick);
refs.btnCls.addEventListener('click', onCloseModal);
refs.overlay.addEventListener('click', onBackdropClick);

function createGalleryImg(galleryImg) {
  const itemGallery = document.createElement('li');
  itemGallery.classList.add('gallery__item');

  const linkGallery = document.createElement('a');
  linkGallery.classList.add('gallery__link');
  linkGallery.setAttribute('href', galleryImg.original);

  const imgGallery = document.createElement('img');
  imgGallery.classList.add('gallery__image');
  imgGallery.setAttribute('src', galleryImg.preview);
  imgGallery.setAttribute('data-sourse', galleryImg.original); 
  imgGallery.setAttribute('alt', galleryImg.description);

  itemGallery.appendChild(linkGallery);
  linkGallery.appendChild(imgGallery);

  return itemGallery;
}
function onItemClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    console.log('ne img');
    return;
  }
  window.addEventListener('keydown', onPressEscape);
  window.addEventListener('keydown', onArrowSlider); //slider
  refs.backdrop.classList.add('is-open');

  const imgRef = event.target;
  currentSlide = imgRef.dataset.index; //slider

  onImgModal(imgRef);
}
function onCloseModal() {
  window.removeEventListener('keydown', onPressEscape);
  window.removeEventListener('keydown', onArrowSlider); //slider
  refs.backdrop.classList.remove('is-open');
  onCleensImgModal();
}
function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}
function onImgModal(imgRef) {
  refs.modalImg.setAttribute('src', imgRef.dataset.sourse);
  refs.modalImg.setAttribute('alt', imgRef.alt);
}
function onCleensImgModal() {
  refs.modalImg.setAttribute('src', '');
  refs.modalImg.setAttribute('alt', '');
}
function onPressEscape(event) {
  console.log('event.code:', event.code);
  if (event.code === 'Escape') {
    console.log('event.code:', event.code);
    onCloseModal();
  }
}

// -------------------------------- Слайдер -----------------------------

let slides = document.querySelectorAll('.gallery__image');
let currentSlide = 0;

function onArrowSlider(event) {
  if (event.code === 'ArrowRight') {
    nextSlide();
  } else if (event.code === 'ArrowLeft') {
    previousSlide();
  }
}
function nextSlide() {
  goToSlide(currentSlide + 1);
}

function previousSlide() {
  goToSlide(currentSlide - 1);
}

function goToSlide(n) {
  currentSlide = (n + slides.length) % slides.length;
  const imgSlideRef = slides[currentSlide];
  onImgModal(imgSlideRef);
}
// -----------------------------------------------------------------------

