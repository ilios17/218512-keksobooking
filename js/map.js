'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;
  var MAIN_PIN_NEEDLE = 24;
  var PIN_CONTAINER_HEIGHT = 650;
  var MAIN_PIN_START_LEFT = 570;
  var MAIN_PIN_START_TOP = 375;
  var addressStartX = MAIN_PIN_WIDTH / 2 + MAIN_PIN_START_LEFT;
  var addressStartY = MAIN_PIN_WIDTH / 2 + MAIN_PIN_START_TOP;
  var mainPinMaxY = PIN_CONTAINER_HEIGHT - MAIN_PIN_NEEDLE;

  window.filterAd();

  var setStartAdress = function () {
    document.querySelector('#address').value = addressStartY + ',' + addressStartX;
  };

  setStartAdress();

  var drawBigAd = function (adsElement) {
    document.querySelector('.map__filters-container').insertAdjacentElement('beforeBegin', window.card.createAd(adsElement));
  };

  var mainPin = document.querySelector('.map__pin--main');

  var removeDisables = function () {
    var fieldsets = document.querySelectorAll('fieldset');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
  };

  var removeSelectDisables = function () {
    var selects = document.querySelectorAll('select');
    for (var i = 0; i < selects.length; i++) {
      selects[i].removeAttribute('disabled');
    }
  };

  var addDisables = function () {
    var fieldsets = document.querySelectorAll('fieldset');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'disabled');
    }
  };

  var addSelectDisables = function () {
    var selects = document.querySelectorAll('select');
    for (var i = 0; i < selects.length; i++) {
      selects[i].setAttribute('disabled', 'disabled');
    }
  };

  var setAdress = function () {
    var getXfromStyle = parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2;
    var getYFromStyle = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT;
    document.querySelector('#address').value = getYFromStyle + ',' + getXfromStyle;
  };


  var openMapAndForms = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    document.querySelector('#avatar').removeAttribute('disabled');
    setAdress();
  };

  var getMaxMinCoordinate = function (min, max, count) {
    if (count > max) {
      var newCoordinate = max;
    } else if (count < min) {
      newCoordinate = min;
    } else {
      newCoordinate = count;
    }
    return newCoordinate;
  };

  window.map = {
    drawPins: function () {
      var filtered = window.data.filteredAds;
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < filtered.length; i++) {
        fragment.appendChild(window.pin.createPin(window.data.filteredAds[i]));
      }
      window.utilities.pinsContainer.appendChild(fragment);
    },
    closeAd: function () {
      var cards = document.querySelectorAll('.map__card');
      for (var i = 0; i < cards.length; i++) {
        document.querySelector('.map').removeChild(document.querySelector('.map__card'));
      }
    },
    removePins: function () {
      var pins = document.querySelectorAll('.map__pin');
      for (var i = 1; i < pins.length; i++) {
        document.querySelector('.map__pins').removeChild(pins[i]);
      }
    },
    closeMapAndForm: function () {
      addDisables();
      addSelectDisables();
      document.querySelector('#avatar').setAttribute('disabled', 'disabled');
      setStartAdress();
      document.querySelector('.map').classList.add('map--faded');
      document.querySelector('.ad-form').classList.add('ad-form--disabled');
      mainPin.style.top = MAIN_PIN_START_TOP + 'px';
      mainPin.style.left = MAIN_PIN_START_LEFT + 'px';
      window.map.removePins();
    }
  };


  var onAdEscPress = function (evt) {
    if (evt.keyCode === window.utilities.ESK_KEYCODE) {
      window.map.closeAd();
    }
  };


  var objectFinder = function (src) {
    var filtered = window.data.filteredAds;
    for (var i = 0; i < filtered.length; i++) {
      if (src === window.data.filteredAds[i].author.avatar) {
        drawBigAd(window.data.filteredAds[i]);
      }

    }
    var cards = document.querySelectorAll('.map__card');
    if (cards.length > 1) {
      document.querySelector('.map').removeChild(document.querySelector('.map__card'));
    }
    document.addEventListener('keydown', onAdEscPress);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var countY = mainPin.offsetTop - shift.y;
      var countX = mainPin.offsetLeft - shift.x;
      var mapWidth = window.utilities.pinsContainer.offsetWidth - mainPin.offsetWidth;
      mainPin.style.top = getMaxMinCoordinate(window.utilities.MIN_Y, mainPinMaxY, countY) + 'px';
      mainPin.style.left = getMaxMinCoordinate(window.utilities.MIN_X, mapWidth, countX) + 'px';
      setAdress();
    };

    var onPinMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
      openMapAndForms();
      removeDisables();
      removeSelectDisables();
      window.map.drawPins();
    };

    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  });


  window.utilities.pinsContainer.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      objectFinder(evt.target.querySelector('img').getAttribute('src'));
    }
  });

  window.utilities.pinsContainer.addEventListener('click', function (evt) {
    objectFinder(evt.target.getAttribute('src'));
  });

  document.addEventListener('click', function (evt) {
    if (evt.target.className === 'popup__close') {
      window.map.closeAd();
      document.removeEventListener('keydown', onAdEscPress);
    }
  });

})();
