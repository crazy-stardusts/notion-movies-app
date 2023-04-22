import React, { useState, useEffect } from 'react';

function MyCollection() {
  const [data, setData] = useState([]);
  const [watched, setWatched] = useState(null);

  useEffect(() => {

    let url = 'http://localhost:8080/api/movie';
    if(watched != null) {
        url += '?watched=' + watched;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => console.log(error));
  }, [watched]);

  return (
    <div>
      <h1>My Collection</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Rating</th>
            <th>
                Watched
                <span>   </span>
                <select value = {watched} onChange={(e) => setWatched(e.target.value)}>
                    <option value = {null}> All </option>
                    <option value = {true}> Watched </option>
                    <option value = {false}> Not watched </option>
                </select>
            </th>
            <th>Date Watched</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {data.movies?.map(item => (
            <tr key={item.id}>
              <td>{item.title || '-'}</td>
              <td>{item.rating || '-'}</td>
              <td>{item.watched?.toString() || '-'}</td>
              <td>{item.dateWatched || '-'}</td>
              <td>{item.comment || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyCollection;
