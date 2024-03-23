import { Inter } from "next/font/google";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const Layout = (props: Props) => {
  return (
    <>
      <header className={`font-sans ${inter.variable} p-4 text-center`}>
        THIS IS A HEADER
      </header>
      <main className={`font-sans ${inter.variable} bg-[#faebd7]`}>
        {props.children}
      </main>
    </>
  );
};

export default Layout;
