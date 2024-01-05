import {mockArray} from './main.js';

const bigPic = document.querySelector('.big-picture__img');
const bigPicContainer = document.querySelector('.big-picture');
const body = document.querySelector('body');
const comentsContainer = document.querySelector('.social__comments');
const likesCount = bigPicContainer.querySelector('.likes-count');
const comentsCount = bigPicContainer.querySelector('.comments-count');
const comentsShown = bigPicContainer.querySelector('.comments-shown');
const showncoments = 5;

/* document.addEventListener('click', e => {
    if(e.target.tagName == "IMG") {
        const description = bigPicContainer.querySelector('.social__caption');
        const fid = e.target.dataset.id;
        const data = mockArray.find((e) => fid == e.id);
        const showncoments = 5;
        //console.log(data);

        const comentsTemplate = data.coments.map((e) => getComentsTemplate(e));
        //comentsContainer.innerHTML = comentsTemplate;

        let fiveComentsTemplate = fiveComents() ;
        let coment = fiveComentsTemplate(comentsTemplate);
        comentsContainer.innerHTML = coment;

        bigPic.children[0].src = data.url;
        description.innerText = data.description;
        likesCount.innerText = data.likes;
        comentsCount.innerText = data.coments.length;

        if(showncoments > data.coments.length){
            comentsShown.innerText = data.coments.length;
        };  

        bigPicContainer.classList.remove('hidden');
        body.classList.add('modal-open');

        bigPicContainer.addEventListener('click' , e => {
            if(e.target.id === 'picture-cancel') {
                bigPicContainer.classList.add('hidden');
                body.classList.remove('modal-open');
            };
            if(e.target.className === 'social__comments-loader  comments-loader'){
                coment += fiveComentsTemplate(comentsTemplate);
                let comCount = showncoments + 5;
                comentsContainer.innerHTML = coment;
                
                if(comCount >= data.coments.length){
                    comentsShown.innerText = data.coments.length;
                } else {
                    comentsShown.innerText = comCount;
                };
            };
        });
    };
});
 */

document.addEventListener('click', getBigPic);

document.addEventListener('keydown', e => {
    if (e.key === 'Escape'){
        bigPicContainer.classList.add('hidden');
        body.classList.remove('modal-open');
        alert(e.key);
    }
});

function getComentsTemplate (obj){
    return `<li class="social__comment">
    <img class="social__picture" src="${obj.avatar}" alt="Аватар на коментарі фотографії" width="35" height="35">
    <div>
      <p class="social__author">${obj.name}</p>
      <p class="social__text">${obj.message}</p>
    </div>
  </li>`
};

function fiveComents (){
    let i = 0
    let max = i + 5;
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




function getBigPic (e) {
    if(e.target.tagName == "IMG") {
        const description = bigPicContainer.querySelector('.social__caption');
        const fid = e.target.dataset.id;
        const data = mockArray.find((e) => fid == e.id);
        let count = showncoments + 5;
        //console.log(data);

        const comentsTemplate = data.coments.map((e) => getComentsTemplate(e));
        //comentsContainer.innerHTML = comentsTemplate;

        const fiveComentsTemplate = fiveComents() ;
        let coment = fiveComentsTemplate(comentsTemplate);
        comentsContainer.innerHTML = coment;

        bigPic.children[0].src = data.url;
        description.innerText = data.description;
        likesCount.innerText = data.likes;
        comentsCount.innerText = data.coments.length;

        if(showncoments > data.coments.length){
            comentsShown.innerText = data.coments.length;
        } else {
            comentsShown.innerText = showncoments;
        }

        bigPicContainer.classList.remove('hidden');
        body.classList.add('modal-open');


        bigPicContainer.addEventListener('click' , e => {
            if(e.target.id === 'picture-cancel') {
                bigPicContainer.classList.add('hidden');
                body.classList.remove('modal-open');
             
            };
            if(e.target.className === 'social__comments-loader  comments-loader'){
                coment += fiveComentsTemplate(comentsTemplate);
                console.log(showncoments)
                comentsContainer.innerHTML = coment;
                console.log(data.coments.length)

                if(count >= data.coments.length){
                    comentsShown.innerText = data.coments.length;
                } else {
                    comentsShown.innerText = count;
                }
                count += 5;  
            };
        });
    };
    
    
}

//document.removeEventListener('click', getBigPic)