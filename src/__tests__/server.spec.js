import request from 'supertest'
import { app } from '../server'
import { User } from '../resources/user/user.model'
import { newToken } from '../utils/auth'
import mongoose from 'mongoose'

describe('API Authentication:', () => {
  let token
  beforeEach(async () => {
    const user = await User.create({
      name: 'nameisrequired',
      email: 'aaaa@hello.com',
      password: 'hellooooo'
    })
    token = newToken(user)
  })

  describe('api auth', () => {
    test('does not pass without JWT', async () => {
      let response = await request(app).get('/api/item')
      expect(response.statusCode).toBe(401)

      response = await request(app).get('/api/list')
      expect(response.statusCode).toBe(401)

      response = await request(app).get('/api/user')
      expect(response.statusCode).toBe(401)

      response = await request(app).get('/api/movie')
      expect(response.statusCode).toBe(401)

      response = await request(app).get('/api/genre')
      expect(response.statusCode).toBe(401)
    })

    // checking what if these appies have auth
    test('passes with JWT', async () => {
      const jwt = `Bearer ${token}`
      const id = mongoose.Types.ObjectId()
      const results = await Promise.all([
        request(app)
          .get('/api/thread')
          .set('Authorization', jwt),
        request(app)
          .get(`/api/thread/${id}`)
          .set('Authorization', jwt),
        request(app)
          .post('/api/thread')
          .set('Authorization', jwt),
        request(app)
          .put(`/api/thread/${id}`)
          .set('Authorization', jwt),
        request(app)
          .delete(`/api/thread/${id}`)
          .set('Authorization', jwt)
      ])

      results.forEach(res => expect(res.statusCode).not.toBe(401))
    })
  })
})
