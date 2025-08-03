"use client";

import { useEffect, useState } from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { createSupabaseBrowserClient } from "@/lib/client/supabase";

export default function AuthBar() {
  const [session, setSession] = useState(false);

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

  return session ? <LogoutButton /> : <LoginButton />;
}
