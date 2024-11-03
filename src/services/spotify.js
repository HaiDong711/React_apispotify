import axios from 'axios';

const getAccessToken = async () => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = '6c23711e84224f8eacfed1b2ab304d45';
  const authToken = btoa(`${clientId}:${clientSecret}`);

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${authToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log("Access Token:", response.data.access_token); // kiểm tra token
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};

export const fetchPlaylistTracks = async (playlistId) => {
  const token = await getAccessToken();
  if (!token) {
    console.error("No access token available.");
    return [];
  }

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    return response.data.items;
  } catch (error) {
    console.error("Error fetching playlist tracks:", error);
    return [];
  }
};
