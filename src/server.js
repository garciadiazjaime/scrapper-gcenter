import express from 'express';
import fs from 'fs';

const app = express();

app.get('/ports', (req, res) => {
  fs.readFile('resources/stubs/ports.xml', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': data.length });
    res.write(data);
    res.end();
  });
});

app.get('/san-ysidro', (req, res) => {
  fs.readFile('resources/stubs/cbp_san_ysidro.html', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
    res.write(data);
    res.end();
  });
});

app.get('/otay', (req, res) => {
  fs.readFile('resources/stubs/cbp_otay.html', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
    res.write(data);
    res.end();
  });
});

app.listen('3000', () => {
  console.log('Example app listening on port 3000');
});
