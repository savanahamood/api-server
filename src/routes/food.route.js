const express = require('express');
const foodRouter = express.Router();
const { Food } = require('../models/index');


foodRouter.get("/food", getfoods);
foodRouter.get("/food/:id", getonefood);
foodRouter.post("/food", createfood);
foodRouter.put("/food/:id", updatefood);
foodRouter.delete("/food/:id", deletefood);


async function getfoods(req, res) {
    let foodResult = await Food.findAll();
    res.status(200).json(foodResult);
}

async function getonefood(req, res) {
    const foodId = parseInt(req.params.id);
    let onefood = await Food.findOne({
        where: {
            id: foodId
        }
    })
    res.status(200).json(onefood);
}

async function createfood(req,res){
    let newfood=req.body;
    let foodRe=await Food.create(newfood);
    res.status(201).json(foodRe);
}

async function updatefood(req,res){
    let foodId = parseInt(req.params.id);
    let upfood=req.body;
    let foundfood=await Food.findOne({where: { id:foodId }});
    let updatedfood=await foundfood.update(upfood);
    res.status(201).json(updatedfood);
}

async function deletefood(req,res){
    let foodId = parseInt(req.params.id);
    let deletefood= await Food.destroy({where:{ id:foodId } });
    res.status(204).json(deletefood);
}

module.exports=foodRouter;