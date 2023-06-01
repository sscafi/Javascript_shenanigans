// Set your Spotify access token
const accessToken = 'YOUR_ACCESS_TOKEN';

// Function to retrieve user's saved tracks
async function getUserSavedTracks() {
  const response = await fetch('https://api.spotify.com/v1/me/tracks?limit=50', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const data = await response.json();
  return data.items;
}

// Function to get audio features for a track
async function getAudioFeatures(trackId) {
  const response = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const data = await response.json();
  return data;
}

// Function to create a playlist
async function createPlaylist(name) {
  const userId = await getUserId();

  const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      public: false
    })
  });

  const data = await response.json();
  return data.id;
}

// Function to add tracks to a playlist
async function addTracksToPlaylist(playlistId, trackUris) {
  await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uris: trackUris
    })
  });
}

// Function to recommend songs based on BPM
async function recommendSongs(bpm) {
  const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=5&seed_tracks=&min_tempo=${bpm - 10}&max_tempo=${bpm + 10}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const data = await response.json();
  return data.tracks;
}

// Function to get the user's Spotify user ID
async function getUserId() {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const data = await response.json();
  return data.id;
}

// Main function
async function main() {
  try {
    // Get the user's saved tracks
    const savedTracks = await getUserSavedTracks();

    // Create an object to hold track details by BPM
    const tracksByBpm = {};

    // Retrieve details for each track
    for (const item of savedTracks) {
      const track = item.track;
      const trackId = track.id;
      const trackName = track.name;

      // Get audio features for the track
      const audioFeatures = await getAudioFeatures(trackId);
      const bpm = audioFeatures.tempo;

      // Add the track to the corresponding BPM playlist
      if (!tracksByBpm[bpm]) {
        tracksByBpm[bpm] = [];
      }
      tracksByBpm[bpm].push(trackId);
    }

    // Create a playlist for each unique BPM value
    for (const bpm in tracksByBpm) {
      const playlistId = await createPlaylist(`BPM ${bpm}`);
      await addTracksToPlaylist(playlistId, tracksByBpm[bpm]);
    }

    // Recommend songs based on the selected playlist's BPM
    const selectedBpm = Object.keys(tracksByBpm)[0];
    const recommendedSongs = await recommendSongs(selectedBpm);
    console.log('Recommended songs:');
    for (const song of recommendedSongs) {
      console.log(song.name);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the main function
main();
