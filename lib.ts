import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import nodemailer from "nodemailer";

const secretKey = process.env.SESSION_KEY;
const key = new TextEncoder().encode(secretKey);
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS,
  },
});

export async function encrypt(payload: any) {
  console.log(secretKey);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(key);
}

export async function SendEmail(
  userId: string,
  type: "verification" | "reset",
) {
  transporter.sendMail({
    subject: "Testing",
    text: "Hellow world",
    to: "baralswaraj40@fmail.com",
  });
}

export async function passwordMatch(
  enteredPass: string,
  dbPass: string,
): Promise<boolean> {
  const match = await bcrypt.compare(enteredPass, dbPass);
  return match;
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {
  // Verify credentials && get the user
  const email = formData.get("email") as string;
  const passw = formData.get("password") as string;
  var returnObj = { message: "User logged in successfully", type: "success" };
  try {
    if (!email || !passw) {
      returnObj.message = "Enter credentials to proceed";
      returnObj.type = "error";
      return returnObj;
    }

    const dbUser = await db.user.findUnique({ where: { emailId: email } });

    if (!dbUser) {
      returnObj.message = "User doesn't exist. Please signup first";
      returnObj.type = "error";
      return returnObj;
    }

    if (dbUser.isBlocked) {
      returnObj.message = "User is blocked. Please contact admin";
      returnObj.type = "error";
      return returnObj;
    }

    if (dbUser.passRetries > 2) {
      // @todo: Reset account block after 15 mins
      await db.user.update({
        where: { id: dbUser.id },
        data: { isBlocked: true },
      });
      returnObj.message =
        "Too many incorrect attempts. Account blocked. Contact admin.";
      returnObj.type = "error";
      return returnObj;
    }

    const passCheck = await passwordMatch(passw, dbUser.password);

    if (!passCheck) {
      await db.user.update({
        where: { id: dbUser.id },
        data: { passRetries: dbUser.passRetries + 1 },
      });
      returnObj.message = "Incorrect password. Please try again.";
      returnObj.type = "error";
      return returnObj;
    }

    // Reset passretry counter
    await db.user.update({
      where: { id: dbUser.id },
      data: { passRetries: 0 },
    });

    // Authenticated User
    const user = {
      email: dbUser.emailId,
      name: dbUser.fname + " " + dbUser.lname,
      emailConfirmed: dbUser.emailConfirmed,
      id: dbUser.id,
    };

    // Create the session
    const date = new Date();
    const expires = new Date(date.setDate(date.getDate() + 1));
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
    return returnObj;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  // Destroy the session
  "use server";
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/auth/login");
}

export async function getSession(): Promise<{
  user: { email: string; name: string; id: string; emailConfirmed: boolean };
} | null> {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
