import { Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AddedToCartBackdrop from "../components/AddedToCartPopup/AddedToCartBackdrop";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import AddressProvider from "../contexts/AddressContext";
import CartProvider from "../contexts/CartContext";
import WishlistProvider from "../contexts/WishlistContext";
import { useUserContext } from "../hooks";

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
              <main
                style={{
                  minHeight: "85vh",
                  borderBottom: "1px solid transparent", // Prevents margin collapsing
                }}
              >
                <Toolbar sx={{ minHeight: {md: "75px"} }} />
                <Outlet />
              </main>
              <Footer />
            </WishlistProvider>
            <AddedToCartBackdrop />
          </CartProvider>
        </AddressProvider>
      )}
    </>
  );
}
