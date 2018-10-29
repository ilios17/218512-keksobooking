'use strict';

(function () {
  var AD_TITLE_ARRAY = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var HOUSE_TYPE_ARRAY = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIME_ARRAY = ['12:00', '13:00', '14:00'];
  var HOUSE_FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_URL_ARRAY = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var AVATAR_SRC = 'img/avatars/user0';
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MAX_GUESTS = 10;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var avatarUrlsArray = [];
  var avatarsArray = [];
  var randomisedFeaturesArray = [];
  var randomisedPhotosArray = [];
  var locationsArray = [];
  var adsArray = [];


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
    return Math.ceil(Math.random() * (max - min) + min);
  };


  var createRandomPng = function (src) {
    for (var i = 1; i <= window.utilities.AD_AMOUNT; i++) {
      var getSrc = src + i + '.png';
      avatarUrlsArray.push(getSrc);
    }
    shuffleArray(avatarUrlsArray);
    return avatarUrlsArray;
  };

  var createAvatarObjects = function (array) {
    for (var i = 0; i < array.length; i++) {
      var avatar = {avatar: avatarUrlsArray[i]};
      avatarsArray.push(avatar);
    }
    return avatarsArray;
  };

  var getRandomFeature = function () {
    for (var i = 0; i < window.utilities.AD_AMOUNT; i++) {
      shuffleArray(HOUSE_FEATURES_ARRAY);
      var slicedFeature = HOUSE_FEATURES_ARRAY.slice(randomizeInRange(1, 6));
      randomisedFeaturesArray.push(slicedFeature);
    }
    return randomisedFeaturesArray;
  };

  var getRandomPhoto = function () {
    for (var i = 0; i < window.utilities.AD_AMOUNT; i++) {
      shuffleArray(PHOTOS_URL_ARRAY);
      var copiedPhoto = PHOTOS_URL_ARRAY.slice();
      randomisedPhotosArray.push(copiedPhoto);
    }
    return randomisedPhotosArray;
  };

  var createOfferObjects = function () {
    var offerArray = [];
    var randomTitle = shuffleArray(AD_TITLE_ARRAY);
    for (var i = 0; i < window.utilities.AD_AMOUNT; i++) {
      var offer = {price: randomizeInRange(MIN_PRICE, MAX_PRICE),
        title: randomTitle[i], type: HOUSE_TYPE_ARRAY[randomizeInRange(0, 3)],
        rooms: randomizeInRange(MIN_ROOMS, MAX_ROOMS),
        checkin: CHECK_TIME_ARRAY[randomizeInRange(0, 2)],
        checkout: CHECK_TIME_ARRAY[randomizeInRange(0, 2)],
        features: randomisedFeaturesArray[i],
        photos: randomisedPhotosArray[i],
        description: '',
        adress: (locationsArray[i].x) + ',' + ' ' + (locationsArray[i].y),
        guests: randomizeInRange(0, MAX_GUESTS)};

      offerArray.push(offer);
    }
    return offerArray;
  };

  var createLocationObjects = function () {
    for (var i = 0; i < window.utilities.AD_AMOUNT; i++) {
      var location = {x: randomizeInRange(window.utilities.MIN_X, window.utilities.MAX_X),
        y: randomizeInRange(window.utilities.MIN_Y, window.utilities.MAX_Y)};

      locationsArray.push(location);
    }
    return locationsArray;
  };

  var createAdArray = function (loadedAd) {
    var ad = {
      author: loadedAd.author,
      offer: loadedAd.offer,
      location: loadedAd.location
    };
    return ad;
  };

  window.load(function (loadedAd) {
    for (var i = 0; i < 8; i++) {
      adsArray.push(createAdArray(loadedAd[i]));
    }
    return adsArray;
  });

  window.data = {
    ads: adsArray
  };
})();
