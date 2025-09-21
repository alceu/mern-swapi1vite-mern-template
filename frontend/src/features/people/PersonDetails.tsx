import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPersonByIdQuery } from '@features/api/swapiApi';
import styles from './PersonDetails.module.css';

interface PersonDetailsProps {
  id: string;
}

const PersonDetails: React.FC<PersonDetailsProps> = ({ id }) => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetPersonByIdQuery(id || '');

  if (isLoading) return <div>Loading person details...</div>;
  if (error) return <div>Error loading person details.</div>;

  return (
    <div className={styles.detailsContainer}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>Back</button>
      <h2>Person Details</h2>
      {data && (
        <>
          <p className={styles.detailItem}><span className={styles.detailLabel}>Name:</span> {data.result.properties.name}</p>
          <p className={styles.detailItem}><span className={styles.detailLabel}>Height:</span> {data.result.properties.height}</p>
          <p className={styles.detailItem}><span className={styles.detailLabel}>Mass:</span> {data.result.properties.mass}</p>
          <p className={styles.detailItem}><span className={styles.detailLabel}>Hair Color:</span> {data.result.properties.hair_color}</p>
          <p className={styles.detailItem}><span className={styles.detailLabel}>Skin Color:</span> {data.result.properties.skin_color}</p>
          <p className={styles.detailItem}><span className={styles.detailLabel}>Eye Color:</span> {data.result.properties.eye_color}</p>
          <p className={styles.detailItem}><span className={styles.detailLabel}>Birth Year:</span> {data.result.properties.birth_year}</p>
          <p className={styles.detailItem}><span className={styles.detailLabel}>Gender:</span> {data.result.properties.gender}</p>
        </>
      )}
    </div>
  );
};

export default PersonDetails;
