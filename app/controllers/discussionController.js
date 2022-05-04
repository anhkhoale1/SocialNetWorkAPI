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
        const groupModel = new this.GroupModel(req.body);

        groupModel
        .save()
        .then((group) => {
          res.status(200).json({
            message: `group ${group.name} created !`,
          });
          console.log(`group ${group.name} created !`);
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