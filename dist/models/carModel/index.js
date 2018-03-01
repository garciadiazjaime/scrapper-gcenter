"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint max-len: [2, 500, 4] */

var CarModel = function () {
  function CarModel() {
    _classCallCheck(this, CarModel);
  }

  _createClass(CarModel, null, [{
    key: "extractData",
    value: function extractData(data) {
      var carsData = data && data.passenger_vehicle_lanes ? data.passenger_vehicle_lanes.pop() : null;
      return carsData && carsData.standard_lanes && carsData.NEXUS_SENTRI_lanes && carsData.ready_lanes ? {
        carNormal: carsData.standard_lanes.pop(),
        carSentri: carsData.NEXUS_SENTRI_lanes.pop(),
        carReady: carsData.ready_lanes.pop()
      } : {};
    }
  }, {
    key: "formatData",
    value: function formatData(normal, sentri, ready) {
      return normal && normal.delay_minutes && normal.lanes_open && sentri && sentri.delay_minutes && sentri.lanes_open && ready && ready.delay_minutes && ready.lanes_open ? {
        normal: {
          time: normal.delay_minutes.pop(),
          lanes: normal.lanes_open.pop()
        },
        sentry: {
          time: sentri.delay_minutes.pop(),
          lanes: sentri.lanes_open.pop()
        },
        readyLine: {
          time: ready.delay_minutes.pop(),
          lanes: ready.lanes_open.pop()
        }
      } : null;
    }
  }]);

  return CarModel;
}();

exports.default = CarModel;