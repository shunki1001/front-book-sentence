import { useContext, useState } from "react";
import PropTypes from "prop-types";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/system";

import Header from "./components/Header";
import { Button, Typography } from "@mui/material";

import pic from "../static/images/example-book.png";
import BookFace from "./components/BookFace";
import TendencyOfBook from "./graph/TendencyOfBook";
import RankOfTag from "./graph/RankOfTag";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// 本棚タブは未実装のため、一時的にDisabled
const styles = {
  MuiTabDisabled: {
    color: "#FDFEFF",
    opacity: "0.3",
  },
};

// TabPanel from mui document
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
// end of TabPanel

const MyPage = () => {
  const [value, setValue] = useState(1);
  const { logout, sentenceList, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickSignout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <>
      <Header HeaderName="マイページ" />

      <Box sx={{ width: "100%" }}>
        {/* タブの見出し */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab
              label="本棚"
              sx={{ width: "50%" }}
              style={styles.MuiTabDisabled}
              value={0}
              {...a11yProps(0)}
              disabled
            />
            <Tab
              label="レポート"
              sx={{ width: "50%" }}
              value={1}
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>

        {/* 本棚タブの中身 */}
        <TabPanel value={value} index={0}>
          本棚のタブ
        </TabPanel>

        {/* レポートタブの中身 */}
        <TabPanel value={value} index={1}>
          <Box sx={{ display: "flex" }}>
            {/* センテンス数 */}
            <Box
              sx={{
                border: "2px solid #707070",
                px: "8px",
                py: "16px",
                minWidth: "128px",
              }}
            >
              <Typography align="center">センテンス数</Typography>
              <Typography align="center">{sentenceList.length}</Typography>
            </Box>
            {/* お気に入りの3冊 */}
            <Box sx={{ flexGrow: 1, border: "2px solid #707070", px: "16px" }}>
              <Typography align="center">お気に入りの3冊</Typography>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ m: 1, display: "inline-block" }}>
                  <BookFace src={pic} />
                </Box>
                <Box sx={{ m: 1, display: "inline-block" }}>
                  <BookFace src={pic} />
                </Box>
                <Box sx={{ m: 1, display: "inline-block" }}>
                  <BookFace src={pic} />
                </Box>
              </Box>
            </Box>
          </Box>
          {/* 読書傾向 */}
          <Typography sx={{ my: 1 }}>読書傾向</Typography>
          <TendencyOfBook />
          {/* タグランキング */}
          <Typography sx={{ my: 1 }}>タグランキング</Typography>
          <RankOfTag />
        </TabPanel>
      </Box>
      <Box textAlign="center" sx={{ my: 3 }}>
        <Button onClick={handleClickSignout}>ログアウト</Button>
      </Box>
    </>
  );
};

export default MyPage;
