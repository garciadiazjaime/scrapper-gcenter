import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
const { expect } = chai;
chai.use(chaiAsPromised);


import MongoUtil from '../../../src/utils/mongoUtil';
import { MongoClient } from 'mongodb';
import config from '../../../src/config';

describe('MongoUtil', () => {
  describe('saveReport() resolved', () => {
    const validResponse = 'valid_response';
    const validData = 'valid_data';
    const dbStub = {
      collection: () => ({
        insert: (param, cb) => {
          cb(null, validResponse);
        },
      }),
    };

    beforeEach(() => {
      sinon.stub(MongoUtil, 'openConnection').returns(Promise.resolve(dbStub));
    });

    afterEach(() => {
      MongoUtil.openConnection.restore();
    });

    it('gets a valid response', () => {
      const results = MongoUtil.saveReport(validData);
      expect(MongoUtil.openConnection.called).eq(true);
      return expect(results).to.eventually.equal(validResponse);
    });
  });

  describe('saveReport() rejected', () => {
    const invalidResponse = 'invalid_response';
    const validData = 'valid_data';

    beforeEach(() => {
      sinon.stub(MongoUtil, 'openConnection').returns(Promise.reject(invalidResponse));
    });

    afterEach(() => {
      MongoUtil.openConnection.restore();
    });

    it('gets an invalid response when cant open a db connection', () => {
      const results = MongoUtil.saveReport(validData);
      expect(MongoUtil.openConnection.called).eq(true);
      return expect(results).to.eventually.be.rejectedWith(invalidResponse);
    });
  });

  describe('save() rejected', () => {
    const invalidResponse = 'invalid_response';
    const validData = 'valid_data';
    const dbStub = {
      collection: () => ({
        insert: (param, cb) => {
          cb(invalidResponse, null);
        },
      }),
    };

    beforeEach(() => {
      sinon.stub(MongoUtil, 'openConnection').returns(Promise.resolve(dbStub));
    });

    afterEach(() => {
      MongoUtil.openConnection.restore();
    });

    it('gets an invalid response when cant insert data', () => {
      const results = MongoUtil.saveReport(validData);
      expect(MongoUtil.openConnection.called).eq(true);
      return expect(results).to.eventually.be.rejectedWith(invalidResponse);
    });
  });

  describe('openConnection() resolved', () => {
    const validResponse = 'valid_response';

    beforeEach(() => {
      sinon.stub(MongoClient, 'connect', (arg1, cb) => {
        expect(arg1).eq(config.get('db.url'));
        cb(null, validResponse);
      });
    });

    afterEach(() => {
      MongoClient.connect.restore();
    });

    it('gets a valid response', () => {
      const results = MongoUtil.openConnection();
      expect(MongoClient.connect.called).eq(true);
      return expect(results).to.eventually.equal(validResponse);
    });
  });

  describe('openConnection() rejected', () => {
    const invalidResponse = 'invalid_response';

    beforeEach(() => {
      sinon.stub(MongoClient, 'connect').throws(invalidResponse);
    });

    afterEach(() => {
      MongoClient.connect.restore();
    });

    it('gets an invalid response when cant open a db connection', () => {
      const results = MongoUtil.openConnection();
      expect(MongoClient.connect.called).eq(true);
      return expect(results).to.eventually.be.rejectedWith(invalidResponse);
    });
  });
});
