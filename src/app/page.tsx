import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { createSupabaseServerClient } from "@/lib/supabase";
import AuthButton from "@/components/auth/AuthButton";
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
          {/* login | logout 버튼 렌더링 시 supabase client / server action 차이로 하이드레이션 이슈 발생 -> AuthButton 변경 */}
          <AuthButton />
        </Toolbar>
      </AppBar>
      <AccountBook
        initialTransactions={transactions}
        session={session ? true : false}
      />
    </Box>
  );
}
