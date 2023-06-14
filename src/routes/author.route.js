'use strict';

const express = require('express');
const authorRouter = express.Router();
const { AuthorsModel , BooksModel} = require('../models/index');


authorRouter.get("/authors", getauthors);
authorRouter.get("/authors/:id", getoneauthor);
authorRouter.post("/authors", createauthor);
authorRouter.put("/authors/:id", updateauthor);
authorRouter.delete("/authors/:id", deleteauthor);

authorRouter.get("/authorsBooks/:id", authorBooks);

async function authorBooks(req, res) {
    try{

        const authorId = parseInt(req.params.id);
        let customerOrdersResult = await AuthorsModel.readCustomerOrders(authorId,BooksModel.model);
        res.status(200).json(customerOrdersResult);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}




async function getauthors(req, res) {
    try{

        let authorsResult = await AuthorsModel.read();
        res.status(200).json(authorsResult);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

async function getoneauthor(req, res) {
    try{

        const authorId = parseInt(req.params.id);
        let oneauthor = await AuthorsModel.read(authorId)
        res.status(200).json(oneauthor);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function createauthor(req,res){
    try{

        let newauthor=req.body;
        let authorRe=await AuthorsModel.add(newauthor);
        res.status(201).json(authorRe);
    }catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateauthor(req,res){
    try{

        let authorId = parseInt(req.params.id);
        let upauthor=req.body;
        let foundauthor =await AuthorsModel.update(upauthor,authorId)
        // let foundauthor=await AuthorsModel.findOne({where: { id:authorId }});
        // let updatedauthor=await foundauthor.update(upauthor);
        res.status(201).json(foundauthor);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteauthor(req,res){
    try{

        let authorId = parseInt(req.params.id);
        let deleteeauthor= await AuthorsModel.delete(authorId);
        res.status(204).json(deleteeauthor);
    }catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports=authorRouter;