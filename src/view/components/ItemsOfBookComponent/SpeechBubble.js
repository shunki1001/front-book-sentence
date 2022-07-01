import React from "react";
import { Box, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { useState } from "react";
import Overlay from "./Overlay";

// 吹き出しのスタイル
const babbleStyle = {
  position: "relative",
  display: "inline-block",
  padding: " 5px 0px",
  width: "100%",
  minHeight: "108px",
  background: "#262628",
  borderRadius: "10px",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "-30px",
    marginTop: "-15px",
    border: "15px solid transparent",
    borderRight: "15px solid #262628",
  },
};

const SpeechBubble = (props) => {
  const { content } = props;
  const indexShownString = 70;

  const [openContent, setOpenContent] = useState(false);

  const handleClick = () => {
    setOpenContent(!openContent);
  };

  if (content.length < 70) {
    return (
      <Box sx={babbleStyle}>
        <div
          style={{
            overflowWrap: "break-word",
            paddingBottom: "8px",
            position: "relative",
          }}
        >
          {content}
        </div>
      </Box>
    );
  } else {
    return (
      <Box sx={babbleStyle}>
        <div
          style={{
            overflowWrap: "break-word",
            paddingBottom: "8px",
            position: "relative",
          }}
        >
          {content.slice(0, indexShownString)}
          {openContent === true ? (
            <>{content.slice(indexShownString)}</>
          ) : (
            <>
              ...
              <Overlay styleFor="content" />
            </>
          )}
          <span style={{ position: "absolute", bottom: 0, right: 0 }}>
            {openContent === true ? (
              <IconButton onClick={handleClick} sx={{ px: 0, zIndex: 20 }}>
                <ExpandLessIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleClick} sx={{ px: 0, zIndex: 20 }}>
                <ExpandMoreIcon />
              </IconButton>
            )}
          </span>
        </div>
      </Box>
    );
  }
};

export default SpeechBubble;
