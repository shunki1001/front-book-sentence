import React from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box, Button, Dialog, Typography } from "@mui/material";
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

let bookName = "";
let authorName = "";
let image = "";

export const UploadLabelByBarcode = (props) => {
  const [camera, setCamera] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [result, setResult] = useState(null);

  const { flagWhereFrom, setIsbnResult } = useContext(DataContext);

  const navigate = useNavigate();

  const onDetected = (result) => {
    setResult(result);
    setCamera(false);
    // tempResult = result;
    // setTimeout(() => {
    //   if (tempResult.length === 13) {
    //     // 精度を上げるために日本の書籍に限定
    //     if (tempResult.slice(0, 4) === 9784) {
    //       console.log(tempResult);
    //       setResult(tempResult);
    //       setCamera(false);
    //       setInfoOpen(true);
    //     }
    //   }
    // }, 500);
  };

  const getRakutenISBN = async (readISBN) => {
    const res = await rakutenApi(readISBN).catch((error) => {
      alert("書籍情報の取得に失敗しました");
    });
    if (res.data.Items.length == 0) {
      alert("書籍情報がないため、情報なしとして登録してください");
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
      if (result.length == 13 && result.slice(0, 4) == "9784") {
        getRakutenISBN(result);
        console.log(result);
      } else {
        alert(
          "9784で始まるバーコードのみ読み取られるようにして、もう一度試してみてください"
        );
        setCamera(true);
        setInfoOpen(false);
      }
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

  const handleClickOk = async () => {
    console.log("OKボタン");
    setIsbnResult({
      author: authorName,
      title: bookName,
      imageUrl: image,
      isbn: result,
    });
    console.log(authorName);
    flagWhereFrom("fromIsbn");
    await new Promise((resolve) => setTimeout(resolve, 500));
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
    </>
  );
};
