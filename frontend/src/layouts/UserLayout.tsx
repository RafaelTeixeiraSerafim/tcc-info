import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import AddedToCartBackdrop from "../components/AddedToCartPopup/AddedToCartBackdrop";
import { AddressProvider } from "../contexts/AddressContext";
import { CartProvider } from "../contexts/CartContext";

export default function UserLayout() {
  return (
    <>
      <AddressProvider>
        <CartProvider>
          <Header />
          <main style={{marginTop: "8rem"}}>
            <Outlet />
          </main>
          <AddedToCartBackdrop />
        </CartProvider>
      </AddressProvider>
    </>
  );
}
