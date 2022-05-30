import { Box, Typography } from "@mui/material";

import BookFace from "./BookFace";
import pic from "../../static/images/example-book.png";

const BookInfo = (props) => {
  return (
    <Box sx={{ display: "flex", mx: 2, mt: 2 }}>
      <Box sx={{ width: "13%", mx: 2 }}>
        {" "}
        {/* 45/(375-20*2)=0.134 */}
        <BookFace src={pic} />
        {/* <BookFace src={props.sentence.author} /> */}
      </Box>
      <Box sx={{ my: 1 }}>
        <Typography variant="h6">起業の科学{props.sentence.title}</Typography>
        <Typography variant="p">田所雅之{props.sentence.memo}</Typography>
      </Box>
    </Box>
  );
};

export default BookInfo;
