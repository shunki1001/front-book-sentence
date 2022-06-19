import React from "react";
import { useContext, useEffect, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

import BarcodeIcon from "./components/CustomIcon/BarcodeIcon";
import Header from "./components/Header";
import Search from "./components/Search";
import BookInfo from "./components/BookInfo";
import { UploadLabelByBarcode } from "./components/UploadLabel";
import { AuthContext } from "../contexts/AuthContext";
import { DataContext } from "../contexts/DataContext";

const ListBook = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isbnPhoto, setIsbnPhoto] = useState();
  const [searchValue, setSearchValue] = useState("");

  const { sentenceList, loading, setLoading } = useContext(AuthContext);
  const { setPassId, flagWhereFrom } = useContext(DataContext);

  const [titleList, setTitleList] = useState(sentenceList);

  // 検索機能
  useEffect(() => {
    if (searchValue.length > 0) {
      // 正規表現に変数を使う時に必要なRegExp
      let seachValueRegExp = new RegExp(searchValue, "g");
      let searchedList = sentenceList.filter((item) => {
        return (
          item.title.match(seachValueRegExp) ||
          item.author.match(seachValueRegExp)
        );
      });
      setTitleList(searchedList);
    } else {
      setTitleList(titleList);
    }
  }, [searchValue]);

  // データ更新
  useEffect(() => {
    setTitleList(sentenceList);
  }, [loading]);

  const handleClickReader = () => {
    console.log("バーコードリーダー起動");
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleChange = (event) => {
    const { name, files } = event.target;
    setIsbnPhoto(files[0]);
    event.target.value = "";
  };
  const linkClickHandler = (id) => {
    setPassId(id);
    flagWhereFrom("fromMy");
  };

  return (
    <div>
      <Header HeaderName="書籍登録" />
      <Box sx={{ width: "100%", display: "flex", px: "20px", mb: 2 }}>
        <Search
          label="タイトル、著者"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <IconButton
          sx={{
            background: "#282826",
            borderRadius: "10px",
            mt: 1,
            ml: 1,
            pt: 1.5,
            pr: 1.5,
            "&:hover": { backgroundColor: "#282826" },
          }}
          onClick={handleClickReader}
        >
          <BarcodeIcon />
        </IconButton>
      </Box>

      {titleList.map((sentence, index) => {
        return (
          <Button
            onClick={() => linkClickHandler(sentence.sentence_id)}
            key={index}
            style={{ textAlign: "left", lineHeight: 2, width: "375px" }}
          >
            <Link
              to="/detailbook"
              style={{
                textDecoration: "none",
                color: "#FDFEFF",
                width: "100%",
              }}
            >
              <BookInfo sentence={sentence} />
            </Link>
          </Button>
        );
      })}

      <Dialog
        open={openModal}
        onClose={handleClose}
        fullWidth
        sx={{ textAlign: "center" }}
      >
        <Typography sx={{ my: 1 }}>バーコードを読み込む</Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <UploadLabelByBarcode name="isbn-read" onChange={handleChange} />
        </Box>
      </Dialog>

      <Snackbar
        open={loading}
        onClose={() => setLoading(false)}
        message="書籍情報を読み込んでいます"
      />
    </div>
  );
};

export default ListBook;
