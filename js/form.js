const form = document.querySelector('.img-upload__overlay');
const uploadBTN = document.querySelector('.img-upload__label')
const cancelBtn = document.querySelector('#upload-cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const comentInput = document.querySelector('.text__description');
const hashtagPattern = /^(?:#([a-zA-Z0-9]{1,19})|\b([a-zA-Z0-9]{1,20}))$/g;
const body = document.querySelector('body');

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
})

cancelBtn.addEventListener('click', function() {
    form.classList.add('hidden');
    body.classList.remove('modal-open');
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