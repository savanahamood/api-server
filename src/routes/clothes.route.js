'use strict';

const express = require('express');
const clothesRouter = express.Router();
const { Clothes } = require('../models/index');


clothesRouter.get("/clothes", getclothes);
clothesRouter.get("/clothes/:id", getoneclothe);
clothesRouter.post("/clothes", createclothe);
clothesRouter.put("/clothes/:id", updateclothe);
clothesRouter.delete("/clothes/:id", deleteclothe);


async function getclothes(req, res) {
    let clothesResult = await Clothes.findAll();
    res.status(200).json(clothesResult);
}

async function getoneclothe(req, res) {
    const clotheId = parseInt(req.params.id);
    let oneclothe = await Clothes.findOne({
        where: {
            id: clotheId
        }
    })
    res.status(200).json(oneclothe);
}

async function createclothe(req,res){
    let newclothe=req.body;
    let clotheRe=await Clothes.create(newclothe);
    res.status(201).json(clotheRe);
}

async function updateclothe(req,res){
    let clotheId = parseInt(req.params.id);
    let upclothe=req.body;
    let foundclothe=await Clothes.findOne({where: { id:clotheId }});
    let updatedclothe=await foundclothe.update(upclothe);
    res.status(201).json(updatedclothe);
}

async function deleteclothe(req,res){
    let clotheId = parseInt(req.params.id);
    let deleteclothe= await Clothes.destroy({where:{ id:clotheId } });
    res.status(204).json(deleteclothe);
}

module.exports=clothesRouter;