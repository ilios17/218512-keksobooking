'use strict';

var AD_TITLE_ARRAY = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var HOUSE_TYPE_ARRAY = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME_ARRAY = ['12:00', '13:00', '14:00'];
var HOUSE_FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_URL_ARRAY = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AD_AMOUNT = 8;
var AVATAR_SRC = 'img/avatars/user0';
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MAX_GUESTS = 10;
var MIN_Y = 130;
var MAX_Y = 630;
var MIN_X = 0;
var MAX_X = 1200;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var pinGap = PIN_WIDTH / 2;
var avatarUrlArray = [];
var avatarArray = [];
var randomisedFeaturesArray = [];
var randomisedPhotosArray = [];
var locationsArray = [];
var ads = [];

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsList = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var randomizeInRange = function (min, max) {
  var maxNumber = max + 1;
  var randomNumberInRange = Math.floor(Math.random() * (maxNumber - min) + min);
  return randomNumberInRange;
};

var createRandomPng = function (src) {
  for (var i = 1; i <= AD_AMOUNT; i++) {
    var getSrc = src + i + '.png';
    avatarUrlArray.push(getSrc);
  }
  shuffleArray(avatarUrlArray);
  return avatarUrlArray;
};

var createAvatarObjects = function (array) {
  for (var i = 0; i < array.length; i++) {
    var avatar = {avatar: avatarUrlArray[i]};
    avatarArray.push(avatar);
  }
  return avatarArray;
};

var getRandomFeature = function (array) {
  for (var i = 0; i < AD_AMOUNT; i++) {
    shuffleArray(array);
    var slicedFeature = array.slice(0, randomizeInRange(1, 6));
    randomisedFeaturesArray.push(slicedFeature);
  }
  return randomisedFeaturesArray;
};

var getRandomPhoto = function (array) {
  for (var i = 0; i < AD_AMOUNT; i++) {
    shuffleArray(array);
    var copiedPhoto = array.slice(0, 4);
    randomisedPhotosArray.push(copiedPhoto);
  }
  return randomisedPhotosArray;
};

var createOfferObjects = function () {
  var offerArray = [];
  var randomTitle = shuffleArray(AD_TITLE_ARRAY);
  for (var i = 0; i < AD_AMOUNT; i++) {
    var offer = {price: randomizeInRange(MIN_PRICE, MAX_PRICE),
      title: randomTitle[i], type: HOUSE_TYPE_ARRAY[randomizeInRange(0, 3)],
      rooms: randomizeInRange(MIN_ROOMS, MAX_ROOMS),
      checkin: CHECK_TIME_ARRAY[randomizeInRange(0, 2)],
      checkout: CHECK_TIME_ARRAY[randomizeInRange(0, 2)],
      features: randomisedFeaturesArray[i],
      photos: randomisedPhotosArray[i],
      description: '',
      adress: String(locationsArray[i].x) + ',' + ' ' + String(locationsArray[i].y),
      guests: randomizeInRange(0, MAX_GUESTS)};

    offerArray.push(offer);
  }
  return offerArray;
};

var createLocationObjects = function () {
  for (var i = 0; i < AD_AMOUNT; i++) {
    var location = {x: randomizeInRange(MIN_X, MAX_X),
      y: randomizeInRange(MIN_Y, MAX_Y)};

    locationsArray.push(location);
  }
  return locationsArray;
};


var createAdArray = function () {
  var returnedArray = createOfferObjects();
  for (var i = 0; i < AD_AMOUNT; i++) {
    var ad = {author: avatarArray[i],
      offer: returnedArray[i],
      location: locationsArray[i]};

    ads.push(ad);
  }
  return ads;
};

var createPin = function (adInfo) {
  var singlePin = pinTemplate.cloneNode(true);
  singlePin.style = 'left: ' + (adInfo.location.x - pinGap) + 'px; top: ' + (adInfo.location.y - PIN_HEIGHT) + 'px;';
  singlePin.querySelector('img').src = adInfo.author.avatar;
  singlePin.querySelector('img').alt = adInfo.offer.title;
  return singlePin;
};

var drawPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < AD_AMOUNT; i++) {
    fragment.appendChild(createPin(ads[i]));
  }
  pinsList.appendChild(fragment);
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
  for (var i = 1; i < PHOTOS_URL_ARRAY.length; i++) {
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

shuffleArray(AD_TITLE_ARRAY);
createRandomPng(AVATAR_SRC);
createAvatarObjects(avatarUrlArray);
getRandomPhoto(PHOTOS_URL_ARRAY);
getRandomFeature(HOUSE_FEATURES_ARRAY);
createLocationObjects();
createAdArray();
drawBigAd(ads[0]);
drawPins();
document.querySelector('.map').classList.remove('map--faded');
