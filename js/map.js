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
var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 84;
var pinPositionLeft = 570;
var pinPositionTop = 375;
var pinGap = PIN_WIDTH / 2;
var addressStartX = MAIN_PIN_WIDTH / 2 + pinPositionLeft;
var addressStartY = MAIN_PIN_WIDTH / 2 + pinPositionTop;
var addressActiveY = MAIN_PIN_HEIGHT+ pinPositionTop;
var offerArray = [];
var avatarUrlArray = [];
var avatarArray = [];
var randomisedFeaturesArray = [];
var randomisedPhotosArray = [];
var locationsArray = [];
var ads = [];

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsList = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var priceInfo = document.querySelector('#price');
var typeSelect = document.querySelector('#type');
var timeInSelect = document.querySelector('#timein');
var timeOutSelect = document.querySelector('#timeout');

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
  var randomNumberInRange = Math.floor(Math.random() * ((max += 1) - min) + min);
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

var avatarObjects = function (array) {
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

var offerObjects = function () {
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

var locationObjects = function () {
  for (var i = 0; i < AD_AMOUNT; i++) {
    var location = {x: randomizeInRange(MIN_X, MAX_X),
      y: randomizeInRange(MIN_Y, MAX_Y)};

    locationsArray.push(location);
  }
  return locationsArray;
};


var createAdArray = function () {
  for (var i = 0; i < AD_AMOUNT; i++) {
    var ad = {author: avatarArray[i],
      offer: offerArray[i],
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

  return adCard;
};

var hideSameElements = function (array) {
  for (var i = 1; i < array.length; i++) {
    array[i].style.display = 'none';
  }
};


var modifyFeaturesList = function (features) {
  for (var i = 0; i < features.length; i++) {
    if (features[i] === 'wifi') {
      document.querySelector('.popup__feature--wifi').style.display = 'inline-block';
    }
    if (features[i] === 'dishwasher') {
      document.querySelector('.popup__feature--dishwasher').style.display = 'inline-block';
    }
    if (features[i] === 'parking') {
      document.querySelector('.popup__feature--parking').style.display = 'inline-block';
    }
    if (features[i] === 'washer') {
      document.querySelector('.popup__feature--washer').style.display = 'inline-block';
    }
    if (features[i] === 'elevator') {
      document.querySelector('.popup__feature--elevator').style.display = 'inline-block';
    }
    if (features[i] === 'conditioner') {
      document.querySelector('.popup__feature--conditioner').style.display = 'inline-block';
    }
  }
};

var createImages = function (adsElement) {
  var photoElement = document.querySelector('.popup__photo').cloneNode(true);
  var fragment = document.createDocumentFragment();
  for (var i = 1; i < PHOTOS_URL_ARRAY.length; i++) {
    fragment.appendChild(photoElement);
    document.querySelector('.popup__photo').src = adsElement.offer.photos[i];
  }
  document.querySelector('.popup__photos').appendChild(fragment);
};

var drawBigAd = function (adsElement) {
  document.querySelector('.map__filters-container').insertAdjacentElement('beforeBegin', showAd(adsElement));
  var featuresListItems = document.querySelectorAll('.popup__feature');
  hideSameElements(featuresListItems);
  modifyFeaturesList(adsElement.offer.features);
  createImages(adsElement);
};


shuffleArray(AD_TITLE_ARRAY);
createRandomPng(AVATAR_SRC);
avatarObjects(avatarUrlArray);
getRandomPhoto(PHOTOS_URL_ARRAY);
getRandomFeature(HOUSE_FEATURES_ARRAY);
locationObjects();
offerObjects();
createAdArray();

var mainPin = document.querySelector('.map__pin--main');
var pinsContainer = document.querySelector('.map__pins');
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

mainPin.addEventListener('mouseup', function () {
  openMapAndForms();
  removeDisables();
  removeSelectDisables();
  drawPins();
});

var objectFinder = function (src) {
  for (var i = 0; i < AD_AMOUNT; i++) {
    if (src === ads[i].author.avatar) {
      drawBigAd(ads[i]);
    }
  }
};

pinsContainer.onclick = function (evt) {
  objectFinder(evt.target.getAttribute('src'));
};

var setMinPrice = function () {
  if (typeSelect.options[1].selected) {
    priceInfo.placeholder = '1000';
    priceInfo.min = '1000';
  }
  if (typeSelect.options[0].selected) {
    priceInfo.placeholder = '0';
    priceInfo.min = '0';
  }
  if (typeSelect.options[2].selected) {
    priceInfo.placeholder = '5000';
    priceInfo.min = '5000';
  }
  if (typeSelect.options[3].selected) {
    priceInfo.placeholder = '10000';
    priceInfo.min = '10000';
  }
};

setMinPrice();

typeSelect.addEventListener('change', function () {
  setMinPrice();
});

var changeTime = function (index, element) {
  element.options[index].selected = 'selected';
};

timeInSelect.onchange = function (evt) {
  changeTime(evt.target.selectedIndex, timeOutSelect);
};

timeOutSelect.onchange = function (evt) {
  changeTime(evt.target.selectedIndex, timeInSelect);
};

var makeRed = function () {
  var inputs = document.querySelectorAll('input');
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].checkValidity === false) {
      inputs[i].style.boxShadow = '0 0 10px red';
    }
  }
};

var popUpTemplate = document.querySelector('#success').content.querySelector('.success');

var showPopUp = function () {
  var popUp = popUpTemplate.cloneNode(true);
  document.querySelector('main').insertAdjacentElement('beforeend', popUp);
};

document.querySelector('.ad-form').onsubmit = function () {
  makeRed();
  showPopUp();
};
