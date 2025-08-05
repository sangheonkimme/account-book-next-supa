import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// - ServerActions, RouterHandler
export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      // main supabase.auth.getSession에서 에러 발생으로 공식문서 참고 후 적용 - https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=environment&environment=server#create-a-client
      set(name: string, value: string, options) {
        try {
          cookieStore.set(name, value, options);
        } catch (error) {
          console.log(error);
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch (error) {
          console.log(error);
        }
      },
    },
  });
};
