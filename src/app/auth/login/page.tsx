import React from "react";
import LoginClient from "./client";
import { getSession, login } from "lib";
import { redirect } from "next/navigation";

type Props = {};

export const metadata = {
  title: "Turnover",
  description: "Ecommerce for the masses",
};

const Login = async (props: Props) => {
  const session = await getSession();
  if (session) {
    redirect("/onboarding/interests");
  }
  const loginAction = async (formData: FormData) => {
    "use server";
    await login(formData);
  };
  return (
    <>
      <LoginClient login={loginAction} />
    </>
  );
};

export default Login;
