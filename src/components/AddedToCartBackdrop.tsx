import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Box } from "@mui/material";

export default function AddedToCartBackdrop() {
  const { addedToCart, setAddedToCart } = useContext(UserContext);

  return (
    <>
      {addedToCart && (
        <Box
          component={"button"}
          sx={{
            position: "fixed",
            bgcolor: "#000",
            opacity: 0.5,
            left: -5,
            right: -5,
            top: -5,
            bottom: -5,
          }}
          onClick={() => setAddedToCart(false)}
        />
      )}
    </>
  );
}
