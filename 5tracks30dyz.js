// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQBo8oFl44i0OKOJSCOaebIZOa4E2ZrI5a7D8I91FZHML_GdYUfS7g9hf4akpFaL9cAJ27NcxB2nifuuoe4D0PaJ3OmJvQsqDzvJ8C72Y55CqFdbRGpMzC2ZXn8pvgAbo34GCXtwQtdDf_YYOFnJA_caglBU5_20wObF4kU8UDxgYGzMPNoquwvbiMUSwOgASgjwfn5vPo8s-g9upjWJri1HU5ZOsLwt9xc-VbU5ZAOpLFecmW-Ca1CGcv4_pk3SPikKkrANxhMvoaTkz7-ICHlNCx6X';
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

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);