const chai = require('chai');
const { expect } = chai;


const PortModel = require('../../../src/models/portModel');
const stubData = require('../../../resources/stubs/cbp.json');


describe('PeopleModel', () => {
  describe('extractData()', () => {
    const validPort = '250401');
    const invalidPort = 'invalid_port');
    const invalidStubData = 'invalid_stub_data');

    it('returns valid results', () => {
      const results = PortModel.extractData(stubData, validPort);
      expect(results.length).to.eq(1);
      expect(results[0].car).to.have.all.keys('normal', 'sentry', 'readyLine');
      expect(results[0].people).to.have.all.keys('normal', 'readyLine');
    });

    it('returns empty results when sending invalid data', () => {
      const results = PortModel.extractData(invalidStubData, validPort);
      expect(results.length).to.eq(0);
    });

    it('returns empty results when sending invalid port', () => {
      const results = PortModel.extractData(invalidStubData, invalidPort);
      expect(results.length).to.eq(0);
    });

    it('returns empty results when sending invalid data and port', () => {
      const results = PortModel.extractData(invalidStubData, invalidPort);
      expect(results.length).to.eq(0);
    });

    it('returns empty results when sending nothing', () => {
      const results = PortModel.extractData();
      expect(results.length).to.eq(0);
    });
  });
});
