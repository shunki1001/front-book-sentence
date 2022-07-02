import React from "react";
import { useState, useEffect, useRef, useContext } from "react";

import Tags from "@yaireo/tagify/dist/react.tagify"; // React-wrapper file
import "@yaireo/tagify/dist/tagify.css"; // Tagify CSS

import {
  Box,
  Divider,
  IconButton,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  TextField,
  Snackbar,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { Link, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import BookFace from "./components/BookFace";
import UploadLabel from "./components/UploadLabel";
import CropperComponent from "../cropper/CropperComponent";
import BeforeRegistModalContent from "./components/BeforeRegistModalContent";
import { DataContext } from "../contexts/DataContext";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

// 楽天APIからの書籍情報を一時的に格納する変数
let InfoBook = {};
let tagList = [];

const DetailBook = () => {
  const { editingSentence, isbnResult, checkFlag } = useContext(DataContext);
  const { baseUrl, token, userid, updateItem, setUpdateItem } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [sentence, setSentence] = useState({});

  // どこのページから遷移してきたかで初期値を設定
  useEffect(() => {
    if (checkFlag.current === 1) {
      setSentence({
        title: editingSentence[0].title,
        author: editingSentence[0].author,
        imageUrl: editingSentence[0].imageUrl,
        quote_sentence: editingSentence[0].quote_sentence,
        isbn: editingSentence[0].isbn,
        memo: editingSentence[0].memo,
        tags: editingSentence[0].tags.map((item) => item.tag),
        commentary: "コメント",
        release_flg: "1",
      });
      tagList = editingSentence[0].tags.map((item) => item.tag);
      InfoBook = {
        title: editingSentence[0].title,
        author: editingSentence[0].author,
        imageUrl: editingSentence[0].imageUrl,
      };
    } else if (checkFlag.current === 2) {
      console.log(isbnResult);
      setSentence({
        title: isbnResult.title,
        author: isbnResult.author,
        imageUrl: isbnResult.imageUrl,
        quote_sentence: "",
        memo: "",
        tags: [],
        isbn: isbnResult.isbn,
        commentary: "コメント",
        release_flg: "1",
      });
      tagList = [];
      InfoBook = {
        title: isbnResult.title,
        author: isbnResult.author,
        imageUrl: isbnResult.imageUrl,
        quote_sentence: "",
        memo: "",
        tags: [],
      };
      console.log(InfoBook);
    } else {
      navigate("/mysentence", { replace: true });
    }
  }, []);

  // 画像アップロード
  const [postFileData, setPostFileData] = useState();
  const [croppedData, setCroppedData] = useState();

  // Modalトリガー
  const [open, setOpen] = useState(false);
  const [cameraModal, setCameraModal] = useState(false);
  const [cropModal, setCropModal] = useState(false);

  // Snackbarトリガー
  const [toolApiOpen, setToolApiOpen] = useState(false);
  const [registApiOpen, setRegistApiOpen] = useState(false);

  // 送信時の挙動
  const handleClickOpenSendModal = async () => {
    let sendData = { ...sentence, tags: tagList };
    if (checkFlag.current === 1) {
      console.log(InfoBook);
      await axios
        .patch(
          `${baseUrl.sentence}/${editingSentence[0].sentence_id}/update`,
          sendData,
          {
            headers: {
              "X-CSRF-ACCESS-TOKEN": token,
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          setOpen(true);
          console.log(res.data.info);
          setUpdateItem({
            ...res.data.info,
            title: editingSentence[0].title,
            author: editingSentence[0].author,
            imageUrl: editingSentence[0].imageUrl,
          });
        })
        .catch((err) => setRegistApiOpen(true));
    } else if (checkFlag.current === 2) {
      console.log("ISBNから");
      console.log(InfoBook);
      await axios
        .post(
          `${baseUrl.sentence}/regist`,
          { ...sendData, user_id: userid },
          {
            headers: {
              "X-CSRF-ACCESS-TOKEN": token,
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          setOpen(true);
          console.log(res.data.info);
          setUpdateItem({
            ...res.data.info,
            title: isbnResult.title,
            author: isbnResult.author,
            imageUrl: isbnResult.imageUrl,
          });
        })
        .catch((err) => setRegistApiOpen(true));
    } else {
      console.log("連続投稿");
      await axios
        .post(
          `${baseUrl.sentence}/regist`,
          { ...sendData, user_id: userid },
          {
            headers: {
              "X-CSRF-ACCESS-TOKEN": token,
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          setOpen(true);
          console.log(res.data.info);
          setUpdateItem({ ...res.data.info, ...InfoBook });
        })
        .catch((err) => setRegistApiOpen(true));
    }
  };
  const handleClose = () => {
    setOpen(false);
    setCameraModal(false);
    setCropModal(false);
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
      var formData = new FormData();
      formData.append("image", croppedData);
      console.log(formData);
      // 画像が切り抜かれたら、画像解析APIを叩いて、コンテンツの文字をゲット
      axios
        .post(`${baseUrl.tool}/character-reader`, formData, {
          headers: {
            "X-CSRF-ACCESS-TOKEN": token,
          },
        })
        .then((res) => {
          console.log(res.data.info.text);
          setSentence({ ...sentence, quote_sentence: res.data.info.text });
        })
        .catch((err) => {
          setToolApiOpen(true);
        });
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
          <BookFace src={sentence.imageUrl} />
        </Box>
        <Box sx={{ my: 1, maxWidth: "195px" }} flexGrow={1}>
          <Typography variant="h6">{sentence.title}</Typography>
          <Typography variant="p">{sentence.author}</Typography>
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
          value={sentence.quote_sentence}
          onChange={(evt) =>
            setSentence({ ...sentence, quote_sentence: evt.target.value })
          }
        />
        <Divider variant="middle" />
        <Typography variant="caption">メモ</Typography>
        <TextField
          id="memoForm"
          fullWidth
          multiline
          value={sentence.memo}
          onChange={(evt) =>
            setSentence({ ...sentence, memo: evt.target.value })
          }
        />
        <Divider variant="middle" />
        <Typography variant="caption">タグ</Typography>
        <Tags
          defaultValue={tagList}
          onChange={(e) => {
            tagList = e.detail.tagify.value.map((item) => {
              return item.value;
            });
          }}
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

      {/* 送信後ダイアログ */}
      <Dialog open={open} fullWidth sx={{ textAlign: "center" }}>
        <BeforeRegistModalContent setOpen={setOpen} />
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

      {/* API通信エラー時 */}
      <Snackbar
        message="センテンスの取得に失敗しました"
        open={toolApiOpen}
        onClose={() => setToolApiOpen(false)}
      />
      <Snackbar
        message="登録に失敗しました"
        open={registApiOpen}
        onClose={() => setRegistApiOpen(false)}
      />
    </div>
  );
};

export default DetailBook;
