"use client";
import { Category, UserCategoryLink } from "@prisma/client";
import React, { useState } from "react";
import Popup from "~/components/popup";

type Props = {
  allCategories: Array<Category>;
  userInterests: Array<UserCategoryLink>;
  userId: string;
};

const PAGE_SIZE = 6;

export const InterestClient = (props: Props) => {
  const [currPage, setCurrPage] = useState<number>(1);
  const [selectedIds, setSelectedIds] = useState<Array<number>>(
    props.userInterests[0]?.categoryList ?? [],
  );
  const [popup, setPopup] = useState<{
    message: string;
    type: "error" | "success" | "info";
  } | null>(null);

  const handleClosePopup = () => {
    setPopup(null);
  };
  // @todo: limit selection
  // const [disableSelections, setDisableSelections] = useState<boolean>(false);
  const allCategories = props.allCategories;
  const pages = Math.ceil(allCategories.length / PAGE_SIZE);

  // @todo: simplify pagination
  const handleNextPage = () => {
    if (currPage < 17) {
      setCurrPage(currPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  };
  const handleSelection = (id: number) => {
    if (!selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    }
  };
  const handleSubmit = async () => {
    if (selectedIds.length < 1) {
      setPopup({
        message: "Please select one or nore interests to save",
        type: "info",
      });
    }
    const jsonObject: Record<string, Array<number>> = {
      categories: selectedIds,
    };
    const apiRes = await fetch("/api/category/save/" + props.userId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(jsonObject),
    });
    console.log(apiRes);
  };

  return (
    <>
      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={handleClosePopup}
        />
      )}
      <div className="flex h-full min-h-screen flex-col items-center justify-center">
        <div className="w-96 rounded-lg border border-[#c3c3c3] bg-white p-8 shadow-md md:w-1/3">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold">
              Please mark your interests
            </h2>
            <sub className="w-full text-center">
              We will notify you based on your selections. You currently have{" "}
              {props.userInterests[0]?.categoryList.length ?? 0} interests.
            </sub>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {allCategories
              ? allCategories
                  .slice(6 * (currPage - 1), 6 * currPage)
                  .map((category) => {
                    return (
                      <div key={"uniquekey" + category.id}>
                        <input
                          type="checkbox"
                          onClick={() => handleSelection(category.id)}
                          id={"interest" + category.id}
                          name={"interest" + category.id}
                          className="mr-2 cursor-pointer appearance-none border-slate-800 bg-slate-300 text-black focus:ring-slate-200"
                          checked={selectedIds.includes(category.id)}
                          defaultChecked
                        />
                        <label htmlFor={"interest" + category.id}>
                          {category.name}
                        </label>
                      </div>
                    );
                  })
              : null}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            You can select a maximum of 4 interests.
          </p>
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handlePrevPage}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700 focus:bg-slate-700 focus:outline-none"
            >
              PREV
            </button>
            <span className="text-gray-500">
              Page {currPage} of {pages}
            </span>
            <button
              onClick={handleNextPage}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700 focus:bg-slate-700 focus:outline-none"
            >
              NEXT
            </button>
          </div>
          <div className="mt-8 flex items-center justify-center rounded-md bg-green-600 p-2 text-white hover:bg-green-700">
            <button onClick={handleSubmit}>Save my interests</button>
          </div>
        </div>
      </div>
    </>
  );
};
