import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import AddedToCartBackdrop from "../components/AddedToCartPopup/AddedToCartBackdrop";

export default function UserLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <AddedToCartBackdrop />
    </>
  );
}
