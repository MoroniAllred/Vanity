const express = require("express")
const pictursRouter = express.Router()
const Pictures = require("../modles/picture.js")

pictursRouter.get("/", (req, res, next) => {
    Pictures.find((err, pictures)=>{
        if(err){
            res.status(500);
            next(err);
        } else {
            res.status(200).send(pictures)
        }
    })

})
    pictursRouter.post("/", (req, res, next) => {
        const newPictures = new Pictures(req.body);
        newPictures.save((err, savedPicturs) => {
            if(err){
                res.status(500);
                next(err);
            }else{
                res.status(201).send(savedPicturs);
            }
        })
    })

    pictursRouter.put("/:_id", (req, res, next) => {
        Pictures.findOneAndUpdate(
            {_id: req.params._id},
            req.body,
            {new: true},
            (err, updatedPic) => {
                if(err){
                    res.status(500)
                    next(err)
                }else{
                    res.status(201).send(updatedPic)
                }
            }
        )
    })

    pictursRouter.delete("/:_id", (req, res, next) => {
        Pictures.findOneAndRemove({_id: req.params._id}, (err, deletedPic) => {
            if(err){
                res.status(500);
                next(err);
            }else{
                res.status(202).send({message: `you have deleted ${deletedPic.title}`, _id: deletedPic._id })
            }      
        })
    })


module.exports = pictursRouter