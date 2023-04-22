const { Client } = require("@notionhq/client");
const catchAsync = require("../error/catchAsync");
const AppError = require("../error/appError");
const NotionMovieProperties = require("../utils/notionMoviePropertiesBuilder");

const client = new Client({
    auth: process.env.NOTION_TOKEN,
});

const databaseID = process.env.DATABASE_ID;

exports.getMovies = catchAsync(async (req, res, next) => {

    if(!req.query.pageSize) req.query.pageSize = 20;
    if(req.query.pageSize > 20) return next(new AppError('Page size cannot be greater than 1000', 400))

    const pages = await client.databases.query({
        database_id: databaseID,
        page_size : parseInt(req.query.pageSize),
        start_cursor : req.query.startPageId,
        filter : {
            checkbox : {
                equals : req.query.watched == "true"
            },
            property : "Watched"
        }
    });

    let response = {
        next_cursor : pages.next_cursor,
        has_more : pages.has_more,
        movies : []
    }

    for(let page of pages.results) {
        response.movies.push({
            id : page.id,
            title : page.properties.Title.title[0]?.text?.content,
            rating : page.properties.Rating.select?.name,
            watched : page.properties.Watched.checkbox,
            dateWatched : page.properties['Date Watched']?.date?.start,
            comment : page.properties.Comment.rich_text[0]?.text?.content
        });
    }

    res.status(200).json(response);
});

exports.createMovie = catchAsync(async (req, res, next) => {
    if(!req.body.title) return next(new AppError('Movie title is required', 400));
    const page = await client.pages.create({
        parent: {
            database_id: databaseID,
        },
        properties: new NotionMovieProperties({...req.body}).properties,
    });
    res.status(201).json(page);
});
