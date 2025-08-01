"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "../lib/supabaseServer";

export async function addTransaction(formData: FormData) {
  const supabase = createSupabaseServerClient();

  const rawFormData = {
    date: formData.get("date") as string,
    description: formData.get("description") as string,
    amount: parseFloat(formData.get("amount") as string),
    type: formData.get("type") as "income" | "expense",
  };

  if (!rawFormData.date || !rawFormData.description || !rawFormData.amount) {
    return {
      success: false,
      message: "모든 필드를 입력해주세요.",
    };
  }

  const { error } = await supabase.from("transactions").insert([rawFormData]);

  if (error) {
    console.error("Error adding transaction:", error);
    return {
      success: false,
      message: "거래 추가 중 오류가 발생했습니다.",
    };
  }

  revalidatePath("/");
  return {
    success: true,
    message: "거래가 성공적으로 추가되었습니다.",
  };
}

export async function deleteTransaction(id: number) {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.from("transactions").delete().match({ id });

  if (error) {
    console.error("Error deleting transaction:", error);
    return {
      success: false,
      message: "거래 삭제 중 오류가 발생했습니다.",
    };
  }

  revalidatePath("/");
  return {
    success: true,
    message: "거래가 성공적으로 삭제되었습니다.",
  };
}