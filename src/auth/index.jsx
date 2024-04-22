import React, { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "../theme";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { mode } = React.useContext(ColorModeContext);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        margin: "auto",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: theme.palette.text.primary }}
      >
        Login
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "300px",
          backgroundColor: theme.palette.background.paper,
          borderRadius: "6px",
          padding: "16px",
          boxShadow: theme.shadows[1],
        }}
      >
        {error && (
          <Typography
            variant="body2"
            color={mode === "dark" ? "error.light" : "error.dark"}
            gutterBottom
          >
            {error}
          </Typography>
        )}
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            marginTop: "8px",
            borderRadius: "4px",
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
