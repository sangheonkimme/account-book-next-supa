"use client";

import { Button } from "@mui/material";
import { logout } from "@/actions/auth";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <Button type="submit" variant="outlined" color="inherit">
        로그아웃
      </Button>
    </form>
  );
}
