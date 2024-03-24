import React from "react";

const loading = () => {
  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center">
      <div className="w-96 rounded-lg border border-[#c3c3c3] bg-white p-8 shadow-md md:w-1/3">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold">Please mark your interests</h2>
          <sub className="w-full text-center">
            We will notify you based on your selections.
          </sub>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {[...Array(6).keys()].map((category) => {
            return (
              <div key={"uniquekey" + category}>
                <span
                  id={"interest" + category}
                  className="inline-block h-5 w-full animate-pulse rounded-md bg-slate-700"
                  defaultChecked
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default loading;
