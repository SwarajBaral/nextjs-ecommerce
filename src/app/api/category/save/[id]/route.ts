import { getSession } from "lib";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const session = await getSession();
    if(!session?.user)
    {
      return NextResponse.json({
        message: "Unauthorized access"
      }, {status: 401})
    }
    const data = await req.json() as { categories: Array<number> };
    const userId = params.id;
    await db.userCategoryLink.upsert({
      create: { userId: userId, categoryList: data.categories },
      update: { categoryList: data.categories },
      where: { userId: userId },
    });
    return NextResponse.json(
      { message: "Interests saved successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};
