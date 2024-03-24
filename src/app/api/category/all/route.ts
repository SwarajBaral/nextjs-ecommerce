import { Category } from "@prisma/client";
import { getSession } from "lib";
import { NextResponse } from "next/server";
import { db } from "~/server/db";

type ResponseData = {
  message: Category[] | string;
};

export const GET = async (
  req: Request,
): Promise<NextResponse<ResponseData>> => {
  const session = await getSession();
  if(!session?.user)
  {
    return NextResponse.json({
      message: "Unauthorized access"
    }, {status: 401})
  }
  const allCats = await db.category.findMany();
  return NextResponse.json({ message: allCats }, { status: 200 });
};
