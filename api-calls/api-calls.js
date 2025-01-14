import axios from "axios";

const artic = axios.create({
  baseURL: "https://api.artic.edu/api/v1",
});

export function getArtworks(limit = "10", search = null, sort = null) {
  const sortOptions = {
    // The API ascending and descending sort options are reversed
    "artist-desc": ["artist_title.keyword", "asc"],
    "artist-asc": ["artist_title.keyword", "desc"],
    "title-desc": ["title.keyword", "asc"],
    "title-asc": ["title.keyword", "desc"],
    "date-asc": ["date_end", "desc"],
    "date-desc": ["date_end", "asc"],
  };
  return artic
    .get("/artworks/search", {
      params: {
        query: {
          term: { is_public_domain: true },
        },
        fields: "id,title,image_id,artist_title,thumbnail.alt_text,date_end",
        size: limit,
        q: search,
        sort: sortOptions[sort] && {
          [sortOptions[sort][0]]: sortOptions[sort][1],
        },
      },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

export function getSingleArtwork(art_id) {
  return artic
    .get("/artworks/{art_id}", {
      params: {
        fields:
          "id,title,image_id,date_start,date_end,artist_title,thumbnail,dimensions,medium_display",
      },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
}
