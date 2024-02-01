import app from './app'
import request from 'supertest'

request.

describe('GET', () => {
    it('should return 200 OK for /', async () => {
        const server = request(app)
        server.get('/').expect(200).end((err) => { if (err) throw err })
    })

    it('should return 200 OK and a specific response for /goodbye', async () => {
        const server = request(app)
        server.get('/goodbye').expect(200).expect('buh bye!').end((err) => { if (err) throw err })
    })

    it('should return 404 Not Found for /notfound', async () => {
        const server = request(app)
        server.get('/notfound').expect(404).end((err) => { if (err) throw err })
    })
})

describe('POST', () => {
    it('should return 200 for /', async () => {
        const server = request(app)
        const res = await server.post('/')
        expect(res.status).toBe(200)
    })
})