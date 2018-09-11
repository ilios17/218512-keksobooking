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
var offerArray = [];
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

var randomiseInRange = function (min, max) {
  var randomNumberInRange = Math.floor(Math.random() * ((max += 1) - min) + min);
  return randomNumberInRange;
};

var AvatarConstructor = function (avatar) {
  this.avatar = avatar;
};

var createRandomPng = function (src) {
  for (var i = 1; i <= AD_AMOUNT; i++) {
    var getSrc = src + i + '.png';
    avatarUrlArray.push(getSrc);
  }
  shuffleArray(avatarUrlArray);
  return avatarUrlArray;
};

var createAvatarObject = function (array) {
  for (var i = 0; i < array.length; i++) {
    var avatar = new AvatarConstructor(avatarUrlArray[i]);
    avatarArray.push(avatar);
  }
  return avatarArray;
};

var getRandomFeature = function (array) {
  for (var i = 0; i < AD_AMOUNT; i++) {
    shuffleArray(array);
    var slicedFeature = array.slice(0, randomiseInRange(1, 6));
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

var OfferConstructor = function (title, adress, price, type, rooms, guests, checkin, checkout, features, description, photos) {
  this.title = title;
  this.adress = adress;
  this.price = price;
  this.type = type;
  this.rooms = rooms;
  this.guests = guests;
  this.checkin = checkin;
  this.checkout = checkout;
  this.features = features;
  this.description = description;
  this.photos = photos;
};

var createOfferArray = function () {
  var randomTitle = shuffleArray(AD_TITLE_ARRAY);
  for (var i = 0; i < AD_AMOUNT; i++) {
    var randomPrice = randomiseInRange(MIN_PRICE, MAX_PRICE);
    var shuffledTitle = randomTitle[i];
    var randomType = HOUSE_TYPE_ARRAY[randomiseInRange(0, 3)];
    var randomRooms = randomiseInRange(MIN_ROOMS, MAX_ROOMS);
    var randomCheckin = CHECK_TIME_ARRAY[randomiseInRange(0, 2)];
    var randomChackout = CHECK_TIME_ARRAY[randomiseInRange(0, 2)];
    var randomFeatures = randomisedFeaturesArray[i];
    var randomPhotos = randomisedPhotosArray[i];
    var blankDescription = '';
    var getAdress = String(locationsArray[i].x) + ',' + ' ' + String(locationsArray[i].y);
    var getGuests = randomiseInRange(0, MAX_GUESTS);

    var createOffer = new OfferConstructor(shuffledTitle, getAdress, randomPrice, randomType, randomRooms, getGuests, randomCheckin, randomChackout, randomFeatures, blankDescription, randomPhotos);

    offerArray.push(createOffer);
  }
  return offerArray;
};

var LocationConstructor = function (locationX, locationY) {
  this.x = locationX;
  this.y = locationY;
};

var createLocation = function () {
  for (var i = 0; i < AD_AMOUNT; i++) {
    var getX = randomiseInRange(MIN_X, MAX_X);
    var getY = randomiseInRange(MIN_Y, MAX_Y);

    var newLocation = new LocationConstructor(getX, getY);
    locationsArray.push(newLocation);
  }
  return locationsArray;
};

var AdConstructor = function (author, offer, location) {
  this.author = author;
  this.offer = offer;
  this.location = location;
};

var createAdArray = function () {
  for (var i = 0; i < AD_AMOUNT; i++) {
    var currentAuthor = avatarArray[i];
    var currentOffer = offerArray[i];
    var currentLocation = locationsArray[i];

    var ad = new AdConstructor(currentAuthor, currentOffer, currentLocation);

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
    pinsList.appendChild(fragment);
  }
};

var typeTranslator = function (type) {
  if (type === 'flat') {
    type = 'Квартира';
  }
  if (type === 'bungalo') {
    type = 'Бунгало';
  }
  if (type === 'house') {
    type = 'Дом';
  }
  if (type === 'palace') {
    type = 'Дворец';
  }
  return type;
};

var showAd = function (ad) {
  var adCard = cardTemplate.cloneNode(true);
  adCard.querySelector('.popup__title').innerHTML = ad.offer.title;
  adCard.querySelector('.popup__text--address').innerHTML = ad.offer.adress;
  adCard.querySelector('.popup__text--price').innerHTML = String(ad.offer.price) + '₽/ночь';
  adCard.querySelector('.popup__type').innerHTML = typeTranslator(ad.offer.type);
  adCard.querySelector('.popup__text--capacity').innerHTML = String(ad.offer.rooms) + ' комнаты для ' + String(ad.offer.guests) + ' гостей';
  adCard.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  adCard.querySelector('.popup__photo').src = ad.offer.photos[0];
  adCard.querySelector('.popup__avatar').src = ad.author.avatar;
  adCard.querySelector('.popup__description').innerHTML = ad.offer.description;

  return adCard;
};

var hideSameElements = function (array) {
  for (var i = 0; i < array.length; i++) {
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
  for (var i = 1; i < PHOTOS_URL_ARRAY.length; i++) {
    document.querySelector('.popup__photos').appendChild(document.querySelector('.popup__photo').cloneNode(true));
    document.querySelector('.popup__photo').src = adsElement.offer.photos[i];
  }
};

var drawBigAd = function (adsElement) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(showAd(adsElement));
  document.querySelector('.map').insertBefore(fragment, document.querySelector('.map__filters-container'));
  var featuresListItems = document.querySelectorAll('.popup__feature');
  hideSameElements(featuresListItems);
  modifyFeaturesList(adsElement.offer.features);
  createImages(adsElement);
};

shuffleArray(AD_TITLE_ARRAY);
createRandomPng(AVATAR_SRC);
createAvatarObject(avatarUrlArray);
getRandomPhoto(PHOTOS_URL_ARRAY);
getRandomFeature(HOUSE_FEATURES_ARRAY);
createLocation();
createOfferArray();
createAdArray();
drawPins();
drawBigAd(ads[0]);

document.querySelector('.map').classList.remove('map--faded');
