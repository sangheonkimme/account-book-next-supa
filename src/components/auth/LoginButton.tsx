"use client";

import { Button } from "@mui/material";
import { createSupabaseBrowserClient } from "@/lib/client/supabase";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginButton() {
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
    <Button
      type="button"
      variant="contained"
      startIcon={<GoogleIcon />}
      onClick={handleGoogleLogin}
      sx={{ width: "100px", padding: "12px" }}
    >
      로그인
    </Button>
  );
}
