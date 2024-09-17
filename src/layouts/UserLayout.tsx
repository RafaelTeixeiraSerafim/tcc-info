import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import AddedToCartBackdrop from "../components/AddedToCartBackdrop";

export default function UserLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <AddedToCartBackdrop />
    </>
  );
}
