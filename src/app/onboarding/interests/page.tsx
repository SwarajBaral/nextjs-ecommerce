import { Category, UserCategoryLink } from "@prisma/client";
import React from "react";
import { InterestClient } from "./client";
import { getSession } from "lib";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const getData = async (): Promise<Category[]> => {
  const sessionCookie = cookies().get("session");
  const res = await fetch(
    "https://main.d2u6gm9iba68sr.amplifyapp.com/api/category/all",
    {
      headers: {
        Cookie: `session=${sessionCookie?.value}`,
      },
    },
  );
  const data = (await res.json()) as { message: Category[] };
  return data.message;
};

const getUserInterests = async (
  userId: string,
): Promise<UserCategoryLink[]> => {
  const sessionCookie = cookies().get("session");
  const res = await fetch(
    `https://main.d2u6gm9iba68sr.amplifyapp.com/api/category/${userId}`,
    {
      headers: {
        Cookie: `session=${sessionCookie?.value}`,
      },
    },
  );
  const data = (await res.json()) as { categories: UserCategoryLink[] };
  return data.categories;
};

const Interests = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const categories = await getData();
  const userCats = await getUserInterests(session.user.id);

  return (
    <>
      <InterestClient
        userId={session.user.id}
        allCategories={categories}
        userInterests={userCats}
      />
    </>
  );
};

export default Interests;
