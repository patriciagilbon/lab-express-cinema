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

module.exports = router;
