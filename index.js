const express = require("express")
const mainRoute = require("./routes/mainRoute")
const cors = require("cors");

const app = express()
require("./db.connect")

app.use(express.json())

app.use(cors({
    origin: "https://fashi-master-backend.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.static("./public"))
app.use("/public", express.static("./public"))


app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is working!" });
});

app.use("/api", mainRoute)

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})