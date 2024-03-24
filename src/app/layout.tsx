import { getSession, logout } from "lib";
import { Inter } from "next/font/google";
import Link from "next/link";
import Logout from "~/components/logout";
import "~/styles/globals.css";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} bg-[#faebd7]`}>
        <header
          className={`font-sans ${inter.variable} bg-white p-4 text-center`}
        >
          <ul className="flex w-full">
            <li className="mr-6">
              <Link className="text-blue-500 hover:text-blue-800" href={"/"}>
                Home
              </Link>
            </li>
            <li className="mr-6">
              <a className="text-blue-500 hover:text-blue-800" href="#">
                {session && <Logout logout={logout} />}
              </a>
            </li>
            <li className="mr-6">
              {session ? `Hi ${session.user.name}` : null}
            </li>
          </ul>
        </header>
        {children}
      </body>
    </html>
  );
}
