import {mockArray} from './main.js';

const bigPic = document.querySelector('.big-picture__img');
const image = bigPic.querySelector('img');
const bigPicContainer = document.querySelector('.big-picture');
const body = document.querySelector('body');
const comentsContainer = document.querySelector('.social__comments');
const likesCount = bigPicContainer.querySelector('.likes-count');
const description = bigPicContainer.querySelector('.social__caption');
const cancelBtn = document.querySelector('#picture-cancel');
const socialCommentCount = document.querySelector('.social__comment-count');

const form = document.querySelector('.img-upload__overlay');

socialCommentCount.classList.add('hidden');

function getBigPicture (e) {
    const findID = e.target.dataset.id;
    const dataObject = mockArray.find((e) => findID == e.id);
    const comentsTemplate = dataObject.coments.map((e) => getComentsTemplate(e));
    
    description.innerText = dataObject.description;
    image.src = dataObject.url;
    likesCount.innerText = dataObject.likes;
    comentsContainer.innerHTML = comentsTemplate;

    body.classList.add('modal-open');
    bigPicContainer.classList.remove('hidden');
};

function getComentsTemplate (obj){
    return `<li class="social__comment">
    <img class="social__picture" src="${obj.avatar}" alt="Аватар на коментарі фотографії" width="35" height="35">
    <div>
      <p class="social__author">${obj.name}</p>
      <p class="social__text">${obj.message}</p>
    </div>
  </li>`
};

document.addEventListener('click', e => {
    if (e.target.tagName == "IMG") {
        getBigPicture(e);
    };
});

cancelBtn.addEventListener('click', e => {
    bigPicContainer.classList.add('hidden');
    body.classList.remove('modal-open');
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        bigPicContainer.classList.add('hidden');
        body.classList.remove('modal-open');
        form.classList.add('hidden');
    }
});