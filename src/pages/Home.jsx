import { useEffect, useState } from "preact/hooks";
import { getArticArtworks } from "../../api-calls/artic-api-calls";
import { ArtworkCard } from "../components/ArtworkCard";
import { ItemsPerPage } from "../components/ItemsPerPage";
import { useLocation } from "preact-iso";
import { SearchBox } from "../components/SearchBox";
import { SortArtworks } from "../components/SortDropdown";
import "../styles/artworkCard.css";
import { Pagination } from "../components/Pagination";
import { SourceDropdown } from "../components/SourceDropdown";
import { getSmkArtworks } from "../../api-calls/smk-api-calls";

export function Home() {
  const { limit, search, sort_by, page, source } = useLocation().query;
  const [artworksData, setArtworksData] = useState({
    data: [],
    totalPages: 0,
    source: "artic",
  });
  useEffect(() => {
    const fetchArtworks = source === "smk" ? getSmkArtworks : getArticArtworks;
    fetchArtworks(limit, search, sort_by, page).then((data) => {
      setArtworksData(data);
    });
  }, [useLocation().query]);

  const ArtworkCards = artworksData.data.map((artwork) => {
    return (
      <ArtworkCard
        key={artwork.id}
        id={artwork.id}
        title={artwork.title}
        artist={artwork.artistTitle}
        hasImage={artwork.hasImage}
        iiifUrl={artwork.iiifUrl}
        altText={artwork.altText}
        source={artworksData.source}
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
      <Pagination totalPages={artworksData.totalPages} />
    </>
  );
}
