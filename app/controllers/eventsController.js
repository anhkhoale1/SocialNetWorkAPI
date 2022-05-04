const EventModel = require('../models/event.js');

module.exports = class Events {
  constructor(app, connect) {
    this.app = app;
    this.EventModel = connect.model('Event', EventModel);

    this.run();
  }

  create() {
    this.app.post('/events/', (req, res) => {
      try {
        const eventModel = new this.EventModel(req.body);

        eventModel
        .save()
        .then((event) => {
          res.status(200).json({
            message: `event ${event.name} created !`,
          });
          console.log(`event ${event.name} created !`);
        }).catch((err) => {
          console.error(`post:events -> ${err}`)
          res.status(400).json({
            message: `post:events -> ${err}`,
          });
        });
      } catch (err) {
        console.error(`[ERROR] post:events -> ${err}`)

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