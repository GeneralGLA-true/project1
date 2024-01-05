import {mockArray} from './main.js';

const bigPic = document.querySelector('.big-picture__img');
const image = bigPic.querySelector('img');
const bigPicContainer = document.querySelector('.big-picture');
const body = document.querySelector('body');
const comentsContainer = document.querySelector('.social__comments');
const likesCount = bigPicContainer.querySelector('.likes-count');
const comentsCount = bigPicContainer.querySelector('.comments-count');
const comentsShown = bigPicContainer.querySelector('.comments-shown');
const showncoments = 5;
const description = bigPicContainer.querySelector('.social__caption');
const fiveComentsTemplate = fiveComents();

let dataObject = new Object;
let coment = new Array;
let comentsTemplate = new String;
let extraComentCount = showncoments + 5;



function getBigPicture (e) {
    const findID = e.target.dataset.id;
    dataObject = mockArray.find((e) => findID == e.id);
    comentsTemplate = dataObject.coments.map((e) => getComentsTemplate(e));
    

    description.innerText = dataObject.description;
    image.src = dataObject.url;
    likesCount.innerText = dataObject.likes;
    comentsCount.innerText = dataObject.coments.length;

    if(showncoments > dataObject.coments.length){
        comentsShown.innerText = dataObject.coments.length;
    } else {
        comentsShown.innerText = showncoments;
    };

    coment = fiveComentsTemplate(comentsTemplate);
    comentsContainer.innerHTML = coment;

    console.log(comentsTemplate)
    console.log(dataObject)
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

function fiveComents () {
    let i = 0
    let max = 5;
    return function (arr) {
        let fiveTemplate = '';
        if(max >= arr.length){
            max = arr.length
        };
        for(; i < max; i++) {
            fiveTemplate += arr[i];
        };
        max = i + 5;
        return fiveTemplate;
    };
};


document.addEventListener('click', e => {
    if (e.target.tagName == "IMG") {
        getBigPicture(e)
    };
    if(e.target.id === 'picture-cancel') {
        bigPicContainer.classList.add('hidden');
        body.classList.remove('modal-open');
    };
    if(e.target.className === 'social__comments-loader  comments-loader'){
        coment += fiveComentsTemplate(comentsTemplate);
        comentsContainer.innerHTML = coment;

        if(extraComentCount >= dataObject.coments.length){
            comentsShown.innerText = dataObject.coments.length;
        } else {
            comentsShown.innerText = extraComentCount;
        }
        extraComentCount += 5;  
    };
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        bigPicContainer.classList.add('hidden');
        body.classList.remove('modal-open');
    }
});