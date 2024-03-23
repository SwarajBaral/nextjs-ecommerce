import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const data: { categories: Array<number> } = await req.json();
    var dbSaveObj: any[] = [];
    const userId = params.id;
    for (const catId of data.categories) {
      dbSaveObj.push({
        categoryId: catId,
        userId: userId,
      });
    }
    const savedInterests = await db.userCategoryLink.createMany({
      data: dbSaveObj,
    });
    console.log(savedInterests);
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
