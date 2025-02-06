const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')
require('dotenv').config()
const uri = process.env.URI
const client = new MongoClient(uri)
const usersdb = client.db('proj_final').collection('users')
const animalsdb = client.db('proj_final').collection('animals')
const contactsDAO  = require('./userClass')
const animalsDAO  = require('./animalClass')

app.listen(3000, () => {
    console.log("Servidor rodando...")
})

app.get('/all', async (req, res) => {
    const docs = await contactsDAO.getUsers(usersdb)
    res.json(JSON.parse(JSON.stringify(docs, null, 2)))
})

app.get('/add/:n/:t/:e', async (req, res) => {
    const doc = {
        nome: req.params.n,
        telefone: req.params.t,
        email: req.params.e
    }
    const result = await contactsDAO.insertUser(usersdb, doc)
    res.json(result)
})

app.get('/del/:n', async (req, res) => {
    const name = {
        nome: req.params.n
    }
    const result = await contactsDAO.deleteUserByNome(usersdb, name)
    res.json(result)
})

app.get('/update/:e/:t', async (req, res) => {
    const old_email = {
        email: req.params.e
    }
    const new_tel = {
        $set : {telefone: req.params.t}
    }
    const result = await contactsDAO.updateTelefoneByEmail(usersdb, old_email, new_tel)
    res.json(result)
})

//Rotas para animais

app.get('/addAnimal/:n/:p/:d', async (req, res) => {
    const totalCars = await animalsDAO.countDocuments(animalsdb);

    const registrationNumber = `Animal-${new Date().getFullYear()}-${totalCars + 1}`;
    const doc = {
        nome: req.params.n,
        preco: req.params.p,
        desc: req.params.d,
        cad : registrationNumber
    }
    const result = await animalsDAO.insertAnimal(animalsdb, doc)
    res.json(result)
})

app.get('/allAnimal', async (req, res) => {
    const docs = await animalsDAO.getAnimals(animalsdb)
    res.json(JSON.parse(JSON.stringify(docs, null, 2)))
})


app.get('/delAnimal/:n', async (req, res) => {
    const name = {
        nome: req.params.n
    }
    const result = await animalsDAO.deleteAnimalByCad(animalsdb, name)
    res.json(result)
})

app.get('/updateAnimal/:cad/:n/:p/:d', async (req, res) => {
    const cad = {
        cad: req.params.cad
    }
    const new_tel = {
        $set : {telefone: req.params.n},
        $set : {telefone: req.params.p},
        $set : {telefone: req.params.d}
    }
    const result = await animalsDAO.updatePrecoByCad(animalsdb, cad, new_tel)
    res.json(result)
})