const express = require('express')
const app = express()

app.use(express.json())

let db = [
    {
        id : 1,
        titulo : "O pequeno Príncipe",
        editora : "Marrom bombom",
        ano : 2023,
        quant : 50,
        preco : 42.6
    },
    {
        id : 2,
        titulo : "Jonas, o homem das cavernas",
        editora : "Lindones",
        ano : 2021,
        quant : 43,
        preco : 49.9
    },
    {
        id : 3,
        titulo : "O pequeno grandissimo",
        editora : "Longa",
        ano : 2012,
        quant : 0,
        preco : 120.9
    },
    {
        id : 4,
        titulo : "A historia da volta que nao veio",
        editora : "Marrom bombom",
        ano : 2009,
        quant : 2,
        preco : 12.9
    }
]


app.get("/book",(req,res)=>{
    res.json(db)
})

app.get("/book/:id", (req,res)=>{
    const id = parseInt(req.params.id)
    const book = db.find(b => b.id === id)
    res.json(book)
})

// Buscar por editora 

app.get("/editoras/:edit",(req,res)=>{
    const editora = req.params.edit.toLowerCase()
    const livroEdit = db.filter(b => b.editora.toLowerCase().includes(editora))
    res.json(livroEdit)
})
// Busca por palavra chave

app.get("/titulo/:key",(req,res)=>{
    const palavra = req.params.key.toLowerCase()
    const tituloPal = db.filter(b => b.titulo.toLowerCase().includes(palavra))
    res.json(tituloPal)
})

// Busca por preço maior que

app.get("/precoMaior/:price",(req,res)=>{
    const preco = parseInt(req.params.price)
    const precoMaior = db.filter(b => b.preco > preco)
    res.json(precoMaior)
})
// Busca por preço menor que

app.get("/precoMenor/:price",(req,res)=>{
    const preco = parseInt(req.params.price)
    const precoMenor = db.filter(b => b.preco < preco)
    res.json(precoMenor)
})

// Busca por livros mais antigos
app.get("/maisAntigos",(req,res)=>{
    const anoMaisAntigo = Math.min(...db.map(b => b.ano))
    const maisAntigos = db.filter(b => b.ano === anoMaisAntigo )
    res.json(maisAntigos)
})
// Busca por livros mais recentes
app.get("/maisRecentes",(req,res)=>{
    const anoMaisRecente =  Math.max(...db.map(b => b.ano))
    const maisRecente = db.filter(b => b.ano === anoMaisRecente)
    res.json(maisRecente)
})
app.get("/semEstoque",(req,res)=>{
    const semEstoque = db.filter(b => b.quant === 0)
    res.json(semEstoque)
})

app.use((req, res, next) => {
    res.status(404).json({
        error: "Endpoint não encontrado. Verifique a URL e tente novamente."
    });
});

app.post("/book",(req,res)=>{
    lastId = Math.max(...db.map(b => b.id))
    const user = {
        id : ++lastId,
        titulo : req.body.titulo,
        editora : req.body.editora,
        ano : req.body.ano,
        quant : req.body.quant,
        preco : req.body.preco
    }
    db.push(user)
    res.json(db)
})

app.delete("/book/:id", (req,res)=>{
    db = db.filter(b => b.id !== parseInt(req.params.id))
    res.send(db)
})

app.put("/book/:id", (req,res)=>{
    const index = db.findIndex(b => b.id === parseInt(req.params.id))
    db[index] = {
        id : req.params.id,
        titulo : req.body.titulo,
        editora : req.body.editora,
        ano : req.body.ano,
        quant : req.body.quant,
        preco : req.body.preco
    }
    res.json(db)
})

app.listen(3000,()=>{
    console.log("Aplication running on localhost:3000")
})