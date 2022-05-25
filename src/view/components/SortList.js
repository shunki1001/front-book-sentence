import { List, ListItemButton, ListItemText, Divider } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import { useState } from "react";

const ListItemTextStyle = {
  "& p": { fontWeight: "Bold", fontSize: "16px", color: "#0a0a0a" },
};

const SortList = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSortClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <List sx={{ background: "#262628", borderRadius: "15px", p: 1, m: 1 }}>
      <ListItemText
        primary="並び替え"
        sx={{
          textAlign: "center",
          "& p": { fontWeight: "Bold", fontSize: "16px", color: "#0a0a0a" },
        }}
      />
      <Divider variant="middle" sx={{ borderColor: "#D5D5D5" }} />
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(event) => {
          handleSortClick(event, 0);
          // setTimeout(props.handleClickSort, 1000);
        }}
      >
        <ListItemText primary="書籍名昇順" sx={ListItemTextStyle} />
        {selectedIndex === 0 && <CheckIcon color="primary" />}
      </ListItemButton>
      <Divider variant="middle" sx={{ borderColor: "#D5D5D5" }} />
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event) => handleSortClick(event, 1)}
      >
        <ListItemText primary="タグ昇順" sx={ListItemTextStyle} />
        {selectedIndex === 1 && <CheckIcon color="primary" />}
      </ListItemButton>
      <Divider variant="middle" sx={{ borderColor: "#D5D5D5" }} />
      <ListItemButton
        selected={selectedIndex === 2}
        onClick={(event) => handleSortClick(event, 2)}
      >
        <ListItemText primary="最新順" sx={ListItemTextStyle} />
        {selectedIndex === 2 && <CheckIcon color="primary" />}
      </ListItemButton>
    </List>
  );
};

export default SortList;
