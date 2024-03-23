import { Category, UserCategoryLink } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "~/server/db";

type ResponseData = {
  categories: UserCategoryLink[];
};

export const GET = async (
  req: Request,
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
