import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGetFilmByIdQuery, useGetPersonByIdQuery } from '@features/api/swapiApi';
import styles from './FilmDetails.module.css';

const FilmDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: filmData, error: filmError, isLoading: filmIsLoading } = useGetFilmByIdQuery(id || '');

  if (filmIsLoading) return <div>Loading film details...</div>;
  if (filmError) return <div>Error loading film details.</div>;

  const characters = filmData?.result?.properties?.characters || [];

  return (
    <div className={styles.detailsContainer}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>Back</button>
      <h2>Film Details</h2>
      {filmData && (
        <>
          <p className={styles.detailItem}><span className={styles.detailLabel}>Title:</span> {filmData.result.properties.title}</p>
          <p className={styles.detailItem}><span className={styles.detailLabel}>Episode ID:</span> {filmData.result.properties.episode_id}</p>
          <p className={styles.detailItem}><span className={styles.detailLabel}>Opening Crawl:</span> {filmData.result.properties.opening_crawl}</p>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Characters:</span>
            <ul>
              {characters.map((charUrl: string) => {
                const charId = charUrl.split('/').filter(Boolean).pop();
                return <CharacterLink key={charId} charId={charId || ''} />;
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

interface CharacterLinkProps {
  charId: string;
}

const CharacterLink: React.FC<CharacterLinkProps> = ({ charId }) => {
  const { data: personData, isLoading: personIsLoading, error: personError } = useGetPersonByIdQuery(charId);

  if (personIsLoading) return <li>Loading character...</li>;
  if (personError) return <li>Error loading character.</li>;

  return (
    <li>
      <Link to={`/people/${charId}`}>{personData?.result?.properties?.name || 'Unknown Character'}</Link>
    </li>
  );
};

export default FilmDetails;
