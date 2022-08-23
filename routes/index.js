const express = require('express');
const Movie = require('../models/Movie.model.js'); 
const router = express.Router();


/* GET home page */
router.get('/', (req, res, next) => res.render('index'));

router.get('/movies', (req, res, next) => {
    Movie.find()
      .then(allTheBooksFromDB => {
        console.log('Retrieved books from DB:', allTheBooksFromDB);
        res.render('movies', { movies: allTheBooksFromDB }); // pass `allTheBooksFromDB` to the view (as `books`)
      })
      .catch(error => console.log('Error while getting the books from the DB: ', error));
  });

  router.get('/movies/:movieId', (req, res, next) =>{
    const {movieId} = req.params;

    Movie.findById(movieId)
    .then(TheMovie =>{
        console.log('The details were retrieved:', TheMovie);
        res.render('movie-detail', {movie: TheMovie});
    })
    .catch(err => console.log(`The details were not retrieved: ${err}`))
  })

  router.get('/create', (req, res, next) =>{
    res.render('movie-create');
  })

  router.post('/create', (req, res, next) =>{
    const {title, director, description, stars} = req.body;

    Movie.create({title, director, description, stars})
    .then(() => res.redirect('/movies'))
    .catch(error => `Error while creating a new book: ${error}`);
  })

  router.get('/movies/:id/edit', (req, res, next) =>{
    const {id} = req.params;
    console.log(id)
    Movie.findById(id)
    .then(MovieToEdit => {
        res.render('movie-edit', MovieToEdit);
        console.log(MovieToEdit)
    })
    .catch(err => console.log(`The details were not retrieved: ${err}`))
  })

  router.post('/movies/:id/edit', (req, res, next) =>{
    const {id} = req.params;
    const {title, director, description, stars} = req.body;

    Movie.findByIdAndUpdate(id, {title, director, description, stars}, { new: true })
    .then((UpdatedMovie) => res.redirect(`/movies/${UpdatedMovie._id}`))
    .catch(err => console.log(`The details were not retrieved: ${err}`))
  })

  router.get('/movies/:id/delete', (req, res, next) =>{
    const {id} = req.params;
    Movie.findByIdAndDelete(id)
    .then(() => res.redirect('/movies'))
    .catch(error => console.log(`The movie could not be deleted ${err}`))
  })
module.exports = router;
