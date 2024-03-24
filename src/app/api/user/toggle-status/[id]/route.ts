import { getSession } from "lib";
import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getSession();
  if(!session?.user)
  {
    return NextResponse.json({
      message: "Unauthorized access"
    }, {status: 401})
  }
  const userId = params.id;
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }
  await db.user.update({
    where: { id: userId },
    data: { isBlocked: !user.isBlocked, passRetries: user.isBlocked ? 0 : user.passRetries },
  });
  return NextResponse.json({
    message: `User status for ${user.id} with first name ${user.fname} was set to ${user.isBlocked ? "unblocked" : "blocked"}`,
  }, {status: 200});
}
