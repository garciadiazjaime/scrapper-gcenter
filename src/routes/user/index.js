import TwitterUtil from '../../utils/twitterUtil';
import PeopleModel from '../../models/peopleModel';

export default (app) => {
  app.post('/user/report', (req, res) => {
    const data = req.body;
    PeopleModel.saveReport(data)
      .then((results) => {
        const twitterUtil = new TwitterUtil();
        const status = TwitterUtil.formatStatus(data);
        twitterUtil.postTweet(status)
          .then(() => {
            res.setHeader('Content-Type', 'application/json');
            res.send(results);
          }, (error) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(error);
          })
          .catch((error) => {
            res.status(200).send(error);
          });
      })
      .catch((error) => {
        res.status(200).send(error);
      });
  });

  app.get('/user/report', (req, res) => {
    const city = req.param('city');
    if (city) {
      const twitterUtil = new TwitterUtil();
      // const status = TwitterUtil.formatStatus(data);
      twitterUtil.getTweets('garita_center')
        .then((results) => {
          res.setHeader('Content-Type', 'application/json');
          res.send(results);
        }, (error) => {
          res.setHeader('Content-Type', 'application/json');
          res.send(error);
        })
        .catch((error) => {
          res.status(200).send(error);
        });
    } else {
      res.send(':(');
    }
  });
};
