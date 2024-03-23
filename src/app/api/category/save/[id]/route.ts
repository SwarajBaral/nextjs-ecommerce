import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const data: { categories: Array<number> } = await req.json();
    const userId = params.id;
    const savedInterests = await db.userCategoryLink.upsert({
      create: { userId: userId, categoryList: data.categories },
      update: { categoryList: data.categories },
      where: { userId: userId },
    });
    console.log("🚀 ~ savedInterests:", savedInterests)
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
