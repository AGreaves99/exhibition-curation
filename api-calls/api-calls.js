import axios from "axios";

const artic = axios.create({
  baseURL: "https://api.artic.edu/api/v1",
});

export function getArtworks() {
  return artic
    .get(
      "/artworks/search?query[term][is_public_domain]=true&fields=id,title,image_id,date_start,date_end,artist_title,thumbnail.alt_text"
    )
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
