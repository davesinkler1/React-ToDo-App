const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    todo_id_1: Number,
    todo: String
});

async function todo() {
    try {
        const dataset = await todoSchema.find().toArray();
        return JSON.stringify(dataset);
    }
    catch {
        console.log("db closed");
        await client.close();
    }
}

module.exports = mongoose.model('todos', todoSchema)
