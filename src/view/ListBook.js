import { useState } from "react";

import { Box, Dialog, IconButton, Typography } from "@mui/material";

import { Link } from "react-router-dom";

import BarcodeIcon from "./components/CustomIcon/BarcodeIcon";
import Header from "./components/Header";
import Search from "./components/Search";
import BookInfo from "./components/BookInfo";
import { BarcodeReaderLabel } from "./components/UploadLabel";

const ListBook = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isbnPhoto, setIsbnPhoto] = useState();

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
    // バーコードをデコードするよ
  };

  return (
    <div>
      <Header HeaderName="書籍登録" />
      <Box sx={{ width: "100%", display: "flex", px: "20px" }}>
        <Search label="タイトル、著者" />
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
      <Link
        to="/detailbook"
        style={{ textDecoration: "none", color: "#FDFEFF" }}
      >
        <BookInfo />
      </Link>
      <Link
        to="/detailbook"
        style={{ textDecoration: "none", color: "#FDFEFF" }}
      >
        <BookInfo />
      </Link>
      <Link
        to="/detailbook"
        style={{ textDecoration: "none", color: "#FDFEFF" }}
      >
        <BookInfo />
      </Link>
      <Link
        to="/detailbook"
        style={{ textDecoration: "none", color: "#FDFEFF" }}
      >
        <BookInfo />
      </Link>
      <Link
        to="/detailbook"
        style={{ textDecoration: "none", color: "#FDFEFF" }}
      >
        <BookInfo />
      </Link>
      <Dialog
        open={openModal}
        onClose={handleClose}
        fullWidth
        sx={{ textAlign: "center" }}
      >
        <Typography sx={{ my: 1 }}>バーコードを読み込む</Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <BarcodeReaderLabel name="isbn-read" onChange={handleChange} />
        </Box>
      </Dialog>
    </div>
  );
};

export default ListBook;
