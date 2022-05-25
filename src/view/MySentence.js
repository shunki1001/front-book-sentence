import { useState } from "react";

import { Box, IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

import Header from "./components/Header";
import Search from "./components/Search";
import BookComponent from "./components/BookComponent";
import SortList from "./components/SortList";

const MySentence = () => {
  const [openSort, setOpenSort] = useState(false);

  const handleClickSort = () => {
    setOpenSort(!openSort);
  };

  return (
    <>
      <Header HeaderName="マイセンテンス" addBook="true" />
      <Box sx={{ width: "100%", display: "flex", px: "5px" }}>
        <Search label="タイトル、引用箇所、著者、メモ" />
        <IconButton
          sx={{
            background: "#282826",
            borderRadius: "10px",
            mt: 1,
            ml: 1,
            py: 0,
            "&:hover": { backgroundColor: "#282826" },
          }}
          onClick={handleClickSort}
        >
          <SortIcon fontSize="large" />
        </IconButton>
      </Box>
      {openSort && (
        <SortList setOpenSort={setOpenSort} handleClickSort={handleClickSort} />
      )}
      <BookComponent />
      <BookComponent />
      <BookComponent />
      <BookComponent />
    </>
  );
};

export default MySentence;
