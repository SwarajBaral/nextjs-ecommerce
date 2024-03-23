import { Category, UserCategoryLink } from "@prisma/client";
import React from "react";
import { InterestClient } from "./client";
import { getSession } from "lib";
import { redirect } from "next/navigation";

const getData = async (): Promise<Category[]> => {
  const res = await fetch("http://localhost:3000/api/category/all");
  const data = (await res.json()) as { message: Category[] };
  return data.message;
};

const getUserInterests = async (
  userId: string,
): Promise<UserCategoryLink[]> => {
  const res = await fetch(`http://localhost:3000/api/category/${userId}`);
  const data = (await res.json()) as { categories: UserCategoryLink[] };
  return data.categories;
};

const Interests = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const categories = await getData();
  console.log("🚀 ~ Interests ~ categories:", categories);
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
