import { Category } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "~/server/db";

type ResponseData = {
  message: Category[];
};

export const GET = async (
  req: Request,
): Promise<NextResponse<ResponseData>> => {
  const allCats = await db.category.findMany();
  return NextResponse.json({ message: allCats }, { status: 200 });
};
