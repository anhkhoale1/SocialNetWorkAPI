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

  run() {
    this.create();

  }
}