import axios from "axios";
import { db } from "./database";

let accessToken: string;
let expires: number;

async function getClientToken() {
  if (accessToken && new Date().getTime() < expires) return accessToken;

  const data = new URLSearchParams();
  data.set("grant_type", "client_credentials");
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    data,
    {
      headers: {
        Authorization: `Basic ${new Buffer(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64")}`,
      },
    }
  );

  accessToken = response.data.access_token;
  expires = new Date().getTime() + response.data.expires_in * 1000 - 1000;

  return accessToken;
}

export interface SpotifySearchResult {
  name: string;
  uri: string;
  imageUri: string;
  albumName: string;
  artists: { uri: string; name: string }[];
  hits: number;
}

export async function searchTracks(
  query: string
): Promise<SpotifySearchResult[]> {
  const response = await axios.get(
    "https://api.spotify.com/v1/search?type=track&market=DE&q=" +
      encodeURIComponent(query),
    {
      headers: {
        Authorization: `Bearer ${await getClientToken()}`,
      },
    }
  );
  const data: SpotifySearchResult[] = response.data.tracks.items.map(
    (track: {
      name: any;
      uri: any;
      album: { images: { url: any }[]; name: string };
      artists: any[];
    }) => {
      return {
        name: track.name,
        uri: track.uri,
        imageUri: track.album.images[0].url,
        albumName: track.album.name,
        artists: track.artists.map((a) => ({
          name: a.name,
          uri: a.uri,
        })),
      };
    }
  );
  await Promise.all(
    data.map((track) =>
      (async () => {
        await db.trackCache.upsert({
          where: {
            uri: track.uri,
          },
          update: {},
          create: {
            uri: track.uri,
            data: JSON.stringify(track),
          },
        });
      })()
    )
  );

  return data;
}
