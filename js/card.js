'use strict';
(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');


  const typeTranslator = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  var getTitle = function (type) {
    return typeTranslator[type];
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
    if (photos.length !== 0) {
      for (var i = 1; i < photos.length; i++) {
        var clone = parent.cloneNode(true);
        clone.querySelector('.popup__photo').src = photos[i];
        parent.appendChild(clone.querySelector('.popup__photo'));
      }
    } else {
      parent.innerHTML = '';
    }

  };

  window.card = {
    createAd: function (ad) {
      var adCard = cardTemplate.cloneNode(true);
      adCard.querySelector('.popup__title').innerHTML = ad.offer.title;
      adCard.querySelector('.popup__text--address').innerHTML = ad.offer.address;
      adCard.querySelector('.popup__text--price').innerHTML = ad.offer.price + '₽/ночь';
      adCard.querySelector('.popup__type').innerHTML = getTitle(ad.offer.type);
      adCard.querySelector('.popup__text--capacity').innerHTML = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
      adCard.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
      adCard.querySelector('.popup__photo').src = ad.offer.photos[0];
      adCard.querySelector('.popup__avatar').src = ad.author.avatar;
      adCard.querySelector('.popup__description').innerHTML = ad.offer.description;
      modifyFeaturesList(ad.offer.features, adCard.querySelector('.popup__features'));
      createImages(ad.offer.photos, adCard.querySelector('.popup__photos'));

      return adCard;
    }
  };
})();
