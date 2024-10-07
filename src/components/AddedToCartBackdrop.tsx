import React from "react";
import { Box } from "@mui/material";
import { useUserContext } from "../hooks";

export default function AddedToCartBackdrop() {
  const { addedToCart, setAddedToCart } = useUserContext();

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
