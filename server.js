/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: ____Huijin Zheng________ Student ID: _109363176________ Date: ___9/16/2022________
*  Cyclic Link: __https://coral-trout-garb.cyclic.app_____________________________________________________________
*
********************************************************************************/ 

// Setup
const express = require('express');
const cors = require('cors');
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();
require('dotenv').config();
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());


// ROUTES Deliver the app's home page to browser clients
app.get('/', (req, res) => {
  res.json({ message: 'API Listening' });
});

// Add new
app.post('/api/movies', async(req, res) => {
  await db.addNewMovie(req.body);
  res.json({message: `New movie added`});  
});

// Get all
app.get('/api/movies', async(req, res) => {
  const data = await db.getAllMovies();
  res.json(data);
});

// Get one
app.get('/api/movies/:id', async(req,res) => {
  try {
    const data = await db.getMovieById(req.params.id);
    res.json(data);
  } catch(err) {
    res.status(400).json({message: err});
  }
});

// Edit existing
app.put('/api/movies/:id', async(req, res) => {
  try {
    await db.updateMovieById(req.params.id, req.body);
    res.json({message: "Movie updated"});
  } catch {
    res.status(400).json({message: err});
  }
});

// Delete item
app.delete('/api/movies/:id', async(req, res) => {
  try {
    await db.deleteMovieById(req.params.id);
    res.json({message: "Movie deleted"});
  } catch(err) {
    res.status(404).json({message: err});
  }
});


// Resource not found (this should be at the end)
app.use((req, res) => {
  res.status(404).json({message: "404 - Resource not found"});
});


// "Initializing" the Module & start the server
db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
  app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
  });
  }).catch((err)=>{
    console.log(err);
  });