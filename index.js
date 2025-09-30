const express = require("express")
const mainRoute = require("./routes/mainRoute")
const cors = require("cors");

const app = express()
require("./db.connect")

app.use(express.json())
app.use(express.static("./public"))
app.use("/public", express.static("./public"))
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use("/api", mainRoute)

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})