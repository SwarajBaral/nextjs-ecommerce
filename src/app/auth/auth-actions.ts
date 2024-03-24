"use server";
import { login } from "lib";
import { redirect } from "next/navigation";

export const loginAction = async (formData: FormData) => {
  const res = await login(formData);
  if (res.type === "success") {
    redirect("/onboarding/interests");
  }
  return res;
};

export async function navigateAction(url: string) {
  redirect(url);
}
