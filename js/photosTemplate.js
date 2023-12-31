import {mockArray} from './main.js';

const template = document.querySelector('#picture');
const pictureContainer = document.createDocumentFragment();
const container = document.querySelector('.pictures', '.container');

function getPhotos (obj) {
    const cloneTemplate = template.content.cloneNode(true);
    const image = cloneTemplate.querySelector('.picture__img');
    const comentsValue = cloneTemplate.querySelector('.picture__comments');
    const likesValue = cloneTemplate.querySelector('.picture__likes');

    image.src = `${obj.url}`;
    comentsValue.textContent = `${obj.coments.length}`;
    likesValue.textContent = `${obj.likes}`;
    pictureContainer.appendChild(cloneTemplate);
};

mockArray.map((e) => {getPhotos(e)});
container.appendChild(pictureContainer);


