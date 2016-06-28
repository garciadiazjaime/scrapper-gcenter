import asyncUtil from './utils/asyncUtil';
import RequestUtil from './utils/requestUtil';
import XmlUtil from './utils/xmlUtil';
import PortModel from './models/portModel';
import 'babel-polyfill';

function main() {
  (asyncUtil(function *() {
    const url = 'http://127.0.0.1:3000/ports';
    const requestResponse = yield RequestUtil.request(url);

    const jsonData = yield XmlUtil.parseToJson(requestResponse);

    const portData1 = PortModel.extractData(jsonData, '250401');

    const portData2 = PortModel.extractData(jsonData, '250601');

    console.log('portData1', JSON.stringify(portData1));
    console.log('portData2', JSON.stringify(portData2));
  }))();
}
main();
