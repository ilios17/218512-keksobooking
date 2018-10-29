'use strict';


(function () {
  var PRICES = ['0', '1000', '5000', '10000'];
  var priceInfo = document.querySelector('#price');
  var typeSelect = document.querySelector('#type');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');

  var setMinPrice = function () {

    for (var i = 0; i < PRICES.length; i++) {
      if (typeSelect.options[i].selected) {
        priceInfo.placeholder = PRICES[i];
        priceInfo.min = PRICES[i];
      }
    }
  };

  setMinPrice();

  typeSelect.addEventListener('change', setMinPrice);

  var changeTime = function (index, element) {
    element.options[index].selected = 'selected';
  };

  timeInSelect.addEventListener('change', function (evt) {
    changeTime(evt.target.selectedIndex, timeOutSelect);
  });

  timeOutSelect.addEventListener('change', function (evt) {
    changeTime(evt.target.selectedIndex, timeInSelect);
  });

  var roomsSelect = document.querySelector('#room_number');
  var guestsSelect = document.querySelector('#capacity');

  var setCustomRoomsValidity = function () {
    roomsSelect.style.boxShadow = '0 0 1px 5px red';
    if (roomsSelect.options[0].selected && !guestsSelect.options[2].selected) {
      roomsSelect.setCustomValidity('Такое количество комнат подходит для 1 гостя');
    } else if (roomsSelect.options[2].selected && guestsSelect.options[3].selected) {
      roomsSelect.setCustomValidity('Такое количество комнат подходит для 1, 2 или 3 гостей');
    } else if (roomsSelect.options[1].selected && (guestsSelect.options[0].selected || guestsSelect.options[3].selected)) {
      roomsSelect.setCustomValidity('Такое количество комнат подходит для 1 или 2 гостей');
    } else if (roomsSelect.options[3].selected && !guestsSelect.options[3].selected) {
      roomsSelect.setCustomValidity('Такое количество комнат не подходит для гостей');
    } else {
      roomsSelect.setCustomValidity('');
      roomsSelect.style.boxShadow = 'none';
    }
  };

  var makeInvalidRed = function () {
    var inputs = document.querySelectorAll('input');

    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].validity.valid) {
        inputs[i].style.boxShadow = '0 0 1px 5px red';
      } else {
        inputs[i].style.boxShadow = 'none';
      }
    }
  };

  var main = document.querySelector('main');


  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utilities.ESK_KEYCODE) {
      closePopUp();
    }
  };

  var closePopUp = function () {
    main.removeChild(document.querySelector('.success'));
    document.removeEventListener('click', closePopUp);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var closeErrorPopUp = function () {
    main.removeChild(document.querySelector('.error'));
    document.removeEventListener('click', closeErrorPopUp);
    document.removeEventListener('keydown', onErrorEskPress);
    document.removeEventListener('keydown', onErrorEskPress);
  };

  var onErrorEskPress = function (evt) {
    if (evt.keyCode === window.utilities.ESK_KEYCODE) {
      closeErrorPopUp();
    }
  };

  var onErrorEnterPress = function (evt) {
    if (evt.keyCode === window.utilities.ENTER_KEYCODE) {
      closeErrorPopUp();
    }
  };

  var form = document.querySelector('.ad-form');

  var resetCompletely = function () {
    form.reset();
    window.map.closeMapAndForm();
  };

  document.querySelector('.ad-form__reset').addEventListener('click', resetCompletely);

  document.querySelector('.ad-form__submit').addEventListener('click', function () {
    makeInvalidRed();
    setCustomRoomsValidity();
  });

  var openFormPopUp = function (template, onEsk, closeThisPopUp) {
    main.insertAdjacentElement('beforeend', template.cloneNode(true));
    document.addEventListener('keydown', onEsk);
    document.addEventListener('click', closeThisPopUp);
  };

  var succeSSHandler = function () {
    openFormPopUp(document.querySelector('#success').content.querySelector('.success'), onPopupEscPress, closePopUp);
    resetCompletely();
  };

  var errorHandler = function () {
    openFormPopUp(document.querySelector('#error').content.querySelector('.error'), onErrorEskPress, closeErrorPopUp);
    document.querySelector('.error__button').addEventListener('keydown', onErrorEnterPress);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(form), succeSSHandler, errorHandler);
  });

})();
