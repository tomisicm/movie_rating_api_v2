import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import Joi from 'joi'

import { signup, signin, protect } from './utils/auth'

import { connect } from './utils/db'

import userRouter from './resources/user/user.router'
import listRouter from './resources/list/list.router'
import genreRouter from './resources/genre/genre.router'
import starRouter from './resources/star/star.router'
import movieRouter from './resources/movie/movie.router'
import commentRouter from './resources/comment/comment.router'
import ratingRouter from './resources/rating/rating.router'
import messagesRouter from './resources/message/message.router'

Joi.objectId = require('joi-objectid')(Joi)

export const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/signup', signup)
app.post('/signin', signin)

// auth
app.use('/api', protect)

app.use('/api/user', userRouter)
app.use('/api/list', listRouter)
app.use('/api/genre', genreRouter)
app.use('/api/star', starRouter)
app.use('/api/movie', movieRouter)
app.use('/api/comment', commentRouter)
app.use('/api/rating', ratingRouter)
app.use('/api/messaging', messagesRouter)

io.on('connection', function(socket) {
  // user signed in
  socket.on('user_signedin_sucess', function(data) {
    console.log(' - - - Sucessfully logged in user with id', data)
    socket.join('/users')
  })

  socket.on('user_message', function(data) {
    console.log(' - - - message sent', data)
  })

  socket.on('disconnect', function() {
    // handle when user disconnects
  })
})

const start = async () => {
  try {
    await connect()
    server.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}

export { start, io }
