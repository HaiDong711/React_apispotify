import React from 'react';
import MusicPlayer from './components/MusicPlayer';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify Playlist Player</h1>
      </header>
      <main>
        <MusicPlayer />
      </main>
    </div>
  );
};

export default App;
