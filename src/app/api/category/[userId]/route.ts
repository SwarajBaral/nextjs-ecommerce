import { Category, UserCategoryLink } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { db } from "~/server/db";

type ResponseData = {
  categories: UserCategoryLink[];
};

export const GET = async (
  req: NextApiRequest,
  { params }: { params: { userId: string } },
): Promise<NextResponse<ResponseData>> => {
  const userId = params.userId;
  const allCats = await db.userCategoryLink.findMany({
    where: { userId: userId },
  });
  return NextResponse.json({
    categories: allCats
  })
};
