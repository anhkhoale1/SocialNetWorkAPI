const DiscussionModel = require('../models/discussion.js');

module.exports = class Discussions {
  constructor(app, connect) {
    this.app = app;
    this.DiscussionModel = connect.model('Discussion', DiscussionModel);

    this.run();
  }

  create() {
    this.app.post('/discussion/', (req, res) => {
      try {
        const discussionModel = new this.DiscussionModel(req.body);

        discussionModel
        .save()
        .then((discussion) => {
          res.status(200).json({
            message: `discussion ${discussion.name} created !`,
          });
          console.log(`discussion ${discussion.name} created !`);
        }).catch((err) => {
          console.error(`post:discussion -> ${err}`)
          res.status(400).json({
            message: `post:discussion -> ${err}`,
          });
        });
      } catch (err) {
        console.error(`[ERROR] post:discussion -> ${err}`)

        res.status(400).json({
          code: 400,
          message: 'Bad Request'
        });
      }
    });
  }

  delete() {
    this.app.delete('/discussion/:id', (req, res) => {
      try {
        this.DiscussionModel.findOneAndDelete(req.params.id).then((discussion) => {
          res.status(200).json({message: `discussion with id ${discussion.id} is deleted`})
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] delete:discussion/:id -> ${err}`)

        res.status(500).json({
          status: 500,
          message: 'Internal Server Error'
        })
      }
    })
  }

  update() {
    this.app.put('/discussion/:id', (req, res) => {
      try {
        const options = { new: true, runValidators: true };

        this.DiscussionModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          options
        ).then((discussion) => {
          res.status(200).json(discussion || {})
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] update:discussion/:id -> ${err}`)

        res.status(500).json({
          status: 500,
          message: 'Internal Server Error'
        })
      }
    })
  }

  get() {
    this.app.get('/discussion/:id', (req, res) => {
      try {
        this.DiscussionModel
          .findById(req.params.id)
          .then((group) => {
            res.status(200).json(group);
        }).catch((err) => {
            res.status(400).json({
            message: `get:discussion -> ${err}`,
          });
        });
      } catch (err) {
        res.status(400).json({
          code: 400,
          message: 'Bad request'
        });
      }
    });
  }

  run() {
    this.create();
    this.get();
    this.update();
    this.delete();
  }
}