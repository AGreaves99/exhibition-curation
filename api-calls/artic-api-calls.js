import axios from "axios";

const artic = axios.create({
  baseURL: "https://api.artic.edu/api/v1",
});

export function getArticArtworks(
  limit = "10",
  search = null,
  sort = null,
  page = 1
) {
  const sortOptions = {
    // The API ascending and descending sort options are reversed
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
        from: (page - 1) * Number(limit),
        q: search,
        sort: sortOptions[sort] && {
          [sortOptions[sort][0]]: sortOptions[sort][1],
        },
      },
    })
    .then(({ data }) => {
      return {
        data: data.data.map((artwork) => {
          return {
            id: artwork.id,
            title: artwork.title,
            artistTitle: artwork.artist_title,
            hasImage: !!artwork.image_id,
            altText: data.data.thumbnail?.alt_text || artwork.title,
            iiifUrl: `${data.config.iiif_url}/${artwork.image_id}`,
            source: "artic",
          };
        }),
        totalPages: data.pagination.total_pages,
      };
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function getArticSingleArtwork(artId) {
  return artic
    .get(`/artworks/${artId}`, {
      params: {
        fields:
          "title,image_id,date_start,date_end,artist_title,thumbnail,dimensions,medium_display,short_description",
      },
    })
    .then(({ data }) => {
      return {
        title: data.data.title,
        artist: data.data.artist_title,
        hasImage: !!data.data.image_id,
        iiifUrl: `${data.config.iiif_url}/${data.data.image_id}`,
        altText: data.data.thumbnail?.alt_text || data.data.title,
        dimensions: data.data.dimensions,
        medium: data.data.medium_display,
        shortDescription: data.data.short_description,
        dateStart: data.data.date_start,
        dateEnd: data.data.date_end,
      };
    })
    .catch((error) => console.error(error));
}

export function getArticCollectionArtworks(idArray = null) {
  if (!idArray?.length) {
    return Promise.resolve({
      data: [],
    });
  }

  return artic
    .get("/artworks", {
      params: {
        ids: idArray.join(","),
        fields: "id,title,image_id,artist_title,thumbnail",
      },
    })
    .then(({ data }) => {
      return {
        data: data.data.map((artwork) => {
          return {
            id: artwork.id,
            title: artwork.title,
            artistTitle: artwork.artist_title,
            hasImage: !!artwork.image_id,
            altText: artwork.thumbnail?.alt_text || data.data.title,
            iiifUrl: `${data.config.iiif_url}/${artwork.image_id}`,
            source: "artic",
            uniqueId: `artic-${artwork.id}`,
          };
        }),
      };
    })
    .catch((error) => console.error(error));
}
