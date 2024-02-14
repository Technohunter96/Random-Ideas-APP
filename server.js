const express = require("express")
require("dotenv").config()
const port = process.env.PORT || 5000
const connectDB = require("./config/db")

connectDB()

const app = express()

// Body parser middleware
app.use(express.json()) // will allow us to send raw json to the server
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the RandomIdeas API" })
})

const ideasRouter = require("./routes/ideas")
app.use("/api/ideas", ideasRouter) // for this path in browser, take ideasRouter ("./routes/ideas")

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
