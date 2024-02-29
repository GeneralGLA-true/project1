import {mockArray} from './main.js';

const template = document.querySelector('#picture');
const pictureContainer = document.createDocumentFragment();
const container = document.querySelector('.pictures.container');
const filterSection = document.querySelector('.img-filters--inactive');

const buttonDefauLT = document.querySelector('#filter-default');
const buttonTopComents = document.querySelector('#filter-discussed'); 
const buttonRandom = document.querySelector('#filter-random')



function getPhoto (obj) {
    const cloneTemplate = template.content.cloneNode(true);
    const image = cloneTemplate.querySelector('.picture__img');
    const comentsValue = cloneTemplate.querySelector('.picture__comments');
    const likesValue = cloneTemplate.querySelector('.picture__likes');
    image.dataset.id = obj.id;
    image.src = `${obj.url}`;
    comentsValue.textContent = `${obj.coments.length}`;
    likesValue.textContent = `${obj.likes}`;
    return cloneTemplate;
};

function getAllPhotos (array = mockArray) {
    const pictures = container.querySelectorAll('a');
    
    if(pictures){
        pictures.forEach((e)=>e.remove());
    };
   
    array.map((e) => {pictureContainer.appendChild(getPhoto(e))});
    container.appendChild(pictureContainer);
    filterSection.classList.remove('img-filters--inactive');
};

getAllPhotos();



function sortByComents (a, b){
    if (a.coments.length > b.coments.length) return -1;
    if (a.coments.length < b.coments.length) return 1;
    return 0;
}

function getTopTenComents (){
    const sorted = JSON.parse(JSON.stringify(mockArray));
    sorted.sort(sortByComents)
    sorted.splice(10)
    getAllPhotos(sorted);
    buttonRandom.classList.remove('img-filters__button--active');
    buttonDefauLT.classList.remove('img-filters__button--active');
    buttonTopComents.classList.add('img-filters__button--active');
   
}

function getRandomPictures (){
    const randomPictures = new Set;
    const maxPic = 10;
    do {
        randomPictures.add(mockArray[Math.floor(Math.random()*mockArray.length)])
    } while (randomPictures.size < maxPic);
    getAllPhotos(Array.from(randomPictures));
    buttonRandom.classList.add('img-filters__button--active');
    buttonDefauLT.classList.remove('img-filters__button--active');
    buttonTopComents.classList.remove('img-filters__button--active');  
}

function getDefault (){
    getAllPhotos();
    buttonRandom.classList.remove('img-filters__button--active');
    buttonDefauLT.classList.add('img-filters__button--active');
    buttonTopComents.classList.remove('img-filters__button--active');
}


buttonDefauLT.addEventListener('click',()=>getDefault());
buttonTopComents.addEventListener('click',()=>getTopTenComents());
buttonRandom.addEventListener('click',()=> getRandomPictures());