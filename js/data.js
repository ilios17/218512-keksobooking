'use strict';

(function () {
  window.data = {
    AD_TITLE_ARRAY: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    HOUSE_TYPE_ARRAY: ['palace', 'flat', 'house', 'bungalo'],
    CHECK_TIME_ARRAY: ['12:00', '13:00', '14:00'],
    HOUSE_FEATURES_ARRAY: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    PHOTOS_URL_ARRAY: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    AD_AMOUNT: 8,
    AVATAR_SRC: 'img/avatars/user0',
    MIN_PRICE: 1000,
    MAX_PRICE: 1000000,
    MAX_GUESTS: 10,
    MIN_Y: 130,
    MAX_Y: 630,
    MIN_X: 0,
    MAX_X: 1200,
    MIN_ROOMS: 1,
    MAX_ROOMS: 5,
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    MAIN_PIN_WIDTH: 62,
    MAIN_PIN_HEIGHT: 84,
    MAIN_PIN_NEEDLE: 24,
    PIN_CONTAINER_HEIGHT: 650,
    ESK_KEYCODE: 27,
    PRICES: ['0', '1000', '5000', '10000'],
    MAIN_PIN_START_LEFT: 570,
    MAIN_PIN_START_TOP: 375,
    PIN_CONTAINER_MIN_WIDTH: 0,


    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },

    randomizeInRange: function (min, max) {
      var maxNumber = max + 1;
      var randomNumberInRange = Math.floor(Math.random() * (maxNumber - min) + min);
      return randomNumberInRange;
    }
  };
})();
