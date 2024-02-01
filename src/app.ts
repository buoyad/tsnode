import express from 'express'

// TODO: jest types are ambient here. don't want them here!

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/goodbye', (req, res) => {
    res.send('buh bye!')
})

export default app