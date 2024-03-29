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
        {props.rakuten ? (
          <BookFace src={props.sentence.Item.mediumImageUrl} />
        ) : (
          <BookFace src={props.sentence.imageUrl} />
        )}
      </Box>
      <Box sx={{ my: 1, width: "67%" }}>
        {props.rakuten ? (
          <Typography variant="h6">{props.sentence.Item.title}</Typography>
        ) : (
          <Typography variant="h6">{props.sentence.title}</Typography>
        )}
        {props.rakuten ? (
          <Typography variant="p">{props.sentence.Item.author}</Typography>
        ) : (
          <Typography variant="p">{props.sentence.author}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default BookInfo;
