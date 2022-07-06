import React from "react";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const searchTextareaStyle = {
  width: "100%",
  height: "90%",
  backgroundColor: "transparent",
  borderWidth: "0px",
  color: "white",
  fontFamily: "Zen Old Mincho, Roboto, Helvetica, Arial, sans-serif",
  fontSize: "16px",
};

const Search = (props) => {
  const { label, searchValue, setSearchValue } = props;

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "90%",
          backgroundColor: "#262628",
          alignItems: "flex-end",
          borderRadius: 2,
          mt: 1,
          pr: 1,
        }}
      >
        <SearchIcon sx={{ color: "primary", mr: 1, my: 1 }} />
        <input
          value={searchValue}
          onChange={handleChange}
          placeholder={label}
          style={searchTextareaStyle}
        ></input>
      </Box>
    </>
  );
};

export default Search;

export const RegistSearch = (props) => {
  const { label, searchValue, setSearchValue, change, setChange } = props;

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const keypress = (e) => {
    if (e.key === "Enter") setChange(!change);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "90%",
          backgroundColor: "#262628",
          alignItems: "flex-end",
          borderRadius: 2,
          mt: 1,
          pr: 1,
        }}
      >
        <SearchIcon sx={{ color: "primary", mr: 1, my: 1 }} />
        <input
          value={searchValue}
          onChange={handleChange}
          onKeyDown={(e) => keypress(e)}
          placeholder={label}
          style={searchTextareaStyle}
        ></input>
      </Box>
    </>
  );
};
