import React, { useContext } from "react";
import {
  Box,
  Grid,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  Snackbar,
} from "@mui/material";

import { useState } from "react";

import Header from "./components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

// カスタムデザイン
const SignupTextField = styled(TextField)({
  "& label": {
    color: "#FDFEFF",
    opacity: "0.5",
  },
  background: "#262628",
  borderRadius: "10px",
  margin: "10px 0",
});
const SignupSelect = styled(Select)({
  background: "#262628",
  borderRadius: "10px",
  margin: "10px 0",
});

// 生年月日用配列の作成
var yearList = [];
var monthList = [];
var dateList = [];
for (let i = 1920; i <= 2022; i++) {
  yearList.push(i);
}
for (let i = 1; i <= 12; i++) {
  monthList.push(i);
}
for (let i = 1; i <= 31; i++) {
  dateList.push(i);
}

const Signup = () => {
  const { login, baseUrl } = useContext(AuthContext);

  const [sex, setSex] = useState("男");
  const [birthday, setBirthday] = useState({
    year: 1990,
    month: 4,
    date: 1,
  });

  const [successModal, setSuccessModalOpen] = useState(false);

  const [errorOpen, setErrorOpen] = useState(false);

  // リダイレクト
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post(`${baseUrl.user}/regist`, {
        mail_addr: data.get("email"),
        password: data.get("password"),
        name: data.get("name"),
        birth: `${birthday.year}/${birthday.month}/${birthday.date}`,
        income: Number(data.get("income")),
        profession: data.get("job"),
      })
      .then(() => {
        setSuccessModalOpen(true);
        login(data.get("email"), data.get("password"));
        setTimeout(() => {
          navigate("/mysentence", { replace: true });
        }, 5000);
      })
      .catch((err) => {
        setErrorOpen(true);
      });
  };

  const handleClose = () => {
    setSuccessModalOpen(false);
  };

  return (
    <div>
      <Header HeaderName="会員登録" />
      <Box sx={{ width: "100%", px: "20px" }}>
        <Box component="form" onSubmit={handleSubmit}>
          <SignupTextField
            name="email"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            autoComplete="****@example.com"
            autoFocus
          />
          <SignupTextField
            name="password"
            required
            fullWidth
            id="password"
            label="パスワード"
            type="password"
            autoComplete="new-password"
          />
          <SignupTextField
            name="name"
            required
            fullWidth
            id="name"
            label="ペンネーム"
            autoComplete="name"
          />
          <SignupSelect
            value={sex}
            required
            onChange={(event) => setSex(event.target.value)}
            id="sexInput"
            fullWidth
          >
            <MenuItem value="性別">性別</MenuItem>
            <MenuItem value="女">女</MenuItem>
            <MenuItem value="男">男</MenuItem>
          </SignupSelect>

          <Typography variant="caption">生年月日</Typography>
          <Grid container>
            <Grid item xs={3}>
              <SignupSelect
                value={birthday.year}
                onChange={(event) =>
                  setBirthday({ ...birthday, year: event.target.value })
                }
                id="yearInput"
                fullWidth
                required
              >
                {yearList.map((index, key) => (
                  <MenuItem value={index} key={key}>
                    {index}
                  </MenuItem>
                ))}
              </SignupSelect>
            </Grid>
            <Grid item xs={1} sx={{ position: "relative" }}>
              <Typography sx={{ position: "absolute", bottom: 0, mb: 2 }}>
                年
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <SignupSelect
                value={birthday.month}
                onChange={(event) =>
                  setBirthday({ ...birthday, month: event.target.value })
                }
                id="monthInput"
                fullWidth
                required
              >
                {monthList.map((index, key) => (
                  <MenuItem value={index} key={key}>
                    {index}
                  </MenuItem>
                ))}
              </SignupSelect>
            </Grid>
            <Grid item xs={1} sx={{ position: "relative" }}>
              <Typography sx={{ position: "absolute", bottom: 0, mb: 2 }}>
                月
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <SignupSelect
                value={birthday.date}
                onChange={(event) =>
                  setBirthday({ ...birthday, date: event.target.value })
                }
                id="dateInput"
                fullWidth
                required
              >
                {dateList.map((index, key) => (
                  <MenuItem value={index} key={key}>
                    {index}
                  </MenuItem>
                ))}
              </SignupSelect>
            </Grid>
            <Grid item xs={1} sx={{ position: "relative" }}>
              <Typography sx={{ position: "absolute", bottom: 0, mb: 2 }}>
                日
              </Typography>
            </Grid>
          </Grid>

          <SignupTextField
            name="job"
            required
            fullWidth
            id="job"
            label="職業"
            autoComplete="役員"
          />
          <SignupTextField
            name="income"
            required
            fullWidth
            id="income"
            label="年収帯"
            autoComplete="400"
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography>
              アカウントを作成すると、サービス利用規約に同意したことになります。
            </Typography>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: "50px" }}
          >
            送信
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Typography>確認メールが届かない方はこちら</Typography>
          </Box>
        </Box>
      </Box>

      {/* 送信成功モーダル */}
      <Dialog
        open={successModal}
        onClose={handleClose}
        fullWidth
        sx={{ textAlign: "center", minHeight: "40vh" }}
      >
        <DialogTitle>登録に成功しました！</DialogTitle>
        <Box sx={{ mx: 3, "& button": { my: 1 } }}>
          <Typography sx={{ mb: 3 }}>
            まもなくマイセンテンス画面に遷移します。
          </Typography>
          {/* <Link to="/mysentence" style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              sx={{ borderRadius: "10px" }}
            >
              OK
            </Button>
          </Link>
          <Button
            variant="outlined"
            fullWidth
            sx={{ borderRadius: "10px" }}
            onClick={handleClose}
          >
            Eメールアドレスを編集
          </Button> */}
        </Box>
      </Dialog>
      {/* 送信エラー時のスナックバー */}
      <Snackbar
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        message="登録に失敗しました"
        autoHideDuration={6000}
      />
    </div>
  );
};

export default Signup;
