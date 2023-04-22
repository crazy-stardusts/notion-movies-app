import React, { useState } from 'react';

function Imdb() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/api/search?title=${query}`)
      .then(response => response.json())
      .then(data => setMovies(data));
  };

  return (
    <div>
    
    <form onSubmit={handleSubmit}>
    <label>
      Search for movies:
      <input type="text" value={query} onChange={handleChange} />
    </label>
    <button type="submit">Search</button>
  </form>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Year</th>
          <th>Title Type</th>
        </tr>
      </thead>
      <tbody>
        {movies.map(movie => (
          <tr key={movie.title}>
            <td>{movie.title}</td>
            <td>{movie.year}</td>
            <td>{movie.titleType}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </ div>
  );
}

export default Imdb;
