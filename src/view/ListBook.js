import React, { useRef } from "react";
import { useContext, useEffect, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import BarcodeIcon from "./components/CustomIcon/BarcodeIcon";
import Header from "./components/Header";
import { RegistSearch } from "./components/Search";
import BookInfo from "./components/BookInfo";
import { UploadLabelByBarcode } from "./components/UploadLabel";
import { DataContext } from "../contexts/DataContext";
import { rakutenApiKeyword, rakutenApi } from "../contexts/DataContext";
import { AuthContext } from "../contexts/AuthContext";

const ListBook = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isbnPhoto, setIsbnPhoto] = useState();

  const { sentenceList } = useContext(AuthContext);
  const { setIsbnResult, flagWhereFrom } = useContext(DataContext);

  const [titleList, setTitleList] = useState([]);
  const [change, setChange] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [rakutenError, setRakutenError] = useState(false);

  const navigate = useNavigate();

  // 検索機能
  const firstFlag = useRef(false);
  useEffect(() => {
    // 楽天のキーワード検索
    if (firstFlag.current) {
      rakutenApiKeyword(searchValue)
        .then((res) => {
          setTitleList(res.data.Items);
        })
        .catch((err) => {
          setRakutenError(true);
        });
    } else {
      firstFlag.current = true;
    }
  }, [change]);

  useEffect(() => {
    const setFirstList = () => {
      const AllIsbnList = sentenceList.map((item) => {
        return item.isbn;
      });
      const isbnList = AllIsbnList.filter((item, pos) => {
        return AllIsbnList.indexOf(item) == pos;
      });
      isbnList.forEach((item, index) => {
        setTimeout(() => {
          rakutenApi(item)
            .then((res) => {
              const temp = res.data.Items[0].Item;
              setTitleList((prev) => [...prev, { Item: temp }]);
            })
            .catch((err) => {});
        }, index * 800);
      });
    };
    setFirstList();
  }, []);

  const handleClickReader = () => {
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
  const linkClickHandler = async (index) => {
    setIsbnResult({
      author: titleList[index].Item.author,
      title: titleList[index].Item.title,
      imageUrl: titleList[index].Item.mediumImageUrl,
      isbn: titleList[index].Item.isbn,
    });
    flagWhereFrom("fromIsbn");
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate("/detailbook");
  };

  return (
    <div>
      <Header HeaderName="書籍登録" />
      <Box sx={{ width: "100%", display: "flex", px: "20px", mb: 2 }}>
        <RegistSearch
          label="タイトル、著者"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          change={change}
          setChange={setChange}
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
      {titleList.length === 0 && (
        <Typography style={{ textAlign: "center" }}>
          検索ワードを入力してください
        </Typography>
      )}
      {titleList.map((sentence, index) => {
        return (
          <Button
            onClick={() => linkClickHandler(index)}
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
              <BookInfo sentence={sentence} rakuten />
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
        open={rakutenError}
        onClose={() => setRakutenError(false)}
        message="検索できませんでした。しばらく経ってからもう一度行って下さい"
        autoHideDuration={2000}
      />
    </div>
  );
};

export default ListBook;
