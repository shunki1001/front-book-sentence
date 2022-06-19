import React from "react";
import { useState } from "react";

import { Typography, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import Overlay from "./Overlay";

const MemoComponent = (props) => {
  const { content } = props;
  const indexShownString = 70;

  const [memoOpen, setMemoOpen] = useState(false);

  const handleClick = () => {
    setMemoOpen(!memoOpen);
  };

  if (content.length < 70) {
    return (
      <>
        <Typography variant="h6">Memo</Typography>
        <div
          style={{
            overflowWrap: "break-word",
            paddingBottom: "8px",
            paddingTop: "8px",
            position: "relative",
            width: "100%",
          }}
        >
          {content}
        </div>
      </>
    );
  } else {
    return (
      <>
        <Typography variant="h6">Memo</Typography>
        <div
          style={{
            overflowWrap: "break-word",
            paddingBottom: "8px",
            paddingTop: "8px",
            position: "relative",
            width: "100%",
          }}
        >
          {content.slice(0, indexShownString)}
          {memoOpen === true ? (
            <>{content.slice(indexShownString)}</>
          ) : (
            <>
              ...
              <Overlay props="memo" />
            </>
          )}
          <span style={{ position: "absolute", bottom: 0, right: 0 }}>
            {memoOpen === true ? (
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
      </>
    );
  }
};

export default MemoComponent;
