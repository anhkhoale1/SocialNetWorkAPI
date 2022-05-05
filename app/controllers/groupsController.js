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
  };

  create() {
    this.app.post('/groups/', async (req, res) => {
      try {
        for (let i = 0; i < Object.keys(req.body.users.id).length; i++) {
          const id = req.body.users.id[i];
          await axios.get(`http://localhost:3000/user/${id}`)
          .catch(() => 
            req.body.users.id.splice(i, 1),
            console.error(`user with id ${id} doesnt exist, so he is removed from request`)
          )
        }
        for (let i = 0; i < Object.keys(req.body.admin.id).length; i++) {
          const id = req.body.admin.id[i];
          await axios.get(`http://localhost:3000/user/${id}`)
          .catch(() => 
            req.body.admin.id.splice(i, 1),
            console.error(`admin with id ${id} doesnt exist, so he is removed from request`)
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


  run() {
    this.create();

  }
}