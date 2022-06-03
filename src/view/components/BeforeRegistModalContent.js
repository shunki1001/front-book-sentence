import { Box, Button, DialogTitle } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";

const BeforeRegistModalContent = (props) => {
  const { flagWhereFrom } = useContext(DataContext);

  return (
    <>
      <DialogTitle>送信が完了しました！</DialogTitle>
      <Box sx={{ mx: 3, "& button": { my: 1 } }}>
        <Link to="/detailbook" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            sx={{ borderRadius: "10px" }}
            onClick={() => {
              flagWhereFrom("fromContinue");
              props.setOpen(false);
            }}
          >
            連続で投稿する
          </Button>
        </Link>
        <Link to="/mysentence" style={{ textDecoration: "none" }}>
          <Button variant="outlined" fullWidth sx={{ borderRadius: "10px" }}>
            マイセンテンスに戻る
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default BeforeRegistModalContent;
