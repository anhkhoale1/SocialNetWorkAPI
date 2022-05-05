const UserModel = require('../models/user.js');

module.exports = class Users {
  constructor(app, connect) {
    this.app = app;
    this.UserModel = connect.model('User', UserModel);

    this.run();
  }

  create() {
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
          message: 'Bad request to add an user'
        });
      }
    });
  }

  getUser() {
    this.app.get('/user/:id', (req, res) => {
      try {
        this.UserModel
          .findById(req.params.id)
          .then((user) => {
            res.status(200).json(user);
        }).catch((err) => {
            res.status(400).json({
            message: `get:user -> ${err}`,
          });
        });
      } catch (err) {
        res.status(400).json({
          code: 400,
          message: 'Bad request to find a user'
        });
      }
    });
  }

  delete() {
    this.app.delete('/user/:id', (req, res) => {
      try {
        this.UserModel.findOneAndDelete(req.params.id).then((user) => {
          res.status(200).json({message: `user with id ${user.id} is deleted`})
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] delete:user/:id -> ${err}`)

        res.status(500).json({
          status: 500,
          message: 'Internal Server Error'
        })
      }
    })
  }

  update() {
    this.app.put('/user/:id', (req, res) => {
      try {
        const options = { new: true, runValidators: true };

        this.UserModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          options
        ).then((userUpdated) => {
          res.status(200).json(userUpdated || {})
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] update:user/:id -> ${err}`)

        res.status(500).json({
          status: 500,
          message: 'Internal Server Error'
        })
      }
    })
  }

  run() {
    this.create();
    this.getUser();
    this.delete();
    this.update();
  } 
}