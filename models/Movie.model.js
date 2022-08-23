const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const MovieSchema = {
    title: String,
    director: String,
    stars: Array,
    image: String,
    description:String, 
    showtimes: Array,
}

module.exports = model('Movie', MovieSchema)