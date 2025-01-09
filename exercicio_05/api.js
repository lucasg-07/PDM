const express = require('express')
const app = express()
app.use(express.json());

let db = [
    {
        id : 1,
        firstName: "Joao",
        lastName : "Silva",
        email : "joaosilva@gmail.com"
    },
    {
        id : 2,
        firstName: "Augusto",
        lastName : "Souza",
        email : "augsouza@gmail.com"
    },
    {
        id : 3,
        firstName: "Alberto",
        lastName : "Sampaio",
        email : "albsamp@gmail.com"
    }
]

app.get("/users",(req,res)=>{
    res.json(db)
})

app.get("/user/:id",(req,res)=>{
    user = db.find(u=> u.id === parseInt(req.params.id))
    res.json(user)
})
app.post("/users", (req,res)=>{
    lastId = Math.max(...db.map(u => u.id))
    if(lastId === null){
        lastId = 1
    }
    user = {
        id : ++lastId,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email
    }

    db.push(user)
    res.json(db)
})

app.delete("/user/:id", (req, res) => {
    db = db.filter(u => u.id !== parseInt(req.params.id));
    res.json(db);
});

app.put("users/:id", (req,res)=>{
    const index = db.findIndex(u => u.id === parseInt(req.params.id))
    db[index] = {
        id: req.params.id,
        firstName : req.body.fName,
        lastName : req.body.lName,
        email : req.body.e
    }
})

app.listen(3000,()=>{
    console.log("listening on port 3000")
})

