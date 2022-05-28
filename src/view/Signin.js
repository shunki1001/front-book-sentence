import {
  Box,
  Button,
  styled,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const SigninTextField = styled(TextField)({
  "& label": {
    color: "#FDFEFF",
    opacity: "0.5",
  },
  background: "#262628",
  borderRadius: "10px",
  margin: "10px 0",
});

const Signin = () => {
  const { isAuth, login, tryLogin } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // ユーザー情報取得APIをたたく
    console.log();
    // 成功レスポンスが返ってきたら、
    login(data.get("email"), data.get("password"));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ mt: 10, mx: 3 }}
      textAlign="center"
    >
      <Typography variant="h2">Sign In</Typography>
      <SigninTextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <SigninTextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Link href="#" variant="body2">
        Forgot password?
      </Link>
      {tryLogin ? (
        <Typography color="error">ログインに失敗しました</Typography>
      ) : (
        <></>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
      <Typography>Don't have an account?</Typography>
      <Link href="/signup" variant="body2">
        {"Sign Up"}
      </Link>
    </Box>
  );
};

export default Signin;
