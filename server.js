const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port =  3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Tpye, Accept');
  next();
});

const mysql = require('mysql2')

app.get('/', (req, res) => {
  res.sendFile( __dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'devopsapp',
  password: '644529taha'
});



app.post("/home", (req, res) => {
  // Kullanıcı adı ve şifreyi al
  const username = req.body.username;
  const password = req.body.password;

  // Veritabanında kullanıcıyı bul
  connection.query(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.length === 0) {
      res.status(401).send("Kullanıcı adı veya şifre hatalı.");
    } else {
      res.sendFile( __dirname + '/home.html');
    }
  });
});

// Kayıt işlemi
app.post("/login", (req, res) => {
  // Kullanıcı adı ve şifreyi al
  const username = req.body.username;
  const password = req.body.password;

  // Veritabanına kayıt ekle
  connection.query(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendFile( __dirname + '/login.html');
    }
  });
});

