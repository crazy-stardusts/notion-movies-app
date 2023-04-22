import { useState } from 'react';
import './App.css';
import Imdb from './components/Imdb';
import MyCollection from './components/MyCollection';
import AddMovie from './components/AddMovie';

function App() {
  const [mode, setMode] = useState(true);
  const [addMovieToggle, setAddMovieToggle] = useState(false)

  return (
    <div className="App">

      {mode && <button onClick={() => setMode(false)}>Go to search</button>}
      {mode && !addMovieToggle && <button onClick={() => setAddMovieToggle(true)}> Add Movie </button>}
      {mode && !addMovieToggle && <MyCollection />}
      {mode && addMovieToggle && <AddMovie toggle = {setAddMovieToggle}/>}


      {!mode && <button onClick={() => setMode(true)}>Go to my collection</button>}
      {!mode && <Imdb />}

    </div>
  );
}

export default App;
