import chai from 'chai';
const { expect } = chai;


import QueryUtil from '../../../src/utils/mongoUtil/queryUtil';
import stubData from '../../../resources/stubs/portData.json';


describe('QueryUtil', () => {
  describe('saveReport()', () => {
    const portName = 'port_name';
    const invalidPortName = '';
    const invalidStubData = 'invalid_stub_data';

    it('returns valid results', () => {
      const results = QueryUtil.saveReport(stubData, portName);
      expect(results).to.have.all.keys('garita', 'content', 'created');
      expect(results.garita).eq(portName);
    });

    it('returns null when sending invalid data', () => {
      const results = QueryUtil.saveReport(invalidStubData, portName);
      expect(results).eq(null);
    });

    it('returns null when sending invalid port', () => {
      const results = QueryUtil.saveReport(stubData, invalidPortName);
      expect(results).eq(null);
    });

    it('returns null when sending invalid data and port', () => {
      const results = QueryUtil.saveReport(invalidStubData, invalidPortName);
      expect(results).eq(null);
    });

    it('returns empty results when sending nothing', () => {
      const results = QueryUtil.saveReport();
      expect(results).eq(null);
    });
  });
});
