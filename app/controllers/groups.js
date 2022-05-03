const GroupModel = require('../models/group.js');

module.exports = class Groups {
  constructor(app, connect) {
    this.app = app;
    this.GroupModel = connect.model('Group', GroupModel);

    this.run();
  }

  create() {
    this.app.post('/groups/', (req, res) => {
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
          console.error(`post:groups -> ${err}`)
          res.status(400).json({
            message: `post:groups -> ${err}`,
          });
        });
      } catch (err) {
        console.error(`[ERROR] post:groups -> ${err}`)

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