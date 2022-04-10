const InMemoryDB = require('mongodb-memory-server').MongoMemoryServer
const mongod = new InMemoryDB()
async function spinDb () {
  const uri = await mongod.getUri()
  const port = await mongod.getPort()
  const dbPath = await mongod.getDbPath()
  const name = await mongod.getDbName()
  return {
    location: uri,
    port,
    dbPath,
    dbName: name
  }
}
module.exports = spinDb
