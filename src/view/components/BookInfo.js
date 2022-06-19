import React from "react";
import { Box, Typography } from "@mui/material";

import BookFace from "./BookFace";

const BookInfo = (props) => {
  return (
    <Box sx={{ display: "flex", mx: 2, mt: 2 }}>
      <Box sx={{ width: "13%", mx: 2 }}>
        {" "}
        {/* 45/(375-20*2)=0.134 */}
        {/* <BookFace src={pic} /> */}
        <BookFace src={props.sentence.imageUrl} />
      </Box>
      <Box sx={{ my: 1, width: "67%" }}>
        <Typography variant="h6">{props.sentence.title}</Typography>
        <Typography variant="p">{props.sentence.author}</Typography>
      </Box>
    </Box>
  );
};

export default BookInfo;
