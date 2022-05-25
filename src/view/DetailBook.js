import { useState, useEffect, useRef } from "react";

import {
  Box,
  Divider,
  IconButton,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  TextField,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { Link } from "react-router-dom";

import Header from "./components/Header";
import BookFace from "./components/BookFace";
import pic from "../static/images/example-book.png";
import UploadLabel from "./components/UploadLabel";
import CropperComponent from "../cropper/CropperComponent";
import BeforeRegistModalContent from "./components/BeforeRegistModalContent";

const DetailBook = () => {
  // データ
  const [sentence, setSentence] = useState(
    "“スタートアップとは科学のように試行錯誤するものである。だからして経験談に基づく偶発的な思考をすることは非常に愚かだといわざるを得ない。"
  );
  const [memo, setMemo] = useState(
    "メモをここに表示します。メモをここに表示します。メモをここに表示します。メモをここに表示します。メモをここに表示します。メモをここに表示します。"
  );
  const [tag, setTag] = useState("#ビジネス #起業 #名言 ");

  // 画像アップロード
  const [postFileData, setPostFileData] = useState();
  const [croppedData, setCroppedData] = useState();

  // Modalトリガー
  const [open, setOpen] = useState(false);
  const [cameraModal, setCameraModal] = useState(false);
  const [cropModal, setCropModal] = useState(false);

  const handleClickOpenSendModal = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setCameraModal(false);
  };
  const handleClickCameraUpload = () => {
    setCameraModal(true);
  };
  const handleChangeUpload = async (event) => {
    const { name, files } = event.target;
    setPostFileData(files[0]);
    event.target.value = "";
    setCameraModal(false);
    setCropModal(true);
  };

  // 初回レンダリングで走らせないためのフラグ
  const renderFlagRef = useRef(false);
  useEffect(() => {
    if (renderFlagRef.current) {
      // 画像が切り抜かれたら、画像解析APIを叩いて、コンテンツの文字をゲット
      console.log("画像解析APIを叩くよ");
    } else {
      console.log("useEffectはまだ動かないよ");
      renderFlagRef.current = true;
    }

    // return () => {};
  }, [croppedData]);

  return (
    <div>
      <Header HeaderName="センテンス登録" />
      <Box
        sx={{
          display: "flex",
          mx: 2,
          my: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "13%", mx: 2 }}>
          {" "}
          {/* 45/(375-20*2)=0.134 */}
          <BookFace src={pic} />
        </Box>
        <Box sx={{ my: 1, maxWidth: "195px" }} flexGrow={1}>
          <Typography variant="h6">起業の科学</Typography>
          <Typography variant="p">田所雅之</Typography>
        </Box>
        <Box
          sx={{
            width: "70px",
            height: "70px",
            background: "#282826",
            borderRadius: "10px",
            textAlign: "center",
            p: 1,
          }}
        >
          <IconButton
            size="large"
            sx={{ pb: 0 }}
            onClick={handleClickCameraUpload}
          >
            <CameraAltIcon />
          </IconButton>
          <p style={{ fontSize: "10px", marginTop: 0 }}>（必須）</p>
        </Box>
      </Box>
      <Box sx={{ mx: 3, "& p": { my: 1, lineHeight: 1.5, fontSize: "16px" } }}>
        <Typography variant="caption">センテンス</Typography>
        <TextField
          id="sentenceForm"
          fullWidth
          multiline
          value={sentence}
          onChange={(evt) => setSentence(evt.target.value)}
        />
        <Divider variant="middle" />
        <Typography variant="caption">メモ</Typography>
        <TextField
          id="memoForm"
          fullWidth
          multiline
          value={memo}
          onChange={(evt) => setMemo(evt.target.value)}
        />
        <Divider variant="middle" />
        <Typography variant="caption">タグ</Typography>
        <TextField
          id="tagForm"
          fullWidth
          multiline
          value={tag}
          onChange={(evt) => setTag(evt.target.value)}
        />
        <Divider variant="middle" />
      </Box>
      <Box sx={{ mx: 3, mt: 6, "& button": { my: 1 } }}>
        <Button
          fullWidth
          variant="contained"
          sx={{ borderRadius: "10px", color: "#0a0a0a", fontSize: "20px" }}
          onClick={handleClickOpenSendModal}
        >
          送信
        </Button>
        <Link to="/listbook" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            fullWidth
            sx={{ borderRadius: "10px", fontSize: "20px" }}
          >
            戻る
          </Button>
        </Link>
      </Box>

      {/* 送信前ダイアログ */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        sx={{ textAlign: "center" }}
      >
        <BeforeRegistModalContent />
      </Dialog>

      {/* カメラアップロードダイアログ */}
      <Dialog
        open={cameraModal}
        onClose={handleClose}
        fullWidth
        sx={{ textAlign: "center" }}
      >
        <DialogTitle fontSize="small">
          センテンスをアップロードしてください
        </DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <UploadLabel name="sentence-upload" onChange={handleChangeUpload} />
          {/* <Box sx={{width: '100px',height:'70px', boxShadow: '5px 11px 15px -7px rgb(0 0 0 / 20%)', borderRadius: '10px', p:1, mx:1, mb:3}}>
            <IconButton size='large' sx={{pb:0, color:'#0A0A0A'}} ><CameraAltIcon /></IconButton>
            <p style={{fontSize: '10px', marginTop:0, color:'#0A0A0A'}}>写真を撮る</p>
          </Box>
          <Box sx={{width: '100px',height:'70px', boxShadow: '5px 11px 15px -7px rgb(0 0 0 / 20%)', borderRadius: '10px', p:1, mx:1, mb:3}}>
            <IconButton size='large' sx={{pb:0, color:'#0A0A0A'}}><PhotoLibraryIcon /></IconButton>
            <p style={{fontSize: '10px', marginTop:0, color:'#0A0A0A'}}>アルバムから選ぶ</p>
          </Box> */}
        </Box>
      </Dialog>

      {/* クロップモーダル */}
      <Dialog
        open={cropModal}
        onClose={handleClose}
        fullWidth
        sx={{ textAlign: "center" }}
      >
        <CropperComponent
          src={postFileData}
          setCroppedData={setCroppedData}
          setCropModal={setCropModal}
        />
      </Dialog>
    </div>
  );
};

export default DetailBook;
