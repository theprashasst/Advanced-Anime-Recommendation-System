"""
Builds a dataset for an advanced anime recommendation system using the AniList GraphQL endpoint.

This function performs the following steps:
1. Connects to the AniList GraphQL API endpoint.
2. Queries the API to retrieve anime data, including titles, genres, descriptions, ratings, and other relevant metadata.
3. Processes the retrieved data to ensure it is in a suitable format for building a recommendation system.
4. Stores the processed data in a structured format, such as a pandas DataFrame or a database, for further analysis and model training.

Parameters:
- api_endpoint (str): The URL of the AniList GraphQL API endpoint.
- query (str): The GraphQL query string to retrieve the desired anime data.
- headers (dict): Optional headers to include in the API request, such as authentication tokens.

Returns:
- dataset (DataFrame): A pandas DataFrame containing the processed anime data, ready for use in the recommendation system.

Example usage:
# >>> api_endpoint = "https://graphql.anilist.co"
# >>> query = """
# # ... {
# ...   Media(type: ANIME, sort: POPULARITY_DESC) {
# ...     id
# ...     title {
# ...       romaji
# ...       english
# ...       native
# ...     }
# ...     genres
# ...     description
# ...     averageScore
# ...     popularity
# ...   }
# ... }
# ... """
# >>> headers = {"Authorization": "Bearer YOUR_ACCESS_TOKEN"}
# >>> dataset = build_anime_dataset(api_endpoint, query, headers)
# >>> print(dataset.head())
# """


import requests
import asyncio
import time
import json
from fetcher import fetch_anime_data
async def main():
  # Fetch and aggregate all data
  all_anime_data = []
  page = 1
  per_page = 50
  x=0

  while True:
      x+=1
      if x%10==0:
          print(f"current page: {page}  current entry: {len(all_anime_data)}")
      try:
          data = fetch_anime_data(page, per_page)
          media = data['data']['Page']['media']
          if not media:
              break
          all_anime_data.extend(media)
          page += 1
      except:
          print("Error fetching data. Waiting 60 sec...")
          print(f"current page: {page}  current entry: {len(all_anime_data)}")
          await asyncio.sleep(60)
          print("Retrying...")

  # Save to JSON
  import json
  with open("anime_data.json", "w", encoding="utf-8") as f:
      json.dump(all_anime_data, f, ensure_ascii=False, indent=4)

  print(f"Fetched {len(all_anime_data)} anime entries.")

if __name__ == "__main__":
    asyncio.run(main())
