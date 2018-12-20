/* eslint max-len: [2, 500, 4] */

module.exports = class CarModel {

  static extractData(data) {
    const carsData = data && data.passenger_vehicle_lanes ? data.passenger_vehicle_lanes.pop() : null;
    return carsData && carsData.standard_lanes && carsData.NEXUS_SENTRI_lanes && carsData.ready_lanes ? {
      carNormal: carsData.standard_lanes.pop(),
      carSentri: carsData.NEXUS_SENTRI_lanes.pop(),
      carReady: carsData.ready_lanes.pop(),
    } : {};
  }

  static formatData(normal, sentri, ready) {
    return normal && normal.delay_minutes && normal.lanes_open && sentri && sentri.delay_minutes && sentri.lanes_open && ready && ready.delay_minutes && ready.lanes_open ? {
      normal: {
        time: normal.delay_minutes.pop(),
        lanes: normal.lanes_open.pop(),
      },
      sentry: {
        time: sentri.delay_minutes.pop(),
        lanes: sentri.lanes_open.pop(),
      },
      readyLine: {
        time: ready.delay_minutes.pop(),
        lanes: ready.lanes_open.pop(),
      },
    } : null;
  }
};
