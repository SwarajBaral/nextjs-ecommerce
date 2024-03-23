import { Category } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { db } from "~/server/db";

type ResponseData = {
  message: Category[];
};

export const GET = async (
  req: NextApiRequest,
): Promise<NextResponse<ResponseData>> => {
  const allCats = await db.category.findMany();
  return NextResponse.json({ message: allCats }, { status: 200 });
};
