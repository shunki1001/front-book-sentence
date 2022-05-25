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
} from "@mui/material";
import { Link } from "react-router-dom";

import { useState } from "react";

import Header from "./components/Header";

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
  const [sex, setSex] = useState("性別");
  const [birthday, setBirthday] = useState({
    year: 1990,
    month: 4,
    date: 1,
  });

  const [successModal, setSuccessModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    setSuccessModalOpen(true);
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
          <Typography variant="caption">万円</Typography>
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
        sx={{ textAlign: "center" }}
      >
        <DialogTitle color="secondary">
          確認用のメールを送信しました！
        </DialogTitle>
        <Box sx={{ mx: 3, "& button": { my: 1 } }}>
          <Typography color="secondary" sx={{ mb: 3 }}>
            これを行うにはメールの確認が必要です。メール受信箱を確認して説明に従ってください。メールは以下のメールアドレスへ送信されました。
          </Typography>
          <Link to="/mysentence" style={{ textDecoration: "none" }}>
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
            color="secondary"
            fullWidth
            sx={{ borderRadius: "10px" }}
            onClick={handleClose}
          >
            Eメールアドレスを編集
          </Button>
        </Box>
      </Dialog>
    </div>
  );
};

export default Signup;
