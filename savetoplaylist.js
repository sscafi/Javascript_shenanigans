// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQCnb7LGkqw116s8TAf3Uf76tx6w8RxmtqycL3U6hp1YZTriRCs-MyZ2xD74BgGw6hTf7Hv85vlcEml5NLB_wNjJ31NfiIJbIAvRXohvXj8jZfEX8AwngBQeO8IPpzEFapX2p8JPR9Df-LYTXtX31fQU23G_Z2AVMzC2nn9A0d8XVnnmAOJooR-uQlxwR6Fp6TJc6aHWPsyrUdBGct9yKPREHLsI-a0C-plMkeMpGmVS_ZZi_kXynVKyWBtV06MwUakWauIROGnpyQ2pSx5Z4bj5odNs';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const tracksUri = [
  'spotify:track:3507Teuh1vj1L5eMAJj80O','spotify:track:4tJ3I4cc4he0WWPR2CfFVh','spotify:track:27aErBi1C2sX7zCLKMzS5R','spotify:track:1VpTwecl7EbQiGyVsvwFQE','spotify:track:6RdQfx0t3ibugpvLV3Kr21','spotify:track:7CRn6C5yiuR3BHN04rBYt1','spotify:track:2eCyRVDQoLA7RflvLWCaGW','spotify:track:5VYkdSnVe0zgiRfWTeotym','spotify:track:6otiaV2fagE3s8IvP6WkwG','spotify:track:3SVjnYq17hnR82HSnfzSjV'
];

async function createPlaylist(tracksUri){
  const { id: user_id } = await fetchWebApi('v1/me', 'GET')
  
  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My recommendation playlist",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
  })
  
  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  );

  return playlist;
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);
