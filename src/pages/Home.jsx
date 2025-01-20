import { useEffect, useState } from "preact/hooks";
import { getArtworks } from "../../api-calls/api-calls";
import { ArtworkCard } from "../components/ArtworkCard";
import { ItemsPerPage } from "../components/ItemsPerPage";
import { useLocation } from "preact-iso";
import { SearchBox } from "../components/SearchBox";
import { SortArtworks } from "../components/SortDropdown";
import "../styles/artworkCard.css";
import { Pagination } from "../components/Pagination";
import { SourceDropdown } from "../components/SourceDropdown";

export function Home() {
  const { limit, search, sort_by, page } = useLocation().query;
  const [artworksData, setArtworksData] = useState({
    config: {},
    data: [],
    info: {},
    pagination: {},
  });
  useEffect(() => {
    getArtworks(limit, search, sort_by, page).then((data) => {
      setArtworksData(data);
    });
  }, [useLocation().query]);

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
      <SourceDropdown />
      <SearchBox />
      <SortArtworks />
      <ul class="artwork-list"> {ArtworkCards} </ul>
      <Pagination totalPages={artworksData.pagination.total_pages} />
    </>
  );
}
