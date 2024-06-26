"use client";
import Link from "next/link";
import React, { useState } from "react";
import Loader from "~/components/loader";
import Popup from "~/components/popup";
import { loginAction } from "../auth-actions";
import { useFormStatus } from "react-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginClient = () => {
  const [error, setError] = useState<{
    message: string;
    type: "error" | "info" | "success";
  } | null>();
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const formAction = async (formData: FormData) => {
    const pass = String(formData.get("password"));
    if (pass.length < 8) {
      setError({
        message: "Password should be at least 8 chars long",
        type: "error",
      });
      setBtnDisabled(false);
      return;
    }
    setBtnDisabled(true);
    const loginRes = await loginAction(formData);
    if (loginRes.type === "error") {
      setError({ message: loginRes.message, type: "error" });
    }
    setBtnDisabled(false);
  };
  return (
    <>
      {error ? (
        <Popup
          message={error.message}
          type={error.type}
          onClose={() => setError(null)}
          buttonMsg="Retry"
        />
      ) : null}
      <div className="flex h-full min-h-screen flex-col items-center justify-center">
        <div className="w-96 rounded-lg border border-[#c3c3c3] bg-white p-8 shadow-md md:w-1/3">
          <h2 className="mb-2 text-center text-2xl font-semibold">
            Welcome Back
          </h2>
          <form action={formAction}>
            <div className="mb-4">
              <label htmlFor="email" className="mb-2 block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-md border border-[#c3c3c3] px-3 py-2 focus:border-blue-500 focus:outline-none"
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="mb-2 block text-gray-700">
                Password
              </label>
              <div className="flex items-center justify-center gap-2">
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full rounded-md border border-[#c3c3c3] px-3 py-2 focus:border-blue-500 focus:outline-none"
                  min={8}
                  required
                  placeholder="Enter your password"
                />
                <div
                  className="cursor-pointer rounded border-t-neutral-700 bg-blue-400 p-2 text-sm text-white shadow-md hover:bg-blue-300"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>
            <div className="center mb-2 text-center">
              <span className="w-full rounded-md px-3">
                Don&apos;t have an account ?
                <Link
                  href={"/auth/signup"}
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Signup
                </Link>
              </span>
            </div>
            <div>
              <button
                type="submit"
                disabled={btnDisabled}
                className="flex w-full items-center justify-center rounded-md bg-green-900 px-4 py-2 text-white hover:bg-slate-700 focus:bg-slate-700 focus:outline-none"
              >
                {btnDisabled ? <Loader /> : null}
                <span className="mx-2">LOGIN</span>
              </button>
            </div>
            <div className="mt-2 text-center">
              <span className="w-full rounded-md px-3 text-center text-sm">
                <Link
                  href={"/auth/signup"}
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Forgotten Password ?
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginClient;
