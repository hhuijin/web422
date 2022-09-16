/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: ____Huijin Zheng________ Student ID: _109363176________ Date: ___9/16/2022____
*  Cyclic Link: __https://creepy-pig-scrubs.cyclic.app/__________________
*
********************************************************************************/ 
const express = require('express');
const cors = require('cors');
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();
require('dotenv').config();
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
  res.status(201).json({ message: 'API Listening' });
});



// Add new
app.post('/api/movies', (req, res) => {
  db.addNewMovie(req.body).then(()=>{
    res.status(201).json("Movie added");
  }).catch(()=>{
    res.status(500).json({message:"ERROR"});
  })
});

// Get all
app.get('/api/movies', (req, res) => {
  db.getAllMovies(req.query.page,req.query.perPage, req.query.title).then((data)=>{
    if(data.length === 0)
      res.status(204).json({message:"Data not found"});
    else
      res.status(201).json(data);
  })
  .catch((err)=>{
    res.status(500).json({message:err.message});
  });
});

// Get one
app.get('/api/movies/:_id', (req,res) => {
  db.getMovieById(req.params._id).then((data)=>{
    res.status(201).json(data);
  }).catch(()=>{
    res.status(500).json({message:"ERROR"});
  });
});

// Edit existing
app.put('/api/movies/:_id', (req, res) => {
    
    db.updateMovieById(req.body,req.params._id).then(()=>{
      res.status(201).json({message:"MOVIE UPDATED"});
    }).catch(()=>{
      res.status(500).json({message:ERROR});
    });
});

// Delete item
app.delete('/api/movies/:_id', (req, res) => {

    db.deleteMovieById(req.params._id).then(()=>{
      res.status(201).json({message: "Movie deleted"});
    })
    .catch(()=> {
    res.status(500).json({message: "ERROR"});
  });
});



//Initializing
db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
  app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
  });
  }).catch((err)=>{
    console.log(err);
  });