'use strict';

(function () {
  var pinsContainer = document.querySelector('.map__pins');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var addressStartX = window.data.MAIN_PIN_WIDTH / 2 + window.data.MAIN_PIN_START_LEFT;
  var addressStartY = window.data.MAIN_PIN_WIDTH / 2 + window.data.MAIN_PIN_START_TOP;
  var addressActiveY = window.data.MAIN_PIN_HEIGHT + window.data.MAIN_PIN_START_TOP;
  var mainPinMaxY = window.data.PIN_CONTAINER_HEIGHT - window.data.MAIN_PIN_NEEDLE;

  var drawPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.AD_AMOUNT; i++) {
      fragment.appendChild(window.pin.createPin(window.card.ads[i]));
    }
    pinsContainer.appendChild(fragment);
  };

  var typeTranslator = function (type) {
    var translatedType = '';
    switch (type) {
      case 'flat':
        translatedType = 'Квартира';
        break;
      case 'bungalo':
        translatedType = 'Бунгало';
        break;
      case 'house':
        translatedType = 'Дом';
        break;
      case 'palace':
        translatedType = 'Дворец';
        break;
    }
    return translatedType;
  };

  var modifyFeaturesList = function (features, parent) {
    var clone = parent.cloneNode(true);
    parent.innerHTML = '';
    for (var i = 0; i < features.length; i++) {
      if (features[i] === 'wifi') {
        parent.appendChild(clone.querySelector('.popup__feature--wifi'));
      }
      if (features[i] === 'dishwasher') {
        parent.appendChild(clone.querySelector('.popup__feature--dishwasher'));
      }
      if (features[i] === 'parking') {
        parent.appendChild(clone.querySelector('.popup__feature--parking'));
      }
      if (features[i] === 'washer') {
        parent.appendChild(clone.querySelector('.popup__feature--washer'));
      }
      if (features[i] === 'elevator') {
        parent.appendChild(clone.querySelector('.popup__feature--elevator'));
      }
      if (features[i] === 'conditioner') {
        parent.appendChild(clone.querySelector('.popup__feature--conditioner'));
      }
    }
  };

  var createImages = function (photos, parent) {
    var fragment = document.createDocumentFragment();
    for (var i = 1; i < window.data.PHOTOS_URL_ARRAY.length; i++) {
      var clone = parent.cloneNode(true);
      clone.querySelector('.popup__photo').src = photos[i];
      fragment.appendChild(clone.querySelector('.popup__photo'));
    }
    parent.appendChild(fragment);
  };

  var showAd = function (ad) {
    var adCard = cardTemplate.cloneNode(true);
    adCard.querySelector('.popup__title').innerHTML = ad.offer.title;
    adCard.querySelector('.popup__text--address').innerHTML = ad.offer.adress;
    adCard.querySelector('.popup__text--price').innerHTML = ad.offer.price + '₽/ночь';
    adCard.querySelector('.popup__type').innerHTML = typeTranslator(ad.offer.type);
    adCard.querySelector('.popup__text--capacity').innerHTML = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    adCard.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    adCard.querySelector('.popup__photo').src = ad.offer.photos[0];
    adCard.querySelector('.popup__avatar').src = ad.author.avatar;
    adCard.querySelector('.popup__description').innerHTML = ad.offer.description;
    modifyFeaturesList(ad.offer.features, adCard.querySelector('.popup__features'));
    createImages(ad.offer.photos, adCard.querySelector('.popup__photos'));

    return adCard;
  };

  var drawBigAd = function (adsElement) {
    document.querySelector('.map__filters-container').insertAdjacentElement('beforeBegin', showAd(adsElement));
  };

  var mainPin = document.querySelector('.map__pin--main');
  document.querySelector('#address').value = addressStartX + ',' + addressStartY;

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

  var openMapAndForms = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    document.querySelector('#address').value = addressStartX + ',' + addressActiveY;

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
      var mapWidth = pinsContainer.offsetWidth - mainPin.offsetWidth;

      mainPin.style.top = getMaxMinCoordinate(window.data.MIN_Y, mainPinMaxY, countY) + 'px';
      mainPin.style.left = getMaxMinCoordinate(window.data.PIN_CONTAINER_MIN_WIDTH, mapWidth, countX) + 'px';
    };

    var onPinMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
      openMapAndForms();
      removeDisables();
      removeSelectDisables();
      drawPins();
    };

    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  });


  var objectFinder = function (src) {
    for (var i = 0; i < window.data.AD_AMOUNT; i++) {
      if (src === window.card.ads[i].author.avatar) {
        drawBigAd(window.card.ads[i]);
      }
    }
  };

  var closeAd = function () {
    var cards = document.querySelectorAll('.map__card');
    for (var i = 0; i < cards.length; i++) {
      document.querySelector('.map').removeChild(document.querySelector('.map__card'));
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.data.ESK_KEYCODE) {
      closeAd();
    }
  };

  pinsContainer.addEventListener('click', function (evt) {
    objectFinder(evt.target.getAttribute('src'));
    document.addEventListener('keydown', onPopupEscPress);
  });

  document.addEventListener('click', function (evt) {
    if (evt.target.className === 'popup__close') {
      closeAd();
      document.removeEventListener('keydown', onPopupEscPress);
    }
  });

})();
