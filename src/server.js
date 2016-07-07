import express from 'express';

// import stubsRoutes from './routes/stubs';
import PortModel from './models/portModel';
const env = process.env;

const app = express();
// stubsRoutes(app);

app.get('/report', (req, res) => {
  const city = req.param('city');
  if (city) {
    PortModel.getReport(city)
      .then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
      });
  } else {
    res.send(':(');
  }
});

app.get('/health', (req, res) => {
  res.writeHead(200);
  res.end();
});

app.get('*', (req, res) => {
  res.writeHead(200);
  res.write(':)');
  res.end();
});

app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', () => {
  console.log(`Application worker ${process.pid} started...`);
});
