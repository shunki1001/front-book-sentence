import { Box, Button, DialogTitle } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const BeforeRegistModalContent = () => {
  return (
    <>
      <DialogTitle color="secondary">送信が完了しました！</DialogTitle>
      <Box sx={{ mx: 3, "& button": { my: 1 } }}>
        <Link to="/listbook" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            sx={{ borderRadius: "10px" }}
          >
            連続で投稿する
          </Button>
        </Link>
        <Link to="/mysentence" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ borderRadius: "10px" }}
          >
            マイセンテンスに戻る
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default BeforeRegistModalContent;
