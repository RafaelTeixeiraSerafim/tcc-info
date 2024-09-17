import React from "react";
import CategoryForm from "../components/CategoryForm";
import { useLocation } from "react-router-dom";

export default function UpdateCategory() {
  const location = useLocation();
  const category = location.state;

  return <CategoryForm origCategory={category} />;
}
