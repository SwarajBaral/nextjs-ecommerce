import { Category, UserCategoryLink } from "@prisma/client";
import { getSession } from "lib";
import { NextResponse } from "next/server";
import { db } from "~/server/db";

type ResponseData = {
  message?: string;
  categories?: UserCategoryLink[];
};

export const GET = async (
  req: Request,
  { params }: { params: { userId: string } },
): Promise<NextResponse<ResponseData>> => {
  const session = await getSession();
  if(!session?.user)
  {
    return NextResponse.json({
      message: "Unauthorized access"
    }, {status: 401})
  }
  const userId = params.userId;
  const allCats = await db.userCategoryLink.findMany({
    where: { userId: userId },
  });
  return NextResponse.json({
    categories: allCats
  })
};
