import React, { useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import PersonDetails from "@pwa/features/people/PersonDetails";

export default function PersonDetailsPage() {
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

  const handleMovieClick = useCallback(
    (filmId: string) => {
      navigate(`/films/${filmId}`, {
        state: { fromSearch: true, query, type },
      });
    },
    [navigate, query, type]
  );

  return (
    <PersonDetails
      id={id as string}
      onBackToSearch={handleBackToSearch}
      onMovieClick={handleMovieClick}
    />
  );
}
