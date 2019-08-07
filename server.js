const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const mongoose = require("mongoose")
const expressJwt = require("express-jwt")
const PORT = process.env.PORT || 7000

//midleware for every request
app.use(morgan("dev"))
app.use(express.json())

//DB connection
mongoose.connect("mongodb://localhost:27017/vanityDB", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => console.log("conected to db"))
    .catch(err => console.log(err))


    //routs
    app.use("api", expressJwt({secret: process.env.SECRET}))
    app.use("/admin", require("./routes/adiminRouter"))
    app.use("/pictures", require("./routes/pictursRouter.js"))


    //global error handler
    app.use((err, req, res, next) => {
        console.log(err)
        if(err.name === "UnauthorizedError"){
            res.status(err.status)
        }
        return res.send({errMsg: err.message})
    })


    //port conection
    app.listen(PORT, () => {
        console.log(`Sever is running on ${PORT}`)
    })