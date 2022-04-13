const UserModel = require('../models/user.js');

module.exports = class Users {
  constructor(app, connect) {
    this.app = app;
    this.UserModel = connect.model('User', UserModel);

    this.run();
  }

  run() {
    this.app.post('/users/', (req, res) => {
      try {
        const userModel = new this.UserModel(req.body);

        userModel
          .save()
          .then((user) => {
            res.status(200).json({
              message: `${user.email} created !`
            });
            console.log(`${user.email} created !`);
        }).catch((err) => {
          console.error(`post:users -> ${err}`);
          res.status(400).json({
            message: `post:users -> ${err}`,
          });
        });
      } catch (err) {
        console.error(`[ERROR] post:users -> ${err}`)

        res.status(400).json({
          code: 400,
          message: 'Bad Request'
        });
      }
    });

    this.app.get('/users/id', ({ params }, res) => {
      try {
        const userModel = new this.UserModel(params.body);

        userModel
          .findOne({ 
            _id : params.id 
          })
          .then((user) => {
            res.status(200).json({
              getUserById: `${user}`,
            });
        }).catch((err) => {
            res.status(400).json({
            message: `post:users -> ${err}`,
          });
        });
      } catch (err) {
        res.status(400).json({
          code: 400,
          message: 'Bad Request'
        });
      }
    });
  }
    
}