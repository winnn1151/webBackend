const express = require ('express')
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser')
const app = express ()
const cors = require('cors')
const bcrypt = require('bcrypt');
var db = new sqlite3.Database('my.db')

app.use(bodyParser())
app.use(cors())

const auth = function(req, res, next){
  let username = req.headers.username
  let password = req.headers.password
  let sintaks = `SELECT * FROM userpass WHERE username="${username}"`
  let authorized = false
  db.all(sintaks, function(err, row){
      if(row.length && row[0].username == username){
          if(row.length && row[0].password == password){
                authorized = true
              }
      }
      if(authorized){
          next()
      }
      else{
          res.send(401)
      }
  })
}

app.get ('/', auth, (req, res)=>{
  res.send(
    `<html>
    <body>
      <form action="/todo" method="post">
          <input name="todo">
          <button>Add</button>
      </form>
    </body>
    </html>`
  )
})

app.post('/todo', auth, function (req,res) {
  db.run('INSERT INTO todolist(todo) VALUES(?)', [req.body.todo])
  res.end()
})

app.get('/todo', auth, function (req, res) {
    db.all('SELECT * FROM todolist' , function (err,row){
        res.json(row)
      });
    });
  
app.delete('/todo/:id', auth, function(req,res){
  db.run(`DELETE FROM todolist WHERE id=${req.params.id}`)
});

//---

app.get('/user', auth, function(req, res){
  db.all('SELECT * FROM userpass', function(err, row){
      res.json(row)
  })
})

app.post('/user', function(req, res, next){
  db.all('SELECT * FROM userpass', function(err, row){
      if(row.length){
          auth(req, res, next)
      }
      else{
          next()
      }
  })
} , 

  function(req, res){
  let username = req.body.username
  let password = req.body.password
  db.all(`SELECT * FROM userpass WHERE username="${username}"`, function(err, row){
    if(row.length){
        res.send('sudah ada')
    }
    else{
        db.run(`INSERT INTO userpass (username, password) VALUES ('${username}','${password}')`)
        res.end()
    }
  })
})

app.delete('/user/:id', auth, function(req, res){
  db.run(`DELETE FROM userpass WHERE id=${req.params.id}`)
  res.end()
})

app.listen(3000)
