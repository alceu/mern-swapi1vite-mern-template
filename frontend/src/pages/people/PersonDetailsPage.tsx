import React from "react";
import PersonDetails from "@features/people/PersonDetails";
import { useParams } from "react-router-dom";

export default function PersonDetailsPage() {
  const { id } = useParams<{ id: string }>();
  return <PersonDetails id={id as string} />;
}
