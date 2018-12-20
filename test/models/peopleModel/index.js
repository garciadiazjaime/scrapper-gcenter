const chai = require('chai');
const { expect } = chai;


const PeopleModel = require('../../../src/models/peopleModel');
const stubData = require('../../../resources/stubs/port.json');


describe('PeopleModel', () => {
  describe('extractData()', () => {
    const invalidStubData = 'invalid_stub_data');

    it('returns valid results', () => {
      const { peopleNormal, peopleReady } = PeopleModel.extractData(stubData);
      const results = PeopleModel.formatData(peopleNormal, peopleReady);
      expect(results.normal).to.have.all.keys('time', 'lanes');
      expect(results.readyLine).to.have.all.keys('time', 'lanes');
    });

    it('returns invalid results', () => {
      const { peopleNormal, peopleReady } = PeopleModel.extractData(invalidStubData);
      const results = PeopleModel.formatData(peopleNormal, peopleReady);
      expect(peopleNormal).to.be.an('undefined');
      expect(peopleReady).to.be.an('undefined');
      expect(results).to.be.a('null');
    });
  });
});
