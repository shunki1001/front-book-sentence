import React from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box, Button, Dialog, Snackbar, Typography } from "@mui/material";
import { useState, useEffect, useRef, useContext } from "react";
import Scanner from "../../scanner/Scanner";
import "../../scanner/scanner.css";
import noimage from "../../static/images/noimage2.png";

import { useNavigate } from "react-router-dom";
import { DataContext, rakutenApi } from "../../contexts/DataContext";

const UploadLabelStyle = {
  width: "200px",
  height: "70px",
  margin: "16px",
  boxShadow: "5px 5px 5px 2px rgb(0 0 0 / 20%)",
  borderRadius: "10px",
};

const UploadLabel = (props) => {
  let capture = props.capture ? props.capture : '';
  return (
    <label style={UploadLabelStyle}>
      <UploadFileIcon />
      <Typography>画像を選択</Typography>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={props.onChange}
        accept="image/*"
        capture={capture}
        id={`upload-button-${props.name}`}
      />
    </label>
  );
};

export default UploadLabel;

let bookName = "";
let authorName = "";
let image = "";

export const UploadLabelByBarcode = (props) => {
  const [camera, setCamera] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [result, setResult] = useState(null);

  const [error, setError] = useState(false);

  const [errorOpen, setErrorOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [imageBarcode, setImageBarcode] = useState();

  const { flagWhereFrom, setIsbnResult } = useContext(DataContext);

  const navigate = useNavigate();

  const onDetected = (result) => {
    setResult(result);
    setCamera(false);
  };
  const renderFlagRef2 = useRef(false);
  useEffect(() => {
    if (renderFlagRef2.current) {
      setCamera(false);
    } else {
      renderFlagRef2.current = true;
    }
  }, [error]);

  const getRakutenISBN = async (readISBN) => {
    const res = await rakutenApi(readISBN).catch((error) => {
      setSnackMessage("書籍情報の取得に失敗しました");
      setErrorOpen(true);
      setCamera(true);
      setInfoOpen(false);
    });
    if (res.data.Items.length == 0) {
      setSnackMessage("書籍情報がないため、情報なしとして登録してください");
      setErrorOpen(true);
      setCamera(true);
      setInfoOpen(false);
      authorName = "情報なし";
      bookName = "情報なし";
      image = noimage;
    } else {
      authorName = res.data.Items[0].Item.author;
      bookName = res.data.Items[0].Item.title;
      image = res.data.Items[0].Item.mediumImageUrl;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    setInfoOpen(true);
  };

  // 初回レンダリングで走らせないためのフラグ
  const renderFlagRef = useRef(false);
  useEffect(() => {
    if (renderFlagRef.current) {
      if (result.length == 13 && result.slice(0, 3) == "978") {
        getRakutenISBN(result);
      } else {
        setSnackMessage(
          "978で始まるバーコードのみ読み取られるようにして、もう一度試してみてください"
        );
        setErrorOpen(true);
        setError(!error);
        setCamera(true);
        setInfoOpen(false);
      }
    } else {
      renderFlagRef.current = true;
    }
  }, [result]);

  const handleCloseCamera = () => {
    setCamera(false);
  };
  const handleCloseInfo = () => {
    setInfoOpen(false);
  };

  const handleClickOk = async () => {
    setIsbnResult({
      author: authorName,
      title: bookName,
      imageUrl: image,
      isbn: result,
    });
    flagWhereFrom("fromIsbn");
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate("/detailbook");
    setInfoOpen(false);
  };
  const handleClickAgain = () => {
    setInfoOpen(false);
    setCamera(true);
  };

  const handleChangeBarcode = async (event) => {
    const { name, files } = event.target;
    setImageBarcode(files[0]);
    await new Promise((resolve) => setTimeout(resolve, 500));
    event.target.value = "";
    setCamera(true);
  };

  return (
    <>
      <UploadLabel name="barcode" capture="camera" onChange={handleChangeBarcode} />

      <Dialog open={camera} onClose={handleCloseCamera}>
        <Scanner
          onDetected={onDetected}
          image={imageBarcode}
          error={error}
          setError={setError}
          setSnackMessage={setSnackMessage}
          setErrorOpen={setErrorOpen}
        />
      </Dialog>
      <Dialog open={infoOpen} onClose={handleCloseInfo}>
        <Box textAlign="center" sx={{ m: 2 }}>
          <Typography>こちらの書籍で正しいですか？</Typography>
          <Typography>書籍名：{bookName}</Typography>
          <Typography>著者名：{authorName}</Typography>
          <img src={image} alt="表紙" style={{ width: "120px" }} />
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
      <Snackbar
        message={snackMessage}
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        autoHideDuration={6000}
      />
    </>
  );
};
