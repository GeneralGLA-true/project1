import { mockArray } from "./main.js";

const form = document.querySelector('.img-upload__overlay');
const uploadBTN = document.querySelector('.img-upload__label')
const cancelBtn = document.querySelector('#upload-cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const comentInput = document.querySelector('.text__description');
//const hashtagPattern = /^(?:#([a-zA-Z0-9]{1,19})|\b([a-zA-Z0-9]{1,20}))$/g;
const hashtagPattern = /^#([a-zA-Z0-9]{1,19})$/g;
const body = document.querySelector('body');

const slider = document.getElementById('slider');
const imageContainer = document.querySelector('.img-upload__preview');
const image = imageContainer.querySelector('img');
const effectsBtn = document.querySelector('.effects__list');
const effectValue = document.querySelector('.effect-level__value');

const scaleControl = document.querySelector('.img-upload__scale');
const scaleControlValue = document.querySelector('.scale__control--value');
let scale = getScaleValue();

comentInput.setAttribute('maxlength', '140');

function validateHashtags(input) {
  const lowInput = input.toLocaleLowerCase()
  const hashtags = lowInput.split(' ');
  const uniqueHashtags = new Set(hashtags);

  if (hashtags.length !== uniqueHashtags.size) {
    return 'Один і той же хеш-тег використовується двічі';
  };

  if (hashtags.length > 5) {
    return 'Не можна вказати більше пяти хеш-тегів';
  };

  for (const hashtag of hashtags) {
    if (!hashtag.match(hashtagPattern)) {
      return 'Хеш-тег не відповідає вимогам';
    };
  };
  return '';
};

hashtagInput.addEventListener('input', function () {
  const inputText = hashtagInput.value;
  const isValid = validateHashtags(inputText);
  hashtagInput.setCustomValidity(isValid);
});

uploadBTN.addEventListener('click', function() {
  form.classList.remove('hidden');
  body.classList.add('modal-open');
  scale = getScaleValue();
  scaleControlValue.setAttribute('value', `100%`)
})

cancelBtn.addEventListener('click', function() {
  form.classList.add('hidden');
  body.classList.remove('modal-open');
  image.style.transform = 'scale(1)';
});

hashtagInput.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    e.stopPropagation();
  };
});

comentInput.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        e.stopPropagation();
    };
});


noUiSlider.create(slider, {
  start: 1,
  step: .1,
  tooltips: true,
  connect: 'lower',
  range: {
      'min': 0,
      'max': 1
  }, 
});

slider.style.display = 'none'

effectsBtn.addEventListener('click', (e) => {
  if(e.target.tagName === 'INPUT'){
    switch (true) {
      case e.target.id === "effect-none":
        slider.style.display = 'none';
        image.style.filter = 'none';
        break;

      case e.target.id === "effect-chrome":
        effectChrome();
        break;

      case e.target.id === "effect-sepia":
        effectSepia();
        break;

      case e.target.id === "effect-marvin":
        effectMarvin()
        break;

      case e.target.id === "effect-phobos":
        effectPhobos()
        break;

      case e.target.id === "effect-heat":
        effectHeat()
        break;

      default:
        alert('Щось пішло не так(')
        break;
    };
  };
});



function effectChrome (){
  slider.style.display = 'block';
  slider.noUiSlider.updateOptions({
      start: 1,
      step: .1,
      range: {
          'min': 0,
          'max': 1
      }
  });

  slider.noUiSlider.on('update', ()=>{
    image.style.filter = `grayscale(${slider.noUiSlider.get()})`;
    effectValue.setAttribute('value', `${slider.noUiSlider.get()}`);
    });
};

function effectSepia (){
  slider.style.display = 'block';
  slider.noUiSlider.updateOptions({
      start: 1,
      step: .1,
      range: {
          'min': 0,
          'max': 1
      },
  });

  slider.noUiSlider.on('update', ()=>{
    image.style.filter = `sepia(${slider.noUiSlider.get()})`;
    effectValue.setAttribute('value', `${slider.noUiSlider.get()}`);
  });
};

function effectMarvin (){
  slider.style.display = 'block';
  slider.noUiSlider.updateOptions({
      start: 100,
      step: 1,
      range: {
          'min': 0,
          'max': 100,
      },
  });

  slider.noUiSlider.on('update', ()=>{
    image.style.filter = `invert(${slider.noUiSlider.get()}%)`;
    effectValue.setAttribute('value', `${slider.noUiSlider.get()}`);
  });
};

function effectPhobos () {
  slider.style.display = 'block';
  slider.noUiSlider.updateOptions({
      start: 3,
      step: .1,
      range: {
          'min': 0,
          'max': 3,
      },
  });

  slider.noUiSlider.on('update', ()=>{
    image.style.filter = `blur(${slider.noUiSlider.get()}px)`;
    effectValue.setAttribute('value', `${slider.noUiSlider.get()}`);
  });
};

function effectHeat () {
  slider.style.display = 'block';
  slider.noUiSlider.updateOptions({
      start: 3,
      step: .0,
      range: {
          'min': 1,
          'max': 3,
      },
  });

  slider.noUiSlider.on('update', ()=>{
    image.style.filter = `brightness(${slider.noUiSlider.get()})`;
    effectValue.setAttribute('value', `${slider.noUiSlider.get()}`); 
  });
};


scaleControl.addEventListener('click', (e)=>{
  if (e.target.tagName === 'BUTTON'){
    switch (true) {
      case e.target.className === 'scale__control  scale__control--smaller':
        scale(-.25);
        break;

      case e.target.className === 'scale__control  scale__control--bigger':
        scale(0.25);
        break;

      default:
        alert('Щось пішло не так(');
        break;
    };
  };
});


function getScaleValue (){
  let scale = 1;
  const min = .25;
  const max = 1;
  const convertToPersent = 100;
  return function (numb){
    if (scale+numb >= min && scale+numb <= max){
      scale+=numb;
      scaleControlValue.setAttribute('value', `${scale * convertToPersent}%`);
      image.style.transform = `scale(${scale})`;
      return;
    };
  };
};



//console.log(mockArray)