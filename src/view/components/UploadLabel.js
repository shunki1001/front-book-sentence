import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box, Button, Dialog, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Scanner from "../../scanner/Scanner";
import "../../scanner/scanner.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadLabelStyle = {
  width: "200px",
  height: "70px",
  margin: "16px",
  boxShadow: "5px 5px 5px 2px rgb(0 0 0 / 20%)",
  borderRadius: "10px",
};

const UploadLabel = (props) => {
  return (
    <label style={UploadLabelStyle}>
      <UploadFileIcon />
      <Typography>画像を選択</Typography>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={props.onChange}
        accept="image/*"
        id={`upload-button-${props.name}`}
      />
    </label>
  );
};

export default UploadLabel;

// ISBNバーコードリーダー
const baseURL =
  "https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?applicationId=1029970387718010374";

export const BarcodeReaderLabel = (props) => {
  const [camera, setCamera] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [result, setResult] = useState(null);

  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const onDetected = (result) => {
    setResult(result);
    setCamera(false);
    setInfoOpen(true);
  };

  // 初回レンダリングで走らせないためのフラグ
  const renderFlagRef = useRef(false);
  useEffect(() => {
    if (renderFlagRef.current) {
      axios
        .get(baseURL + "&isbn=9784822259754")
        .then((res) => {
          setAuthorName(res.data.Items[0].Item.author);
          setBookName(res.data.Items[0].Item.title);
          setImage(res.data.Items[0].Item.mediumImageUrl);
        })
        .catch((error) => {
          alert("送信できませんでした");
          console.log(error);
        });
    } else {
      console.log("useEffectはまだ動かないよ");
      renderFlagRef.current = true;
    }
  }, [result]);

  const handleCloseCamera = () => {
    setCamera(false);
  };
  const handleCloseInfo = () => {
    setInfoOpen(false);
  };

  const handleClickOk = () => {
    console.log("OKボタン");
    navigate("/detailbook");
    setInfoOpen(false);
  };
  const handleClickAgain = () => {
    setInfoOpen(false);
    setCamera(true);
  };

  return (
    <>
      <Button style={UploadLabelStyle} onClick={() => setCamera(!camera)}>
        {camera ? "stop" : "start"}
      </Button>

      <Dialog open={camera} onClose={handleCloseCamera}>
        <Scanner onDetected={onDetected} />
      </Dialog>
      <Dialog open={infoOpen} onClose={handleCloseInfo}>
        <Box textAlign="center" sx={{ m: 2 }}>
          <Typography>こちらの書籍で正しいですか？</Typography>
          <Typography>書籍名：{bookName}</Typography>
          <Typography>著者名：{authorName}</Typography>
          <img src={image} alt="表紙" />
          <Box sx={{ display: "flex" }}>
            <Button
              sx={{ width: "50%", borderColor: "#FDFEFF" }}
              onClick={handleClickOk}
            >
              OK
            </Button>
            <Button
              sx={{ width: "50%", borderColor: "#FDFEFF" }}
              onClick={handleClickAgain}
            >
              もう一度
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
