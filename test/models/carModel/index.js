const chai = require('chai');
const { expect } = chai;


const CarModel = require('../../../src/models/carModel');
const stubData = require('../../../resources/stubs/port.json');


describe('CarModel', () => {
  describe('extractData()', () => {
    const invalidStubData = 'invalid_stub_data';

    it('returns valid results', () => {
      const { carNormal, carSentri, carReady } = CarModel.extractData(stubData);
      const results = CarModel.formatData(carNormal, carSentri, carReady);
      expect(results.normal).to.have.all.keys('time', 'lanes');
      expect(results.sentry).to.have.all.keys('time', 'lanes');
      expect(results.readyLine).to.have.all.keys('time', 'lanes');
    });

    it('returns invalid results', () => {
      const { carNormal, carSentri, carReady } = CarModel.extractData(invalidStubData);
      const results = CarModel.formatData(carNormal, carSentri, carReady);
      expect(carNormal).to.be.an('undefined');
      expect(carSentri).to.be.an('undefined');
      expect(carReady).to.be.an('undefined');
      expect(results).to.be.a('null');
    });
  });
});
