import React from "react";

import { IconButton, Toolbar, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

import { Link } from "react-router-dom";

const Header = (props) => {
  const { HeaderName, addBook } = props;
  return (
    <>
      <Toolbar
        sx={{
          p: 0,
          px: "20px",
          position: "fixed",
          zIndex: "9999",
          width: "375px",
          backgroundColor: "#0a0a0a",
        }}
      >
        <Link to="/mysentence">
          <IconButton>
            <HomeIcon />
          </IconButton>
        </Link>
        <Typography variant="h6" sx={{ flexGrow: 1 }} align="center">
          {HeaderName}
        </Typography>
        {addBook ? (
          <Link to="/listbook">
            <IconButton>
              <BookmarkAddIcon />
            </IconButton>
          </Link>
        ) : (
          ""
        )}
        <Link to="/mypage">
          <IconButton>
            <PersonIcon />
          </IconButton>
        </Link>
      </Toolbar>
      <div style={{ width: "375px", height: "56px" }}></div>
    </>
  );
};

export default Header;
