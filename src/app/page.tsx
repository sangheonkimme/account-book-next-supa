import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { createSupabaseServerClient } from "@/lib/supabase";
import LoginButton from "@/components/auth/LoginButton";
import LogoutButton from "../components/auth/LogoutButton";
import AccountBook from "../components/pages/AccountBook";

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let transactions = [];
  if (session) {
    const { data } = await supabase
      .from("transactions")
      .select("*")
      .order("date", { ascending: false });
    transactions = data || [];
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Account Book
          </Typography>
          {session ? <LogoutButton /> : <LoginButton />}
        </Toolbar>
      </AppBar>
      <AccountBook
        initialTransactions={transactions}
        session={session ? true : false}
      />
    </Box>
  );
}
