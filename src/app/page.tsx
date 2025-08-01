import AccountBook from "../components/pages/AccountBook";
import { createSupabaseServerClient } from "../lib/supabaseServer";

export default async function Home() {
  const supabase = createSupabaseServerClient();
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false });

  return <AccountBook initialTransactions={transactions || []} />;
}