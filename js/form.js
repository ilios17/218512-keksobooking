'use strict';


(function () {
  var priceInfo = document.querySelector('#price');
  var typeSelect = document.querySelector('#type');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');

  var setMinPrice = function () {

    for (var i = 0; i < window.data.PRICES.length; i++) {
      if (typeSelect.options[i].selected) {
        priceInfo.placeholder = window.data.PRICES[i];
        priceInfo.min = window.data.PRICES[i];
      }
    }
  };

  setMinPrice();

  typeSelect.addEventListener('change', function () {
    setMinPrice();
  });

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
    }
  };

  var makeInvalidRed = function () {
    var inputs = document.querySelectorAll('input');

    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].validity.valid) {
        inputs[i].style.boxShadow = '0 0 1px 5px red';
      }
    }
  };

  document.querySelector('.ad-form__submit').addEventListener('click', function () {
    makeInvalidRed();
    setCustomRoomsValidity();
  });

})();
