const express = require("express")
const adminRouter = express.Router()
const Admin = require("../modules/admin.js")
const jwt = require("jsonwebtoken") 

adminRouter.post("/signup", (req , res, next) =>{
    //check the DB to make sure the adim dosn't already exsist
    Admin.findOne({username: req.body.username}, (err, admin) => {
        if(err){
            res.sendStatus(500)
            return next(err)
        }
        
        // if on exists, send back an error
        if(admin){
            res.status(400)
            return next(new Error("this username is already taken."))
        }
    })
    //if it dosn't, create the user and the token, send both back
    const newAdmin = new Admin(req.body)
    newAdmin.save((err, savedAdmin) => {
        if(err){
            res.status(500)
            return next(err)
        }
        const token = jwt.sign(savedAdmin.withoutPassword(), process.env.SECRET)
        return res.status(201).send({admin: savedAdmin.withoutPassword(), token})
    })
})

adminRouter.post("/login", (req, res, next) => {
    Admin.findOne({username: req.body.username.toLowerCase()}, (err, admin) =>{
        if(err){
            res.status(500)
            return next(err)
        }
        if(!admin){
            res.status(401)
            return next(new Error("Username or Password is incorect!"))
        }
        admin.checkPassword(req.body.password, (err, isMatch) => {
            if(err){
                res.status(401)
                return next(err)
            }
            if(!isMatch){
                res.status(401)
                return next(new Error("Username or Password is incorect!"))
            }
            const token = jwt.sign(admin.withoutPassword(), process.env.SECRET)
            return res.status(201).send({admin: admin.withoutPassword(), token})
        })
    })
})
module.exports = adminRouter