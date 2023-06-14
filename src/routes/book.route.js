'use strict';

const express = require('express');
const bookRouter = express.Router();
const { BooksModel } = require('../models/index');


bookRouter.get("/books", getbooks);
bookRouter.get("/books/:id", getonebook);
bookRouter.post("/books", createbook);
bookRouter.put("/books/:id", updatebook);
bookRouter.delete("/books/:id", deletebook);


async function getbooks(req, res) {
    try{

        let booksResult = await BooksModel.read();
        res.status(200).json(booksResult);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

async function getonebook(req, res) {
    try{

        const bookId = parseInt(req.params.id);
        let onebook = await BooksModel.read(bookId)
        res.status(200).json(onebook);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function createbook(req,res){
    try{

        let newbook=req.body;
        let bookRe=await BooksModel.add(newbook);
        res.status(201).json(bookRe);
    }catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updatebook(req,res){
    try{

        let bookId = parseInt(req.params.id);
        let upbook=req.body;
        // let foundbook=await BooksModel.findOne({where: { id:bookId }});
        let updatedbook=await BooksModel.update(upbook,bookId);
        res.status(201).json(updatedbook);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deletebook(req,res){
    try{

        let bookId = parseInt(req.params.id);
        let deleteebook= await BooksModel.delete(bookId);
        res.status(204).json(deleteebook);
    }catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports=bookRouter;