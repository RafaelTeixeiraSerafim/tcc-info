import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, TextField, alpha, styled } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { IProduct } from "../interfaces";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === "light"
      ? alpha(theme.palette.common.black, 0.05)
      : alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? alpha(theme.palette.common.black, 0.10)
        : alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  width: "100%",
  maxWidth: 500,
  flexShrink: 1,
  marginLeft: theme.spacing(3),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& fieldset": {
    borderColor: alpha(
      theme.palette.mode === "light"
        ? theme.palette.common.black
        : theme.palette.common.white,
      0.6
    ),
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: alpha(
      theme.palette.mode === "light"
        ? theme.palette.common.black
        : theme.palette.common.white,
      1
    ),
  },
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: alpha(
      theme.palette.mode === "light"
        ? theme.palette.common.black
        : theme.palette.common.white,
      1
    ),
  },
  "& .MuiAutocomplete-inputRoot .MuiAutocomplete-input": {
    width: "inherit",
  },
  "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
    padding: theme.spacing(0.6, 1, 0.6, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: alpha(
      theme.palette.mode === "light"
        ? theme.palette.common.black
        : theme.palette.common.white,
      1
    ),
    // [theme.breakpoints.up("md")]: {
    //   maxWidth: "40ch",
    // },
  },
}));

interface SearchBarProps {
  products: IProduct[] | null;
}

export default function SearchBar({ products }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  // const location = useLocation();

  const navigate = useNavigate();

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: unknown
  ) => {
    if (newValue && typeof newValue === "object" && "id" in newValue) {
      navigate(`/product/${(newValue as { id: string }).id}`); // Navigate using the product's id
    }
  };

  // useEffect(() => {
  //   setInputValue(""); // Reset the input value
  // }, [location.pathname]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledAutocomplete
        freeSolo
        id="free-solo-2-demo"
        options={products || []}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : (option as IProduct).name
        }
        inputValue={inputValue}
        onInputChange={(e, value) => setInputValue(value)}
        onChange={handleChange}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            placeholder="Search..."
            InputProps={{
              ...params.InputProps,
              type: "search",
              endAdornment: null,
            }}
          />
        )}
      />
    </Search>
  );
}
