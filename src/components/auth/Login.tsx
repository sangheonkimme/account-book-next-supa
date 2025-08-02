"use client";

import { Button, Container, Paper, Typography, Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { createSupabaseBrowserClient } from "@/lib/client/supabase";

export default function Login() {
  const handleGoogleLogin = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Typography component="h1" variant="h5">
          가계부 로그인
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            sx={{ padding: "12px" }}
          >
            Google 계정으로 로그인
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
