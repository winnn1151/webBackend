const express = require ('express')
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser')
const app = express ()
const cors = require('cors')
var db = new sqlite3.Database('my.db')

app.use(bodyParser())
app.use(cors())
app.get ('/', (req, res)=>{
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

app.post('/todo',(req,res)=>{
  db.run('INSERT INTO todolist(todo) VALUES(?)', [req.body.todo])
  res.end()
})

app.get('/todo', function (req, res, next) {
    db.all('SELECT * FROM todolist' , function (err,row){
        res.json(row)
      });
    });
  
app.delete('/todo/:id',function(req,res){
  db.run(`DELETE FROM todolist WHERE id=${req.params.id}`)
});

app.listen(3000)
