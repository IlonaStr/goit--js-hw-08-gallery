'use strict';

import images from './gallery-items.js'

const galleryList = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxImg = document.querySelector('.lightbox__image');
const closeBtn = document.querySelector('.lightbox__button');
const overlay = document.querySelector('.lightbox__overlay')

const galleryItems = images.reduce((acc, item) => {
    const galleryListItem = document.createElement('li');
    const galleryListLink = document.createElement('a');
    const galleryListImg = document.createElement('img');

    galleryListItem.appendChild(galleryListLink);
    galleryListLink.appendChild(galleryListImg);

    galleryListItem.classList.add('gallery__item');
    galleryListLink.classList.add('gallery__link');
    galleryListImg.classList.add('gallery__img');

    galleryListLink.href = item.original;
    galleryListImg.href = item.preview;
    galleryListImg.dataset.source = item.original;
    galleryListImg.alt = item.description;

    return acc + galleryListItem.outerHTML;
}, '');
galleryList.insertAdjacentHTML('beforeend', galleryItems);
const imageList = document.querySelectorAll('.gallery__image');
console.log(imageList);

function handleClick (e) {
    e.preventDefault();
    const target = e.target;
    setActiveLink(target.getAttribute('data-source'), target.getAttribute('alt'));
}

function setActiveLink(activeLink, alt) {
    lightboxImg.src = activeLink;
    lightboxImg.alt = alt;
    if(!lightbox.classList.contains('is-open')) {
        openModal()
    }
}

function openModal() {
    lightbox.classList.add('is-open')
}

function closeWindow(e) {
if(e.target.nodeName !== 'IMG') {
    let modalWindow = document.querySelector('.lightbox');
    modalWindow.classList.remove('is-open');
    lightboxImg.src = '';
    lightboxImg.alt = '';
}
}

function closeWindowEsc(e) {
    let modalWindow = document.querySelector('.lightbox');
    modalWindow.classList.remove('is-open');
    lightboxImg.src = '';
}

galleryList.addEventListener('click', handleClick);
closeBtn.addEventListener('click', closeWindow)
document.addEventListener('keydown', (event) => {
    if(event.code === 'Escape' && lightbox.classList.contains('is-open')) {
        closeWindowEsc()
    }
})