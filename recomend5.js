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

const topTracksIds = [
  '3507Teuh1vj1L5eMAJj80O','27aErBi1C2sX7zCLKMzS5R','6RdQfx0t3ibugpvLV3Kr21','2eCyRVDQoLA7RflvLWCaGW','6otiaV2fagE3s8IvP6WkwG'
];

async function getRecommendations(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
  return (await fetchWebApi(
    `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
  )).tracks;
}

const recommendedTracks = await getRecommendations();
console.log(
  recommendedTracks.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);