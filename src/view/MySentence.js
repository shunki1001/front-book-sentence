import { useContext, useEffect, useState } from "react";

import { Box, IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

import Header from "./components/Header";
import Search from "./components/Search";
import BookComponent from "./components/BookComponent";
import SortList from "./components/SortList";
import { AuthContext } from "../contexts/AuthContext";

const MySentence = () => {
  const [openSort, setOpenSort] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { sentenceList } = useContext(AuthContext);

  const [sortedList, setSortedList] = useState(sentenceList);

  useEffect(() => {
    switch (selectedIndex) {
      case 0:
        setSortedList(
          sortedList.sort((a, b) => {
            if (a.date_created > b.date_created) {
              return 1;
            } else {
              return -1;
            }
          })
        );
        break;
      case 1:
        break;
      case 2:
        setSortedList(
          sortedList.sort((a, b) => {
            if (a.title > b.title) {
              return 1;
            } else {
              return -1;
            }
          })
        );
        break;
      default:
        console.log("並び替えで実行できない数値が選ばれました");
        break;
    }
  }, [selectedIndex]);

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
        <SortList
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      )}
      {sortedList.map((sentence, index) => {
        return <BookComponent sentence={sentence} key={index} />;
      })}
    </>
  );
};

export default MySentence;
