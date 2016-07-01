import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
const { expect } = chai;
chai.use(chaiAsPromised);


import RequestUtil from '../../../src/utils/requestUtil';


describe('RequestUtil', () => {
  describe('get() resolved', () => {
    const validResponse = 'valid_response';
    const validUrl = 'valid_url';

    beforeEach(() => {
      sinon.stub(RequestUtil, 'get').returns(Promise.resolve(validResponse));
    });

    afterEach(() => {
      RequestUtil.get.restore();
    });

    it('gets a valid response', () => {
      const results = RequestUtil.get(validUrl);
      return expect(results).to.eventually.equal(validResponse);
    });
  });

  describe('get() rejected', () => {
    const invalidResponse = 'invalid_response';
    const validUrl = 'valid_url';

    beforeEach(() => {
      sinon.stub(RequestUtil, 'get').returns(Promise.reject(invalidResponse));
    });

    afterEach(() => {
      RequestUtil.get.restore();
    });

    it('gets an invalid response', () => {
      const results = RequestUtil.get(validUrl);
      return expect(results).to.eventually.be.rejectedWith(invalidResponse);
    });
  });
});
