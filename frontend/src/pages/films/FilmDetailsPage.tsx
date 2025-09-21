import React from "react";
import FilmDetails from "@features/films/FilmDetails";
import { useParams } from "react-router-dom";

export default function FilmDetailsPage() {
  const { id } = useParams<{ id: string }>();
  return <FilmDetails id={id as string} />;
}
