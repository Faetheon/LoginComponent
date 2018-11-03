const express = require('express');
const cookieParser = require('cookie-parser');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('recommended_products', 'nathan', 'student', {
  host: 'localhost',
  dialect: 'postgres'
});

const app = express();
const PORT = 3001;

app.use(express.static(__dirname + '/../react-client/dist'));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cookieParser());

app.get('/products', (req, res) => {
  sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database: ', err);
      res.status(500).send();
    });
    sequelize.query('SELECT * FROM products ORDER BY id', {type: sequelize.QueryTypes.SELECT})
    .then(data => {
      res.status(200).send(JSON.stringify(data));
    })
    .catch(err => {
      if (err) throw err;
    });
});

app.get('/signup/:username/:user_email/:password', (req, res) => {
  sequelize.query(`SELECT username FROM users WHERE username='${req.params.username}'`)
    .then((data) => {
      if (data[0].length) {
        if (data[0][0].username === req.params.username) {
          res.status(200).send({isLoggedIn: false, message: 'User already exists!'});
        }
      } else {
        sequelize.query(`INSERT INTO users (username, user_email, password) VALUES ('${req.params.username}', '${req.params.user_email}', '${req.params.password}');`)
          .then(() => {
            res.cookie(req.params.username, true);
            res.status(201).send({isLoggedIn: true, message: 'Welcome!'});
          })
          .catch((err) => {
            if (err) {
              res.status(500).send();
              throw err;
            }
          });
      }
    })
    .catch((err) => {
      if (err) {
        res.status(500).send();
        throw err;
      }
    });
});

app.get('/login/:username/:password', (req, res) => {
  let params = req.params;
  if (req.cookies[params.username]) {
    res.status(200).send({isLoggedIn: true, message: 'Welcome back!'});
  } else {
    sequelize.query(`SELECT username, password FROM users WHERE username='${params.username}'`)
      .then((data) => {
        console.log(data[0].length);
        if (data[0].length) {
          if (data[0][0].username !== params.username || data[0][0].password !== params.password) {
            res.status(200).send({isLoggedIn: false, message: 'Incorrrect username or password!'});
          } else {
            res.status(200).send({isLoggedIn: true, message: 'Welcome back!'});
          }
        } else {
          res.status(200).send({isLoggedIn: false, message: 'User does not exist.'});
        }
      })
      .catch((err) => {
        if (err) {
          res.status(500).send();
          throw err;
        }
      });
  }
});

app.get('/logout/:username', (req, res) => {
  res.clearCookie(req.params.username);
  res.status(200).send({isLoggedIn: false, message: 'See you later!'});
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});