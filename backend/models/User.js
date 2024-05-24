const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
    await client.connect();
    return client.db('hcet-missionx').collection('users');
}

module.exports = connect;