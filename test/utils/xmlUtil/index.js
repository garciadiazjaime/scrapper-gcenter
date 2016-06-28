import chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
const { expect } = chai;
chai.use(chaiAsPromised);


import XmlUtil from '../../../src/utils/xmlUtil';


describe('XmlUtil', () => {

  describe.only('parseToJson() resolved', () => {
    const validResponse = 'valid_response';
    const validArgument = 'valid_argument';

    beforeEach(() => {
      sinon.stub(XmlUtil, 'parseToJson').returns(Promise.resolve(validResponse));
    });

    afterEach(() => {
      XmlUtil.parseToJson.restore();
    })

    it('gets a valid response', () => {
      const results = XmlUtil.parseToJson(validArgument);
      return expect(results).to.eventually.equal(validResponse);
    });
  });

  describe.only('parseToJson() rejected', () => {
    const invalidResponse = 'invalid_response';
    const validArgument = 'valid_argument';

    beforeEach(() => {
      sinon.stub(XmlUtil, 'parseToJson').returns(Promise.reject(invalidResponse));
    });

    afterEach(() => {
      XmlUtil.parseToJson.restore();
    })

    it('gets an invalid response', () => {
      const results = XmlUtil.parseToJson(validArgument);
      return expect(results).to.eventually.be.rejectedWith(invalidResponse);
    });
  });
});
