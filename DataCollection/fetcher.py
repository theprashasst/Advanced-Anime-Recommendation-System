import requests
def fetch_anime_data(page, per_page):
    url = "https://graphql.anilist.co"
    query = """
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
            native
          }
          genres
          averageScore
          popularity
          episodes
          description
          format
          season
          seasonYear
          relations {
            edges {
              node {
                id
                title {
                  english
                }
              }
            }
          }
          tags {
            name
            rank
          }
        }
      }
    }
    """
    variables = {"page": page, "perPage": per_page}
    response = requests.post(url, json={"query": query, "variables": variables})

    # Check if the response has a 429 status code
    if response.status_code == 429:
        raise requests.exceptions.RequestException("Rate Limit Exceeded: 429")
    
    # Raise an HTTPError for other non-success codes (4xx or 5xx)
    response.raise_for_status()


    return response.json()
