'use strict';

(function () {
  var avatarUrlsArray = [];
  var avatarsArray = [];
  var randomisedFeaturesArray = [];
  var randomisedPhotosArray = [];
  var locationsArray = [];
  var adsArray = [];

  var createRandomPng = function (src) {
    for (var i = 1; i <= window.data.AD_AMOUNT; i++) {
      var getSrc = src + i + '.png';
      avatarUrlsArray.push(getSrc);
    }
    window.data.shuffleArray(avatarUrlsArray);
    return avatarUrlsArray;
  };

  var createAvatarObjects = function (array) {
    for (var i = 0; i < array.length; i++) {
      var avatar = {avatar: avatarUrlsArray[i]};
      avatarsArray.push(avatar);
    }
    return avatarsArray;
  };

  var getRandomFeature = function (array) {
    for (var i = 0; i < window.data.AD_AMOUNT; i++) {
      window.data.shuffleArray(array);
      var slicedFeature = array.slice(0, window.data.randomizeInRange(1, 6));
      randomisedFeaturesArray.push(slicedFeature);
    }
    return randomisedFeaturesArray;
  };

  var getRandomPhoto = function (array) {
    for (var i = 0; i < window.data.AD_AMOUNT; i++) {
      window.data.shuffleArray(array);
      var copiedPhoto = array.slice(0, 4);
      randomisedPhotosArray.push(copiedPhoto);
    }
    return randomisedPhotosArray;
  };

  var createOfferObjects = function () {
    var offerArray = [];
    var randomTitle = window.data.shuffleArray(window.data.AD_TITLE_ARRAY);
    for (var i = 0; i < window.data.AD_AMOUNT; i++) {
      var offer = {price: window.data.randomizeInRange(window.data.MIN_PRICE, window.data.MAX_PRICE),
        title: randomTitle[i], type: window.data.HOUSE_TYPE_ARRAY[window.data.randomizeInRange(0, 3)],
        rooms: window.data.randomizeInRange(window.data.MIN_ROOMS, window.data.MAX_ROOMS),
        checkin: window.data.CHECK_TIME_ARRAY[window.data.randomizeInRange(0, 2)],
        checkout: window.data.CHECK_TIME_ARRAY[window.data.randomizeInRange(0, 2)],
        features: randomisedFeaturesArray[i],
        photos: randomisedPhotosArray[i],
        description: '',
        adress: (locationsArray[i].x) + ',' + ' ' + (locationsArray[i].y),
        guests: window.data.randomizeInRange(0, window.data.MAX_GUESTS)};

      offerArray.push(offer);
    }
    return offerArray;
  };

  var createLocationObjects = function () {
    for (var i = 0; i < window.data.AD_AMOUNT; i++) {
      var location = {x: window.data.randomizeInRange(window.data.MIN_X, window.data.MAX_X),
        y: window.data.randomizeInRange(window.data.MIN_Y, window.data.MAX_Y)};

      locationsArray.push(location);
    }
    return locationsArray;
  };


  var createAdArray = function () {
    var returnedArray = createOfferObjects();
    for (var i = 0; i < window.data.AD_AMOUNT; i++) {
      var ad = {author: avatarsArray[i],
        offer: returnedArray[i],
        location: locationsArray[i]};

      adsArray.push(ad);
    }
    return adsArray;
  };

  window.data.shuffleArray(window.data.AD_TITLE_ARRAY);
  createRandomPng(window.data.AVATAR_SRC);
  createAvatarObjects(avatarUrlsArray);
  getRandomPhoto(window.data.PHOTOS_URL_ARRAY);
  getRandomFeature(window.data.HOUSE_FEATURES_ARRAY);
  createLocationObjects();
  createAdArray();

  window.card = {
    ads: adsArray
  };
})();
