import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";

const Search = (props) => {
  const { label } = props;

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "90%",
          backgroundColor: "#262628",
          alignItems: "flex-end",
          borderRadius: 2,
          mt: 1,
          pr: 1,
        }}
      >
        <SearchIcon sx={{ color: "primary", mr: 1, my: 1 }} />
        <TextField
          id="standard-basic"
          label={label}
          variant="standard"
          focused
          value={value}
          onChange={handleChange}
          fullWidth
        />
      </Box>
    </>
  );
};

export default Search;