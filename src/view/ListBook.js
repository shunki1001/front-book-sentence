import { useContext, useState } from "react";

import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";

import { Link } from "react-router-dom";

import BarcodeIcon from "./components/CustomIcon/BarcodeIcon";
import Header from "./components/Header";
import Search from "./components/Search";
import BookInfo from "./components/BookInfo";
import { BarcodeReaderLabel } from "./components/UploadLabel";
import { AuthContext } from "../contexts/AuthContext";
import { DataContext } from "../contexts/DataContext";

const ListBook = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isbnPhoto, setIsbnPhoto] = useState();

  const { sentenceList } = useContext(AuthContext);
  const { setPassId } = useContext(DataContext);

  const [titleList, setTitleList] = useState(sentenceList);

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
  const linkClickHandler = (id) => {
    setPassId(id);
  };

  return (
    <div>
      <Header HeaderName="書籍登録" />
      <Box sx={{ width: "100%", display: "flex", px: "20px", mb: 2 }}>
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

      {titleList.map((sentence, index) => {
        return (
          <Button
            onClick={() => linkClickHandler(sentence.sentence_id)}
            key={index}
            style={{ textAlign: "left", lineHeight: 2 }}
          >
            <Link
              to="/detailbook"
              style={{ textDecoration: "none", color: "#FDFEFF" }}
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
          <BarcodeReaderLabel name="isbn-read" onChange={handleChange} />
        </Box>
      </Dialog>
    </div>
  );
};

export default ListBook;
