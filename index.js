const express = require('express')
const serverless = require('serverless-http')
const getDBClient = require('./db')
const characterSchema = require('./character.schema')

const DB_NAME = process.env.DB_NAME
const DB_HOST = process.env.DB_HOST
const DB_USER  = process.env.DB_USER
const DB_PASS  = process.env.DB_PASS
const CACERT   = process.env.CACERT

const bootstrap = async () => {
  const app = express()
  app.use(express.json())

  const dbClient = await getDBClient({
    DB_NAME,
    DB_HOST,
    DB_USER,
    DB_PASS,
    CACERT
  })

  const character = dbClient.model('Character', characterSchema)

  app.get('/api/characters', async (req, res) => {
    const result = await character.find().exec()
    res.json(result);
  })

  app.get('/api/character', async (req, res) => {
    const id = req.query.id
    if (!id) {
      res.status(400).send('Incorrect id')
    }
    const result = await character.findById(id).exec()
    if (!result) {
      res.status(404).send('Character is not found')
    } else {
      res.json(result)
    }
  })

  app.post('/api/character', async (req, res) => {
    const data = req.body
    const newCharacter = await character.create(data)
    res.json(newCharacter);
  })

  return app
}

module.exports.handler = async (event, context) => {
  const app = await bootstrap();
  const handler = serverless(app)
  const result = await handler(event, context);
  return result;
};


