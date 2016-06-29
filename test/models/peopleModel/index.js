import chai from 'chai';
const { expect } = chai;


import PeopleModel from '../../../src/models/peopleModel';
import stubData from '../../../resources/stubs/port.json';


describe('PeopleModel', () => {

  describe('extractData()', () => {

    const invalidStubData = 'invalid_stub_data';

    it('returns valid results', () => {
      const { peopleNormal, peopleReady } = PeopleModel.extractData(stubData);
      const results = PeopleModel.formatData(peopleNormal, peopleReady);
      expect(results.normal).to.have.all.keys('time', 'lanes');
      expect(results.readyLine).to.have.all.keys('time', 'lanes');
    });

    it('returns invalid results', () => {
      const { peopleNormal, peopleReady } = PeopleModel.extractData(invalidStubData);
      const results = PeopleModel.formatData(peopleNormal, peopleReady);
      expect(peopleNormal).to.be.undefined;
      expect(peopleReady).to.be.undefined;
      expect(results).to.be.null;
    });
  });
});
