import React, { useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import FilmDetails from "@pwa/features/films/FilmDetails";

export default function FilmDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const { query, type } = (location.state || {}) as {
    query?: string;
    type?: "people" | "films";
  };

  const handleBackToSearch = useCallback(() => {
    const searchParams = new URLSearchParams();
    if (query) {
      searchParams.set("query", query);
    }
    if (type && type !== "people") {
      searchParams.set("type", type);
    }
    navigate(`/?${searchParams.toString()}`);
  }, [navigate, query, type]);

  const handleCharacterClick = useCallback(
    (charId: string) => {
      navigate(`/people/${charId}`, {
        state: { fromSearch: true, query, type },
      });
    },
    [navigate, query, type]
  );

  return (
    <FilmDetails
      id={id as string}
      onBackToSearch={handleBackToSearch}
      onCharacterClick={handleCharacterClick}
    />
  );
}
