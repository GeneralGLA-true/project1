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
const moreCommentBTN = document.querySelector('.social__comments-loader');
const commentCount = document.querySelector('.comments-count');
const shownCommentsCount = document.querySelector('.comments-shown');
let shownComentsArray = getComments();

const form = document.querySelector('.img-upload__overlay');


function getBigPicture (e) {
    
    const findID = e.target.dataset.id;
    const dataObject = mockArray.find((e) => findID == e.id);
    const comentsTemplate = dataObject.coments.map((e) => getComentsTemplate(e));
    const minCommentShown = 5;

    if (minCommentShown >= dataObject.coments.length) {
        socialCommentCount.classList.add('hidden');
        moreCommentBTN.classList.add('hidden');
    }

    console.log(dataObject);
    description.innerText = dataObject.description;
    image.src = dataObject.url;
    likesCount.innerText = dataObject.likes;
    commentCount.innerText = dataObject.coments.length;
    comentsContainer.innerHTML = shownComentsArray(comentsTemplate);
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

function modalClosed () {
    bigPicContainer.classList.add('hidden');
    body.classList.remove('modal-open');
    socialCommentCount.classList.remove('hidden');
    moreCommentBTN.classList.remove('hidden');
    shownComentsArray = getComments();
};

function getComments () {
    let allComentsArray = [];
    let comentsTemp = '';
    let i = 0;
    let max = 5;

    return function (array) {      
        if (arguments[0]) {
            allComentsArray = array;         
        };       
        for (; i < max; i++) {
            if(!allComentsArray[i]) {
                moreCommentBTN.classList.add('hidden');
                shownCommentsCount.innerText = i;
                return comentsTemp;
            };
            comentsTemp +=allComentsArray[i];
        };
        shownCommentsCount.innerText = i;
        max+=5;
        return comentsTemp;
    };
};



document.addEventListener('click', e => {
    if (e.target.tagName == "IMG") {
        getBigPicture(e);
    };
});

cancelBtn.addEventListener('click', e => {
    modalClosed();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        modalClosed();
        form.classList.add('hidden');
    };
});

moreCommentBTN.addEventListener('click', () => {
    comentsContainer.innerHTML = shownComentsArray();
});