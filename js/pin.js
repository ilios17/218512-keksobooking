'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinGap = window.data.PIN_WIDTH / 2;

  window.pin = {
    createPin: function (adInfo) {
      var singlePin = pinTemplate.cloneNode(true);
      singlePin.style = 'left: ' + (adInfo.location.x - pinGap) + 'px; top: ' + (adInfo.location.y - window.data.PIN_HEIGHT) + 'px;';
      singlePin.querySelector('img').src = adInfo.author.avatar;
      singlePin.querySelector('img').alt = adInfo.offer.title;
      return singlePin;
    }
  };
})();
