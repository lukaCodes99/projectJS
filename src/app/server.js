require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: "root",
  password: "root",
  database: "zavrsni"
});

    app.use(cors());

    app.use(express.json());

    app.use((req, res, next) => {
        console.log('Time: ', Date.now());
        next();
    });

    app.use('/request-type', (req, res, next) => {
        console.log('Request type: ', req.method);
        next();
    });


    app.get('/', (req, res) => {
        res.send('Successful response.');
    });


    app.listen(5000, () => console.log('Example app is listening on port 5000.'));

    app.post('/api/addVijest', (req, res) => {
      let post = { 
          idvijesti: req.body.idvijesti, 
          naslov: req.body.naslov, 
          text: req.body.text, 
          idkorisnik: req.body.idkorisnik, 
          idkategorija: req.body.idkategorija 
      };
      let sql = 'INSERT INTO vijesti SET ?, timestamp = NOW()';
      let query = db.query(sql, post, (err, result) => {
          if(err) throw err;
          console.log(result);
          res.json({ message: 'Post added...' }); 
      });
    });
     
    app.get('/api/vijesti', (req, res) => {
      let sql = 'SELECT * FROM vijesti';
      let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
      });
    });
     
    // app.get('/api/postsByUserId/:id', (req, res) => {
    //   let sql = `SELECT * FROM posts WHERE userId = ${req.params.id}`;
    //   let query = db.query(sql, (err, result) => {
    //     if(err) throw err;
    //     console.log(result);
    //     res.send(result);
    //   });
    // });
  
    app.get('/api/postsByKorisnikId/:id', (req, res) => {
      let sql = `SELECT * FROM vijesti WHERE korisnikid = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
      });
    });
     
    app.delete('/api/deletePost/:id', (req, res) => {
      let sql = `DELETE FROM vijesti WHERE idvijesti = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post deleted...');
      });
    });
     
    app.put('/api/updatePost/:id', (req, res) => {
      let sql = `UPDATE vijesti SET text = '${req.body.text}' WHERE idvijesti = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json({ message: 'Post updated...' });
      });
    });
     
    app.get('/api/getUsers', (req, res) => {
      let sql = `SELECT * FROM korisnici`;
      let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
      });
    });

    
     
    // app.post('/api/addUser', (req, res) => {
    //   let user = { username: req.body.username, password: req.body.password, name: req.body.name, email: req.body.email };
    //   let sql = 'INSERT INTO users SET ?';
    //   let query = db.query(sql, user, (err, result) => {
    //     if(err) throw err;
    //     console.log(result);
    //     res.send('User added...');
    //   });
    // });
  
    // app.post('/api/addUser', (req, res) => {
    //   let user = { username: req.body.username, password: req.body.password, email: req.body.email, role: "user" };
    //   let sql = 'INSERT INTO korisnici SET ?';
    //   let query = db.query(sql, user, (err, result) => {
    //     if(err) throw err;
    //     console.log(result);
    //     res.json({ message: 'User added...' }); // Changed this line
    //   });
    // });

    app.put('/api/changeUserRole', (req, res) => {
      let sql = 'UPDATE korisnici SET role = ? WHERE username = ?';
      let data = [req.body.role, req.body.username];
      let query = db.query(sql, data, (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error updating user role');
          return;
        }
        res.send(results);
      });
    });

    app.post('/api/addUser', (req, res) => {
        let sql = 'INSERT INTO korisnici SET ?';
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            let korisnik = { username: req.body.username, password: hash, email: req.body.email, role: "user"};
            let query = db.query(sql, korisnik, (error, results) => {
                if (error) {
                    console.error(error); // Log the error to the console
                    res.status(500).send('Ne radi addUser');
                    return;
                }
                res.send(results);
            });
        });
    });

    app.get('/api/authenticateUser', (req, res) => {
        let sql = 'SELECT * FROM korisnici where username = ?';
        let query = db.query(sql, [req.query.username], (error, results) => {
            if (error) {
                res.send(error);
                res.status(500).send('Ne radi authenticateUser');
                return;
            }
            if (results.length === 0) {
                res.send('Korisnik ne postoji');
                return;
            }
            bcrypt.compare(req.query.password, results[0].password, function(err, result) {
                if (result) {
                    res.send(results);
                } else {
                    res.send('Pogrešna lozinka');
                }
            });
        });
    });
     
    app.delete('/api/deleteKorisnik/:id', (req, res) => {
      let newTitle = 'Updated Title';
      let sql = `DELETE FROM korisnici WHERE idkorisnici = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('User deleted...');
      });
    });

    
     
    ///////////
    //////////
    app.get('/api/user/:id', (req, res) => {
      let sql = `SELECT * FROM korisnici WHERE idkorisnici = ${req.params.id}`;
      let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
      });
    });
  ///////////
  //////////////
  
  
    app.get('/api/addDummyUser', (req, res) => {
      let dummyUser = { 
         
        email: 'dummy@example.com', 
        name: 'Dummy User', 
        password: 'dummyPassword', 
        username: 'dummyUser' 
      };
      let sql = 'INSERT INTO users SET ?';
      let query = db.query(sql, dummyUser, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Dummy user added...');
      });
    });

    // Get all categories
  app.get('/api/categories', (req, res) => {
    let sql = 'SELECT * FROM kategorije';
    let query = db.query(sql, (error, results) => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.send(results);
    });
  });

  // Get a specific category by id
  app.get('/api/category/:id', (req, res) => {
    let sql = 'SELECT * FROM vijesti WHERE idkategorija = ? ORDER BY timestamp DESC';
    let query = db.query(sql, [req.params.id], (error, results) => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.send(results);
    });
  });

  // Get all news
  app.get('/api/news', (req, res) => {
    let sql = 'SELECT * FROM vijesti ORDER BY timestamp DESC';
    let query = db.query(sql, (error, results) => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.send(results);
    });
  });

  // Get a specific news by id
  app.get('/api/post/:id', (req, res) => {
    let sql = 'SELECT * FROM vijesti WHERE idvijesti = ?';
    let query = db.query(sql, [req.params.id], (error, results) => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.send(results);
    });
  });

  app.get('/api/commentsByPostId/:id', (req, res) => {
    let sql = `SELECT * FROM komentari WHERE idvijest = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send(result);
    });
  });

  app.post('/api/comments', (req, res) => {
    const comment = {
      text: req.body.text,
      idvijest: req.body.idvijest,
      idkorisnik: 2, // hardcoded user id
    };
  
    let sql = 'INSERT INTO komentari SET ?, timestamp = NOW()';
    let query = db.query(sql, comment, (err, result) => {
      if(err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      } else {
        console.log(result);
        res.status(201).json({ message: 'Comment added successfully' });
      }
    });
  });



  /*
  also if I click on a div where there is one news I want to get that news:
app.get('/api/news/:id', (req, res) => {
    let sql = 'SELECT * FROM vijesti WHERE idvijesti = ?';
    let query = db.query(sql, [req.params.id], (error, results) => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.send(results);
    });
  });

  all of that will
  */