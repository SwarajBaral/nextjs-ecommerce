"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";

const VerificationOtp: React.FunctionComponent = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", "", "", ""]);
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      refs[index - 1]!.current!.focus();
    }
  };
  const handleChange = (index: number, value: string) => {
    if (value !== "" && index < refs.length - 1) {
      refs[index - 1]!.current!.focus();
    }
    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);
  };
  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center">
      <div className="w-96 rounded-lg border border-[#c3c3c3] bg-white p-8 shadow-md md:w-1/3">
        <h2 className="mb-2 text-center text-2xl font-semibold">
          Verify your email
        </h2>
        <div className="my-2 w-full text-center text-sm">
          Please enter the 8 digit otp sent to your email Id
        </div>
        <div className="mb-4">
          <form className="flex w-full content-center justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={refs[index]}
                type="text"
                maxLength={1}
                value={digit}
                className="h-10 w-10 rounded border border-gray-300 text-center focus:border-blue-500 focus:outline-none"
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </form>
        </div>
        <div className="flex w-full content-center justify-center space-x-2">
          <Link
            href={"/onboarding/interests"}
            type="submit"
            className="w-full rounded-md bg-green-900 px-4 py-2 text-center text-white hover:bg-slate-700 focus:bg-slate-700 focus:outline-none"
          >
            Verify
          </Link>
          <button
            type="submit"
            className="w-full rounded-md bg-green-900 px-4 py-2 text-white hover:bg-slate-700 focus:bg-slate-700 focus:outline-none"
          >
            Resend Otp
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationOtp;
