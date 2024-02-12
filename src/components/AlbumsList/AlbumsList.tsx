import React, { useEffect, useState } from "react";
import { getAlbums } from "../../helpers/fetchData";
import { useParams } from "react-router-dom";
import { Albums } from "../../types/Albums";
import { Loader } from "../Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import './AlbumsList.scss';

export const AlbumsList: React.FC = () => {
  const [albums, setAlbums] = useState<Albums[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { userId } = useParams();

  if (!userId) {
    return;
  }

  useEffect(() => {
    const handleGetAlbums = async () => {
      try {
        const data: Albums[] = await getAlbums(+userId);
        setAlbums(data);
      } catch {
        console.log('Failed to get albums');
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    handleGetAlbums();
  }, [userId]);

  return (
    <div className="block album">
      {isError && (
        <ErrorMessage />
      )}

      {isLoading ? (
        <Loader />
      ) : (
        albums.map(album => (
          <div className="box album__item m-0" key={album.id}>
            <h3 className="title is-5">{album.title}</h3>
          </div>
        ))
      )}
    </div>
  )
}