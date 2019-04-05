const express = require("express");
const app = express();
const router = express.Router();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const withAuth = require('./middleware');
const User = require("./data/data")
const db = require("./data/database")

const secret=process.env.SECRET || db.secret

const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")


// registers a user
router.post('/register', function(req, res) {
    var userData= {name:req.body.name, age:parseInt(req.body.age), email: req.body.email, phone: req.body.phone, password: req.body.password, role:
    parseInt(req.body.role)}
    const user = new User(userData);
    user.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send("OK");
    }
  });
});



router.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});



router.post('/authenticate', function(req, res) {
  password=req.body.password
  email=req.body.email
  const user={email: email, password: password};
  User.findOne({email: email}, function(err, user) {
    if (err) {
      res.status(500).json({error: 'Internal error please try again'});
    } else if (!user) {
      res.status(401).json({  error: 'Incorrect email or password'});
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json({  error: 'Internal error please try again'});
        } else if (!same) {
          res.status(401).json({ error: 'Incorrect email or password'});
        } else {
          // Issue token
          const payload = {id: user.id, name: user.name, age: user.age, email: user.email, phone: user.phone, password: user.password, role: user.role};
          const token = jwt.sign(payload, secret, {expiresIn: '1h'})
          res.cookie('token', token, { httpOnly: true }).send(token);
        }
      });
    }
  });
});

router.post('/setToken', function(req, res) {
  console.log(req.body['name'])
  const payload = {id: req.body['_id'],  name: req.body['name'], age: req.body['age'],  email: req.body['email'],  phone: req.body['phone'],  password: req.body['password'],  role: req.body['role']}
  const token = jwt.sign(payload, secret, {  expiresIn: '1h'})
  res.cookie('token', token, { httpOnly: true }).send(token);
});




router.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const payload = {  _id: user._id,first_name: user.first_name, last_name: user.last_name,  email: user.email  }
        let token = jwt.sign(payload, secret, {expiresIn: '1h'})
        res.send(token)
      } else {
        console.log("error")
        res.json({ error: "User does not exist" })
      }
    } else {
        console.log("error")
        res.json({ error: "User does not exist" })
    }
  }).catch(err => {
    res.send('error: ' + err)
  })
})

// gets all
router.get('/getPatients/', function (req, res) {
  User.find({ role: 0 }).then(user => {
    if (user) {
      res.json(user)
    } else {
      res.send("User does not exist")
    }
  }).catch(err => {
    res.send('error: ' + err)
  })
});

// finds one patient
router.get('/findPatient/', function (req, res) {
  User.findOne({ _id: req.query['id'] }).then(user => {
    if (user) {
      res.json(user)
    } else {
      res.send("User does not exist")
    }
  }).catch(err => {
    res.send('error: ' + err)
  })
});

// updates User with Information
router.post('/updateUser', function (req, res) {
  var myquery = { _id: req.body.params['id']};
  var data=req.body.params.data
  if(isNaN(data.age) || isNaN(data.age) || data.age<0|| String(data.phone).length!=10) {
    res.status(400).send(err)
  }

  var userData= {"name" :data.name, "email": data.email, "age": data.age, "phone": data.phone}
  var newvalues = { $set: userData};
  User.updateOne(myquery, newvalues).then((obj) => {
    res.status(200).json(obj)
  }).catch((err) => {
    console.log('Error: ' + err);
    res.status(400).send(err)
  })
});



module.exports = router
