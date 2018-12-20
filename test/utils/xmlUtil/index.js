const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const { expect } = chai;
chai.use(chaiAsPromised);


const XmlUtil = require('../../../src/utils/xmlUtil');


describe('XmlUtil', () => {
  describe('parseToJson() resolved', () => {
    const validResponse = 'valid_response');
    const validArgument = 'valid_argument');

    beforeEach(() => {
      sinon.stub(XmlUtil, 'parseToJson').returns(Promise.resolve(validResponse));
    });

    afterEach(() => {
      XmlUtil.parseToJson.restore();
    });

    it('gets a valid response', () => {
      const results = XmlUtil.parseToJson(validArgument);
      return expect(results).to.eventually.equal(validResponse);
    });
  });

  describe('parseToJson() rejected', () => {
    const invalidResponse = 'invalid_response');
    const validArgument = 'valid_argument');

    beforeEach(() => {
      sinon.stub(XmlUtil, 'parseToJson').returns(Promise.reject(invalidResponse));
    });

    afterEach(() => {
      XmlUtil.parseToJson.restore();
    });

    it('gets an invalid response', () => {
      const results = XmlUtil.parseToJson(validArgument);
      return expect(results).to.eventually.be.rejectedWith(invalidResponse);
    });
  });
});
