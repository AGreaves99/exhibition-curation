import { useEffect, useState } from "preact/hooks";
import { getArtworks } from "../../../api-calls/api-calls";
import { ArtworkCard } from "../../components/ArtworkCard";
import "../../styles/artworkCard.css";
import { ItemsPerPage } from "../../components/ItemsPerPage";
import { useLocation } from "preact-iso";

export function Home() {
  const { query } = useLocation();
  const [artworksData, setArtworksData] = useState({
    config: {},
    data: [],
    info: {},
    pagination: {},
  });
  useEffect(() => {
    getArtworks(query.limit || 10).then((data) => {
      setArtworksData(data);
    });
  }, [query]);

  const ArtworkCards = artworksData.data.map((artwork) => {
    return (
      <ArtworkCard
        key={artwork.id}
        title={artwork.title}
        artist={artwork.artist_title}
        image_id={artwork.image_id}
        iiif_url={artworksData.config.iiif_url}
        alt_text={artwork.thumbnail.alt_text}
      />
    );
  });

  return (
    <>
      <ItemsPerPage />
      <ul class="artwork-list"> {ArtworkCards} </ul>
    </>
  );
}
