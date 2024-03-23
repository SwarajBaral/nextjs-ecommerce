import { Metadata } from "next";
import React from "react";
import SignupClient from "./client";

export const metadata: Metadata = {
  title: "Turnover | Signup",
  description: "Signup page for turnover",
};

const Signup = () => {
  return (
    <>
      <SignupClient />
    </>
  );
};

export default Signup;
