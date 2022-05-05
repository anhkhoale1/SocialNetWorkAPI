const GroupModel = require('../models/group.js');
const multer  = require('multer');
const UserModel = require('../models/user.js');
const upload = multer({ dest: 'images/' });
const axios = require('axios').default;

module.exports = class Groups {
  constructor(app, connect) {
    this.app = app;
    this.GroupModel = connect.model('Group', GroupModel);
    this.UserModel = connect.model('User', UserModel);
    this.run();
  }

  image() {
    this.app.post('/image/', (req, res) => {
      try {
        Image
      }catch{

      }
    })
  }

  create() {
    this.app.post('/groups/', async (req, res) => {
      try {
        //check if user exists
        for (let i = 0; i < Object.keys(req.body.users).length; i++) {
          const id = req.body.users[i];
          await axios.get(`http://localhost:3000/user/${id}`)
          .catch(() => 
            req.body.users.splice(i, 1)
          )
        }
        //check if admin exists
        for (let i = 0; i < Object.keys(req.body.admin).length; i++) {
          const id = req.body.admin[i];
          await axios.get(`http://localhost:3000/user/${id}`)
          .catch(() => 
            req.body.admin.splice(i, 1)
          )
        }

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

  delete() {
    this.app.delete('/group/:id', (req, res) => {
      try {
        this.GroupModel.findOneAndDelete(req.params.id).then((group) => {
          res.status(200).json({message: `group with id ${group.id} is deleted`})
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] delete:group/:id -> ${err}`)

        res.status(500).json({
          status: 500,
          message: 'Internal Server Error'
        })
      }
    })
  }

  update() {
    this.app.put('/group/:id', (req, res) => {
      try {
        const options = { new: true, runValidators: true };

        this.GroupModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          options
        ).then((groupUpdated) => {
          res.status(200).json(groupUpdated || {})
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] update:group/:id -> ${err}`)

        res.status(500).json({
          status: 500,
          message: 'Internal Server Error'
        })
      }
    })
  }

  get() {
    this.app.get('/group/:id', (req, res) => {
      try {
        this.GroupModel
          .findById(req.params.id)
          .then((group) => {
            res.status(200).json(group);
        }).catch((err) => {
            res.status(400).json({
            message: `get:group -> ${err}`,
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
    this.delete();
    this.update();
  }
}