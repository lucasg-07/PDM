const express = require('express')
const app = express()

app.listen(3000,()=>{
  console.log("Servidor executando na porta 3000")
})

app.get('/',(req,res)=>{
    res.send("RafaHell")
})
app.get('/v2/:name',(req,res)=>{
    res.send("Relou " +     req.params.name)
})
app.get('/v3/us/:name',(req,res)=>{
    res.json({msg: "Relou, mai dier, " +     req.params.name,
        return:"valid"})
})

app.get('/v3/pt-br/:name',(req,res)=>{
    res.json({msg: "Opa, eae, " +     req.params.name,
        return:"valid"})
})

app.get('/v3/es/:name',(req,res)=>{
    res.json({msg: "Hola, amiguito " +     req.params.name,
        return:"valid"})
})
app.get('/*',(req,res)=>{
    res.json({return:"invalid"})
})
