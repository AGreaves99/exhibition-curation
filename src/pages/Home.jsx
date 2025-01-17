import { useEffect, useState } from "preact/hooks";
import { getArtworks } from "../../api-calls/api-calls";
import { ArtworkCard } from "../components/ArtworkCard";
import { ItemsPerPage } from "../components/ItemsPerPage";
import { useLocation } from "preact-iso";
import { SearchBox } from "../components/SearchBox";
import { SortArtworks } from "../components/SortDropdown";
import "../styles/artworkCard.css";

export function Home() {
  const { query } = useLocation();
  const [artworksData, setArtworksData] = useState({
    config: {},
    data: [],
    info: {},
    pagination: {},
  });
  useEffect(() => {
    getArtworks(query.limit, query.search, query.sort_by).then((data) => {
      setArtworksData(data);
    });
  }, [query]);

  const ArtworkCards = artworksData.data.map((artwork) => {
    return (
      <ArtworkCard
        key={artwork.id}
        id={artwork.id}
        title={artwork.title}
        artist={artwork.artist_title}
        image_id={artwork.image_id}
        iiif_url={artworksData.config.iiif_url}
        alt_text={artwork.thumbnail?.alt_text || artwork.title}
      />
    );
  });

  return (
    <>
      <ItemsPerPage />
      <SearchBox />
      <SortArtworks />
      <ul class="artwork-list"> {ArtworkCards} </ul>
    </>
  );
}
