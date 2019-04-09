import { User } from '../user.model'
// import mongoose from 'mongoose'

describe('User model', () => {
  describe('schema', () => {
    test('Given that name field is missing, I am unable to create new User', async () => {
      /* this test is just for catching exception purposes. it is redundant. in this context */
      expect.assertions(1)
      try {
        await User.create({
          name: 'Djokica'
        })
      } catch (e) {
        expect(e).toBeTruthy()
      }
    })

    test('Unable to create two users with same name', async () => {
      expect.assertions(1)
      try {
        await User.createIndexes() // i should wait indexes to be built model.init() not working. Manually creating indexes.
        await User.create([
          {
            name: 'Djokica',
            email: 'sameemail@hello.com',
            password: 'asredfssdf'
          },
          {
            name: 'Djokica',
            email: 'sameemail@hello.com',
            password: '123asredfssdf'
          }
        ])
      } catch (e) {
        console.error(e)
        expect(e).toBeTruthy()
      }
    })

    test('User schema name properties', () => {
      const name = User.schema.obj.name
      expect(name).toEqual({
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50
      })
    })

    test('User schema email properties', () => {
      const email = User.schema.obj.email
      expect(email).toEqual({
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50
      })
    })

    test('User schema password properties', () => {
      const password = User.schema.obj.password
      expect(password).toEqual({
        type: String,
        required: true,
        minlength: 8,
        trim: true
      })
    })
  })
})
