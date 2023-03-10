import express from 'express'
import lifecycle from './middleware/lifecycle.js'
import champRouter from '../routes/champions.js'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
app.use(express.json())

app.use(cors())

app.use(lifecycle({
  async setup() {
    console.log('Before handler')
    // Put your database connection here. e.g.
    //@ts-ignore
    await mongoose.connect(process.env.DATABASE_URL)
  },
  async cleanup() {
    console.log('After handler')
    // Put your database disconnection here. e.g.
    await mongoose.disconnect()
  }
}))

app.use('/api', champRouter)

// Feel free to use a router and move this elsewhere.
// app.get('/api', async (req, res) => {
//   console.log(process.env.DATABASE_URL)
//   res.json({ message: 'Hello World' })
// })

// Don't use app.listen. Instead export app.
export default app



// Feel free to use a router and move this elsewhere.
// app.get('/api', async (req, res) => {
//   await Todo.insertMany([{ text: (new Date()).toISOString() }])
//   const todos = await Todo.find()
//   console.log(process.env.DATABASE_URL)
//   res.json({ message: 'Hello World', todos })
// })
