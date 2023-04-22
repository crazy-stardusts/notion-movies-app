const axios = require("axios");
const catchAsync = require('../error/catchAsync')

exports.searchMovies = catchAsync(async (req, res, next) => {

const options = {
  method: 'GET',
  url: 'https://imdb8.p.rapidapi.com/title/find',
  params: {q : req.query.title },
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
  }
};

let response = await axios.request(options);

let metaData = []
if(response.data.results) {
    for(let result of response.data.results){
        metaData.push({title : result.title, year : result.year, titleType : result.titleType})
    }
}
res.status(200).json(metaData)

});