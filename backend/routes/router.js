const express = require('express');
const {createMovie, getMovies } = require('../controller/notion');
const { searchMovies } = require('../controller/imdb');
const router = express.Router()

router.route('/movie').get(getMovies).post(createMovie);
router.route('/search').get(searchMovies)

module.exports = router;