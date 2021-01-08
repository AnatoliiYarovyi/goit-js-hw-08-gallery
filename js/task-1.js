import galleryImg from './gallery-items.js';

const refs = {
  listGallery: document.querySelector('.js-gallery'),
  backdrop: document.querySelector('.js-lightbox'),
  modalImg: document.querySelector('.lightbox__image'),
  btnCls: document.querySelector('button[data-action="close-lightbox"]'),
};
const createGalleryImg = galleryImg => {
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
};
const imgList = galleryImg.map(galleryImg => createGalleryImg(galleryImg));
refs.listGallery.append(...imgList);

refs.listGallery.addEventListener('click', onItemClick);
refs.btnCls.addEventListener('click', onCloseModal);

function onItemClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    console.log('ne img');
    return;
  }
  refs.backdrop.classList.add('is-open');
  console.dir(event.target);
  console.dir(event.target.alt);
  console.dir(event.target.dataset.sourse);

  onImgModal(event.target);
}
function onCloseModal() {
  refs.backdrop.classList.remove('is-open');
  onCleensImgModal();
}
function onImgModal(img) {
  refs.modalImg.setAttribute('src', img.dataset.sourse);
  refs.modalImg.setAttribute('alt', img.alt);
}
function onCleensImgModal() {
  refs.modalImg.setAttribute('src', '');
  refs.modalImg.setAttribute('alt', '');
}
