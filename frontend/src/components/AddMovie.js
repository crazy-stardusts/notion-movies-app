import React, { useState } from "react";

function AddMovie({toggle}) {
    const [title, setTitle] = useState("");
    const [watched, setWatched] = useState(false);
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState("");
    const [dateWatched, setDateWatched] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/movie", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    rating,
                    comment,
                    dateWatched,
                    watched,
                }),
            });
        } catch (error) {
            console.error(error);
        }
        toggle(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="watched">
                    <input
                        type="checkbox"
                        id="watched"
                        checked={watched}
                        onChange={(event) => setWatched(event.target.checked)}
                    />
                    Watched
                </label>
            </div>
            {watched && (
                <>
                    <div>
                        <label htmlFor="rating">Rating:</label>
                        <input
                            type="number"
                            id="rating"
                            min={1}
                            max={5}
                            value={rating}
                            onChange={(event) => setRating(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="comment">Comment:</label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="dateWatched">Date Watched:</label>
                        <input
                            type="date"
                            id="dateWatched"
                            value={dateWatched}
                            onChange={(event) =>
                                setDateWatched(event.target.value)
                            }
                        />
                    </div>
                </>
            )}
            <button type="submit">Submit</button>
        </form>
    );
}

export default AddMovie;
