import { Box, Button, styled, TextField, Typography } from "@mui/material";
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
  const { isAuth, login } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login();
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
      {/* <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid> */}
    </Box>
  );
};

export default Signin;
