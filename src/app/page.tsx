import { createSupabaseServerClient } from "@/lib/supabase";
import AccountBook from "@/components/pages/AccountBook";

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
      .order("id", { ascending: false })
      .order("date", { ascending: false });
    transactions = data || [];
  }

  return (
    <AccountBook
      initialTransactions={transactions}
      session={session ? true : false}
    />
  );
}
