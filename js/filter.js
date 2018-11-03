'use strict';
(function () {
  var form = document.querySelector('form');
  var featuresAll = document.querySelector('#housing-features');
  var Filter = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any',
  };
  var PriceRange = {
    low: 10000,
    middle: 50000,
    high: 50000
  };

  window.filterAd = window.debounce(function () {

    var getFilteredType = function (type) {
      if (Filter['housing-type'] === 'any') {
        return true;
      }
      return type === Filter['housing-type'];
    };

    var getFilteredRooms = function (number) {
      if (Filter['housing-rooms'] === 'any') {
        return true;
      }
      return number === parseInt(Filter['housing-rooms'], 10);
    };

    var getFiteredGuests = function (guestNumber) {
      if (Filter['housing-guests'] === 'any') {
        return true;
      }
      return guestNumber === parseInt(Filter['housing-guests'], 10);
    };

    var getFilteredPrice = function (price) {
      if (Filter['housing-price'] === 'any') {
        return true;
      }

      if (Filter['housing-price'] === 'high') {
        return price > PriceRange[Filter['housing-price']];
      } else {
        return price < PriceRange[Filter['housing-price']];
      }
    };

    var checkFeatures = function (ad) {
      var available = true;
      var inputs = featuresAll.querySelectorAll('input');
      for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].checked) {
          continue;
        }

        if (ad.offer.features.indexOf(inputs[i].value) === -1) {
          available = false;
          break;
        }
        available = true;
      }
      return available;
    };

    var filtered = window.data.ads.filter(function (ad) {
      return (
        getFilteredType(ad.offer.type) &&
        getFilteredPrice(ad.offer.price) &&
        getFilteredRooms(ad.offer.rooms) &&
        getFiteredGuests(ad.offer.guests) &&
        checkFeatures(ad)
      );
    });

    window.data.filteredAds = filtered;
    window.map.closeAd();
    window.map.removePins();
    window.map.drawPins(filtered);
  });

  var onFilter = function (evt) {
    var target = evt.target;
    if (!Filter[target.name]) {
      return;
    }
    Filter[evt.target.name] = target.value;
    window.filterAd();
  };

  form.addEventListener('change', onFilter);
  featuresAll.addEventListener('change', window.filterAd);
})();
