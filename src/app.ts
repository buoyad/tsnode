import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/goodbye', (req, res) => {
    res.send('buh bye!')
})

export default app