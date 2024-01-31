import { mockArray } from "./main.js";

const slider = document.getElementById('slider');
const imageContainer = document.querySelector('.img-upload__preview');
const image = imageContainer.querySelector('img');
const effectsBtn = document.querySelector('.effects__list');
const effectValue = document.querySelector('.effect-level__value')

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
    })
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
    })
}

//console.log(mockArray)