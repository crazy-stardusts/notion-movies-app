class NotionMovieProperties {
    constructor({title, rating, dateWatched, watched, comment}) {
        this.properties = {};
        this.title(title);
        this.rating(rating);
        this.dateWatched(dateWatched);
        this.watched(watched);
        this.comment(comment);
    }

    title(title) {
        if(!title) return this;
        this.properties["Title"] = {
            title: [
                {
                    text: {
                        content: title,
                    },
                },
            ],
        };
        return this;
    }

    rating(rating) {
        if(!rating) return this;
        this.properties["Rating"] = {
            select: {
                name: rating.toString(),
            },
        };
        return this;
    }

    dateWatched(dateWatched) {
        if(!dateWatched) return this;
        this.properties["Date Watched"] = {
            date: {
                start: dateWatched,
            },
        };
    }

    watched(watched) {
        if(!watched) return this;
        this.properties["Watched"] = {
            checkbox : watched
        }
    }

    comment(comment) {
        if(!comment) return this;
        this.properties["Comment"] = {
            rich_text: [
                {
                    text: {
                        content: comment,
                    },
                },
            ],
        };
    }
}

module.exports = NotionMovieProperties;
