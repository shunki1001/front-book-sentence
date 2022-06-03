import { useContext, useState } from "react";

import { Box, Divider, IconButton, Snackbar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import BookFace from "./BookFace";
import SpeechBubble from "./ItemsOfBookComponent/SpeechBubble";
import MemoComponent from "./ItemsOfBookComponent/MemoComponent";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";

// 丸いアイコン
const circleButtonStyle = {
  backgroundColor: "#262628",
  borderRadius: "50%",
};

const BookComponent = (props) => {
  const [openCopy, setOpenCopy] = useState(false);

  const { setPassId, flagWhereFrom } = useContext(DataContext);
  const navigate = useNavigate();

  const editHandleClick = async (id) => {
    console.log(id);
    setPassId(id);
    flagWhereFrom("fromMy");
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate("/detailbook", { replace: true });
  };
  const copyHandleClick = () => {
    if (!navigator.clipboard) {
      alert("このブラウザは対応していません");
    } else {
      navigator.clipboard.writeText(props.sentence.quote_sentence);
      setOpenCopy(true);
    }
  };
  const handleCloseCopy = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenCopy(false);
  };

  return (
    <div id="invisibleSidebar" style={{ width: "100%", overflowX: "scroll" }}>
      {/* 650/375=173% */}
      <Box
        sx={{
          display: "flex",
          mt: 1,
          width: "173%",
          lineHeight: "20px",
          fontSize: "14px",
          "& div": { mx: 1 },
          "& hr": { mx: 1, my: 0.5 },
        }}
      >
        <Box sx={{ width: "9%", pl: 1, my: 4 }}>
          {" "}
          {/* 45/650=0.069 */}
          <BookFace src={props.sentence.imageUrl} />
        </Box>
        <Box sx={{ width: "38%", ml: 4, my: 1 }}>
          {" "}
          {/* 250/650=0.384 */}
          <SpeechBubble content={props.sentence.quote_sentence} />
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderWidth: 1, borderColor: "#FDFEFF" }}
        />
        <Box sx={{ width: "38%" }}>
          {" "}
          {/* 250/650=0.384 */}
          <MemoComponent content={props.sentence.memo} />
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderWidth: 1, borderColor: "#FDFEFF" }}
        />
        <Box sx={{ width: "6%", textAlign: "center" }}>
          {" "}
          {/* 36/650=0.055 */}
          <IconButton
            style={circleButtonStyle}
            onClick={() => editHandleClick(props.sentence.sentence_id)}
          >
            <EditIcon />
          </IconButton>
          <span style={{ fontSize: "10px" }}>編集</span>
          <IconButton style={circleButtonStyle} onClick={copyHandleClick}>
            <ContentCopyIcon />
          </IconButton>
          <span style={{ fontSize: "10px" }}>コピー</span>
        </Box>
      </Box>
      <Snackbar
        open={openCopy}
        onClose={handleCloseCopy}
        message="センテンスをコピー"
        autoHideDuration={5000}
      />
    </div>
  );
};

export default BookComponent;
