import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import AddedToCartBackdrop from "../components/AddedToCartPopup/AddedToCartBackdrop";
import { AddressProvider } from "../contexts/AddressContext";
import { CartProvider } from "../contexts/CartContext";
import { useEffect, useState } from "react";
import { useUserContext } from "../hooks";
import { WishlistProvider } from "../contexts/WishlistContext";
import { Toolbar } from "@mui/material";
import Footer from "../components/Footer";

export default function UserLayout() {
  const [isClient, setIsClient] = useState(false);
  const { user, hasCheckedToken } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasCheckedToken) return;
    if (user?.role === "ADMIN") {
      navigate("/admin/dashboard");
    }
    setIsClient(true);
  }, [hasCheckedToken, navigate, user]);

  return (
    <>
      {isClient && (
        <AddressProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <main>
                <Toolbar />
                <Outlet />
                <Footer />
              </main>
            </WishlistProvider>
            <AddedToCartBackdrop />
          </CartProvider>
        </AddressProvider>
      )}
    </>
  );
}
