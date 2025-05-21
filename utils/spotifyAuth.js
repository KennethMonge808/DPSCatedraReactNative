// utils/spotifyAuth.js
import axios from 'axios';

const CLIENT_ID = '4d92e174a272492c80e24c1069dda8b4';
const CLIENT_SECRET = '3a255733bce24cc4af2a9896bcc3b22c';

export const getAccessToken = async () => {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    new URLSearchParams({ grant_type: 'client_credentials' }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
      },
    }
  );
  return response.data.access_token;
};
