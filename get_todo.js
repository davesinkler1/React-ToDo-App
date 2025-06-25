const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://jaudanafzal61:admin@cluster0.4xt6dca.mongodb.net/login_assignment?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);
client.connect();


async function todo() {
    try {
        const dataset = await client.db('login_assignment').collection('tododatas').find().toArray();
        return JSON.stringify(dataset);
    }
    catch {
        console.log("db closed");
        await client.close();
    }
}

module.exports = {todo}