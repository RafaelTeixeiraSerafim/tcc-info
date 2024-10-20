import CategoryForm from "../../../components/CategoryForm";
import { useLocation } from "react-router-dom";

export default function UpdateCategory() {
  const category = useLocation().state;

  return <CategoryForm origCategory={category} />;
}
