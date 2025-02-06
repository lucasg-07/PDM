class animalsDAO {
   
    static async getAnimals(client) {
        const cursor = await client
        .find()
        .project({_id:0}) //mudar aqui
        .sort({nome:1})
        .limit(10)
        try {
            return await cursor.toArray()
        } catch(err) {
            console.log(err)
        }
    }
    static async insertAnimal(client, doc) {
        try {
            return await client.insertOne(doc);
        } catch(err) {
            console.log(err)
        }
    }
    static async deleteAnimalByCad(client, cad) {
       
        try {
            return await client.deleteOne(cad)
        } catch(err) {
            console.log(err)
        }
    }

    static async updatePrecoByCad(client, cad, price) {
        try {
            return await client.updateOne(cad, price)
        } catch(err) {
            console.log(err)
        }
    }

    static async countDocuments(client) {
        try {
            return await client.countDocuments();
        } catch (err) {
            console.error(err);
            throw new Error('Erro ao contar documentos');
        }
    }
    
}



module.exports = animalsDAO