import axios from "axios";

const smk = axios.create({
  baseURL: "https://api.smk.dk/api/v1",
});

export function getSmkArtworks(
  limit = "10",
  search = null,
  sort = null,
  page = 1
) {
  const sortOptions = {
    "title-desc": ["title", "desc"],
    "title-asc": ["title", "asc"],
    "date-desc": ["date", "desc"],
    "date-asc": ["date", "asc"],
  };
  return smk
    .get("/art/search", {
      params: {
        keys: search || "*",
        filters: "[public_domain:true]",
        offset: (page - 1) * Number(limit),
        rows: limit,
        lang: "en",
      },
    })
    .then(({ data }) => {
      return {
        data: data.items.map((artwork) => {
          return {
            id: artwork.object_number,
            title: `${artwork.titles[0].title}${
              artwork.titles[1] ? `, ${artwork.titles[1].title}` : ""
            }`,
            artistTitle: artwork.artist[0],
            iiifUrl: artwork.image_iiif_id,
            hasImage: artwork.has_image,
          };
        }),
        iiifUrl: "",
        totalPages: data.found,
      };
    })
    .catch((error) => console.error(error));
}
