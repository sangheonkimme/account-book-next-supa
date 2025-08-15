"use client";

import { Button } from "@mantine/core";
import { createSupabaseBrowserClient } from "@/lib/client/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthButton() {
  const [session, setSession] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const supabase = await createSupabaseBrowserClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session ? true : false);
    };

    checkSession();
  }, []);

  const handleLogin = async () => {
    const supabase = await createSupabaseBrowserClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleLogout = async () => {
    const supabase = await createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  return session ? (
    <Button onClick={handleLogout}>로그아웃</Button>
  ) : (
    <Button onClick={handleLogin}>로그인</Button>
  );
}
