import fs from 'fs';

export default (app) => {
  app.get('/ports', (req, res) => {
    fs.readFile('resources/stubs/ports.xml', (err, data) => {
      if (!err) {
        res.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': data.length });
        res.write(data);
      } else {
        res.writeHead(404);
      }
      res.end();
    });
  });

  app.get('/san-ysidro', (req, res) => {
    fs.readFile('resources/stubs/cbp_san_ysidro.html', (err, data) => {
      if (!err) {
        res.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': data.length });
        res.write(data);
      } else {
        res.writeHead(404);
      }
      res.end();
    });
  });

  app.get('/otay', (req, res) => {
    fs.readFile('resources/stubs/cbp_otay.html', (err, data) => {
      if (!err) {
        res.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': data.length });
        res.write(data);
      } else {
        res.writeHead(404);
      }
      res.end();
    });
  });
};
