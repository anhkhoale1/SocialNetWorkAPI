const SondageModel = require('../models/sondage.js');

module.exports = class Sondage {
  constructor(app, connect) {
    this.app = app;
    this.sondageModel = connect.model('Sondage', SondageModel);

    this.run();
  }

  create() {
    this.app.post('/sondage/', (req, res) => {
      try {
        const sondageModel = new this.sondageModel(req.body);

        sondageModel
        .save()
        .then((sondage) => {
          res.status(200).json({
            message: `sondage ${sondage.name} created !`,
          });
          console.log(`sondage ${sondage.name} created !`);
        }).catch((err) => {
          console.error(`post:sondage -> ${err}`)
          res.status(400).json({
            message: `post:sondage -> ${err}`,
          });
        });
      } catch (err) {
        console.error(`[ERROR] post:sondage -> ${err}`)

        res.status(400).json({
          code: 400,
          message: 'Bad Request'
        });
      }
    });
  }

  run() {
    this.create();

  }
}