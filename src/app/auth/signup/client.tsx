"use client";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import Popup from "~/components/popup";
import { loginAction, navigateAction } from "../auth-actions";

const SignupClient = () => {
  const [popup, setPopup] = useState<{
    message: string;
    type: "error" | "success" | "info";
  } | null>(null);
  const [showPass, setShowPass] = useState<boolean>(false);

  const handleClosePopup = () => {
    setPopup(null);
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const pass1 = String(formData.get("password"));
    const pass2 = String(formData.get("confirm_password"));
    if (pass1 !== pass2) {
      setPopup({ message: "Passwords dont match", type: "error" });
      return;
    }
    if (
      !pass1.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/gm,
      )
    ) {
      setPopup({
        message:
          "Password should be at least 8 chars long with at least 1 special char, 1 number and 1 uppercase char",
        type: "error",
      });
      return;
    }
    const jsonObject: Record<string, unknown> = {};

    for (const [key, value] of formData.entries()) {
      jsonObject[key] = value;
    }

    const jsonData = JSON.stringify(jsonObject);
    const apiRes = await fetch("/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: jsonData,
    });
    const data = (await apiRes.json()) as { message: string };
    setPopup({
      message: data.message,
      type: [400, 500].includes(apiRes.status) ? "error" : "success",
    });
    if (apiRes.status === 200) {
      await navigateAction("/auth/otp");
      await loginAction(formData);
    }
  };
  return (
    <>
      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={handleClosePopup}
        />
      )}
      <div className="flex h-full min-h-screen flex-col items-center justify-center">
        <div className="w-96 rounded-lg border border-[#c3c3c3] bg-white p-8 shadow-md md:w-1/3">
          <h2 className="mb-6 text-center text-2xl font-semibold">
            Create your account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="fname" className="mb-2 block text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  className="w-full rounded-md border border-[#c3c3c3] px-3 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div>
                <label htmlFor="lname" className="mb-2 block text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  className="w-full rounded-md border border-[#c3c3c3] px-3 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="mb-2 block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-md border border-[#c3c3c3] px-3 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="mb-2 block text-gray-700">
                Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                id="password"
                name="password"
                className="w-full rounded-md border border-[#c3c3c3] px-3 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="mt-2 rounded border-t-neutral-700 bg-blue-400 p-2 text-sm text-white shadow-md"
                onClick={() => setShowPass(!showPass)}
              >
                Show pass
              </button>
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirm_password"
                className="mb-2 block text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                className="w-full rounded-md border border-[#c3c3c3] px-3 py-2 focus:border-blue-500 focus:outline-none"
                placeholder="Confirm your password"
                required
              />
            </div>
            <div className="center mb-6 text-center">
              <span className="w-full rounded-md px-3 py-2">
                Got an account ?{" "}
                <Link
                  href={"/auth/login"}
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Login
                </Link>
              </span>
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 focus:bg-slate-700 focus:outline-none"
            >
              CREATE ACCOUNT
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupClient;
