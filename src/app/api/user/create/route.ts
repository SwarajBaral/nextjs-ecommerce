// pages/api/register.js

import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

const saltRounds = Number(process.env.SALT_ROUNDS || 10);

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  const { fname, lname, email, password } = data;

  try {
    // Hash the password with key
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Create the user with the hashed password
    try {
      const user = await db.user.create({
        data: {
          fname,
          lname,
          emailId: email,
          password: hashedPassword,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return NextResponse.json(
            {
              message:
                "An user with this email already exists. Please try to login",
            },
            { status: 400, statusText: "Something went wrong" },
          );
        }
      }
    }
    return NextResponse.json({ message: "User created" }, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
