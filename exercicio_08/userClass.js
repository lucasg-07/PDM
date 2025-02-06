class contactsDAO {
   
    static async getUsers(client) {
        const cursor = await client
        .find()
        .project({_id:0})
        .sort({nome:1})
        .limit(10)
        try {
            const results = await cursor.toArray()
            return results
        } catch(err) {
            console.log(err)
        }
    }
    static async insertUser(client, doc) {
        try {
            return await client.insertOne(doc);
        } catch (err) {
            console.error('Erro ao inserir usuário:', err);
            throw err;
        }
    }
    
    static async deleteUserByNome(client, nome) {
        const ok = await client
        .deleteOne(nome)
        try {
            return ok
        } catch(err) {
            console.log(err)
        }
    }

    static async updateTelefoneByEmail(client, olde, tel) {
        const docs = await client
        .updateOne(olde, tel)
        try {
            return docs
        } catch(err) {
            console.log(err)
        }
    }
}



module.exports = contactsDAO