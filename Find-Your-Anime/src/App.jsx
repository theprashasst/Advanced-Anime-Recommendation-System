import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import AnimeList from './components/AnimeList';
import { Client } from "@gradio/client";

const App = () => {
  const [animeList, setAnimeList] = useState([]);

  const fetchAnimeDetails = async (query) => {
    try {
      const client = await Client.connect("Prashasst/Find-My-Anime");
      const response = await client.predict("/recommend_anime", {
        query,
        k: 9
      });
      console.log(response.data[0]);

      // Send query to your Python app
      // const response = await fetch('http://localhost:5000/recommend', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ query }),
      // });

      const anime_ids = await response.data[0].ids;

      // Fetch details from AniList API
      const animeDetails = await Promise.all(
        anime_ids && anime_ids?.map((id) =>
          fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: `
              query ($id: Int) {
                Media(id: $id) {
                  id
                  title {
                    romaji
                    english
                  }
                  description
                  startDate {
                    year
                    month
                    day
                  }
                  averageScore
                  coverImage {
                    large
                  }
                }
              }
            `,
              variables: { id },
            }),
          })
            .then((res) => res.json())
            .then((data) => data.data.Media)
        )
      );

      setAnimeList(animeDetails);
    } catch (error) {
      console.error('Error fetching anime details:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">Find Your Anime </h1>
     
      <SearchBar onSearch={fetchAnimeDetails} />
      <AnimeList animeList={animeList} />
    </div>
  );
};

export default App;
