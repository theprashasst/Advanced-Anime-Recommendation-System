import React from 'react';
import { Card, CardHeader, CardFooter, CardContent } from './ui/card';

const AnimeList = ({ animeList  ,loadingState}) => {
  if (loadingState) 
    return (
      <p className="text-center text-gray-500 mt-6">
        Loading...
      </p>
    );
  if (animeList.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No recommendations yet. Search for something!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
      {animeList.map((anime) => (
        <Card key={anime.id} className="bg-card border border-secondary text-black">
          <CardHeader className="relative">
            <img
              src={anime.coverImage.large}
              alt={anime.title.romaji}
              className="w-full h-64 object-cover rounded-t-md"
            />
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-bold mb-2">
              {anime.title.english || anime.title.romaji}
            </h2>
            <p className="text-sm text-grey-500 mb-4">
              {anime.description?.slice(0, 100)}...
            </p>
            <div className="text-sm">
              <p>
                <strong>Release Date:</strong>{' '}
                {`${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}`}
              </p>
              <p>
                <strong>Rating:</strong> {anime.averageScore}
              </p>
            </div>
          </CardContent>
          <CardFooter className="text-right">
            <a
              href={`https://anilist.co/anime/${anime.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              View Details
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default AnimeList;
