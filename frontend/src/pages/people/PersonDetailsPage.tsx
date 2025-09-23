import React, { useCallback } from "react";
import PersonDetails from "@features/people/PersonDetails";
import { useParams, useNavigate } from "react-router-dom";

export default function PersonDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBackToSearch = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleMovieClick = useCallback(
    (filmId: string) => {
      navigate(`/films/${filmId}`);
    },
    [navigate]
  );

  return (
    <PersonDetails
      id={id as string}
      onBackToSearch={handleBackToSearch}
      onMovieClick={handleMovieClick}
    />
  );
}

