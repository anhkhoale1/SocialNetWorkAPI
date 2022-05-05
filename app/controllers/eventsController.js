const EventModel = require('../models/event.js');
const axios = require('axios').default;

module.exports = class Events {
  constructor(app, connect) {
    this.app = app;
    this.EventModel = connect.model('Event', EventModel);

    this.run();
  }

  create() {
    this.app.post('/events/', async (req, res) => {
      try {
        //check if user exists
        for (let i = 0; i < Object.keys(req.body.users).length; i++) {
          const id = req.body.users[i];
          await axios.get(`http://localhost:3000/user/${id}`)
          .catch(() => 
            req.body.users.splice(i, 1)
          )
        }

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

  get() {
    this.app.get('/event/:id', (req, res) => {
      try {
        this.EventModel
          .findById(req.params.id)
          .then((user) => {
            res.status(200).json(user);
        }).catch((err) => {
            res.status(400).json({
            message: `get:event -> ${err}`,
          });
        });
      } catch (err) {
        res.status(400).json({
          code: 400,
          message: 'Bad request to find a event'
        });
      }
    });
  }

  delete() {
    this.app.delete('/event/:id', (req, res) => {
      try {
        this.EventModel.findOneAndDelete(req.params.id).then((event) => {
          res.status(200).json({message: `event with id ${event.id} is deleted`})
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] delete:event/:id -> ${err}`)

        res.status(500).json({
          status: 500,
          message: 'Internal Server Error'
        })
      }
    })
  }

  update() {
    this.app.put('/event/:id', (req, res) => {
      try {
        const options = { new: true, runValidators: true };

        this.EventModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          options
        ).then((eventUpdated) => {
          res.status(200).json(eventUpdated || {})
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] update:event/:id -> ${err}`)

        res.status(500).json({
          status: 500,
          message: 'Internal Server Error'
        })
      }
    })
  }

  run() {
    this.create();
    this.get();
    this.delete();
    this.update();
  }
}