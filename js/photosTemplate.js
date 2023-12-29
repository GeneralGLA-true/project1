import {mockArray} from './main.js';
const template = document.querySelector('#picture');
const sectionForPhotos = document.querySelector('.pictures');

function letPhoto (count){
    const cloneTemplateContent = template.content.cloneNode(true);
    const image = cloneTemplateContent.querySelector('img');
    image.src = `${mockArray[count].url}`;
    sectionForPhotos.appendChild(image);
}

function getSomeImage () {
    let count = 0;
    return function(quantity) {
        if(quantity){
            for (let i = 0; i < quantity; i++){
                letPhoto(count);
                count++;
            }
            return;
        }
      letPhoto(count)  ;
      return count++;
    };
};

let someImage = getSomeImage()


function getAllImages() {
    mockArray.map(function(e) {
        const cloneTemplateContent = template.content.cloneNode(true);
        const image = cloneTemplateContent.querySelector('img');
        image.src = `${e.url}`;
        sectionForPhotos.appendChild(image);
    });
};

//getAllImages()
//someImage()
