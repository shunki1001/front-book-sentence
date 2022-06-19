import React from "react";
const BookFace = (props) => {
  const { src, alt } = props;

  return (
    <img src={src} alt={alt} style={{ width: "100%", borderRadius: "5px" }} />
  );
};

export default BookFace;
