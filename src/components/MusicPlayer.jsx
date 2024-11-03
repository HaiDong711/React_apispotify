import React, { useEffect, useState } from 'react';
import { fetchPlaylistTracks } from '../services/spotify';
import './MusicPlayer.css'; // Đảm bảo tạo file CSS này để thêm kiểu dáng

const MusicPlayer = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const getTracks = async () => {
      const playlistId = '54ZA9LXFvvFujmOVWXpHga';
      const fetchedTracks = await fetchPlaylistTracks(playlistId);
      setTracks(fetchedTracks);
    };
    getTracks();
  }, []);

  return (
    <div>
      <h2>Playlist</h2>
      {tracks.length === 0 ? (
        <p>No tracks available or failed to fetch data.</p>
      ) : (
        <ul>
          {tracks.map((item, index) => (
            <li key={index} className="track-item">
              <img
                src={item.track.album.images[0].url}
                alt={item.track.name}
                className="track-image"
              />
              <div className="track-info">
                <p><strong>{item.track.name}</strong> - {item.track.artists.map(artist => artist.name).join(', ')}</p>
                <audio controls>
                  <source src={item.track.preview_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MusicPlayer;
