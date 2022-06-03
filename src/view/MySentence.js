import { useContext, useEffect, useState } from "react";

import { Box, IconButton, Snackbar } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

import Header from "./components/Header";
import Search from "./components/Search";
import BookComponent from "./components/BookComponent";
import SortList from "./components/SortList";
import { AuthContext } from "../contexts/AuthContext";
import { DataContext } from "../contexts/DataContext";

const MySentence = () => {
  const [openSort, setOpenSort] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const { sentenceList, loading, setLoading } = useContext(AuthContext);

  const [sortedList, setSortedList] = useState(sentenceList);

  // 並び替え
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

  // データ更新
  useEffect(() => {
    setSortedList(sentenceList);
  }, [loading]);

  const handleClickSort = () => {
    setOpenSort(!openSort);
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      // 正規表現に変数を使う時に必要なRegExp
      let seachValueRegExp = new RegExp(searchValue, "g");
      let searchedList = sentenceList.filter((item) => {
        return (
          item.title.match(seachValueRegExp) ||
          item.quote_sentence.match(seachValueRegExp) ||
          item.author.match(seachValueRegExp) ||
          item.memo.match(seachValueRegExp)
        );
      });
      setSortedList(searchedList);
    } else {
      setSortedList(sentenceList);
    }
  }, [searchValue]);

  return (
    <>
      <Header HeaderName="マイセンテンス" addBook="true" />
      <Box sx={{ width: "100%", display: "flex", px: "5px" }}>
        <Search
          label="タイトル、引用箇所、著者、メモ"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
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

      <Snackbar
        open={loading}
        onClose={() => setLoading(false)}
        message="書籍情報を読み込んでいます。このままお待ちください。"
      />
    </>
  );
};

export default MySentence;
