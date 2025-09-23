import React, { useCallback } from "react";
import FilmDetails from "@features/films/FilmDetails";
import { useParams, useNavigate } from "react-router-dom";

export default function FilmDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBackToSearch = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleCharacterClick = useCallback(
    (charId: string) => {
      navigate(`/people/${charId}`);
    },
    [navigate]
  );

  return (
    <FilmDetails
      id={id as string}
      onBackToSearch={handleBackToSearch}
      onCharacterClick={handleCharacterClick}
    />
  );
}
