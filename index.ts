import express from 'express'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import dotenv from 'dotenv'
import session from 'express-session'
import cors from 'cors'
import { routes } from './routes'

declare module 'express-session' {
  interface Session {
    _id: string
  }
}

dotenv.config()

const {
  PORT = 5000,
  MONGO_URI,
  CO0KIE_SECRET,
  NODE_ENV = 'production',
} = process.env

const app = express()


async function start() {
  try {
    await mongoose.connect(MONGO_URI || '', {
      dbName: 'heritage-be',
    })

    if (NODE_ENV === 'development') {
      app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
      }))
    }

    app.use(session({
      resave: true,
      saveUninitialized: false,
      secret: CO0KIE_SECRET || '',
      cookie: {
        secure: NODE_ENV === 'production',
        maxAge: 3600000,
      },
      store: MongoStore.create({
        dbName: 'heritage-be',
        collectionName: 'sessions',
        mongoUrl: MONGO_URI,
      }),
    }))

    app.use(express.json())
    app.use(routes)

    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
