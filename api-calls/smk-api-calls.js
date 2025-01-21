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
    "title-desc": ["titles", "desc"],
    "title-asc": ["titles", "asc"],
    "date-desc": ["production_dates_end", "desc"],
    "date-asc": ["production_dates_end", "asc"],
  };
  return smk
    .get("/art/search", {
      params: {
        keys: search || "*",
        filters: "[public_domain:true]",
        offset: (page - 1) * Number(limit),
        rows: limit,
        sort: sortOptions[sort] && sortOptions[sort][0],
        sort_type: sortOptions[sort] && sortOptions[sort][1],
        lang: "en",
      },
    })
    .then(({ data }) => {
      return {
        data: data.items.map((artwork) => {
          const title1 = artwork?.titles?.[0]?.title || "No title";
          const title2 = artwork?.titles?.[1]?.title || "";
          return {
            id: artwork.object_number,
            title: `${title1}${title2 ? `, ${title2}` : ""}`,
            artistTitle: artwork?.artist?.[0] || "Unknown Artist",
            hasImage: artwork.has_image,
            iiifUrl: artwork.image_iiif_id,
            altText: `${title1}${title2 ? `, ${title2}` : ""}`,
          };
        }),
        totalPages: Math.ceil(data.found / Number(limit)),
      };
    })
    .catch((error) => console.error(error));
}
