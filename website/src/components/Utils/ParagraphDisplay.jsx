import React, { Fragment } from "react";

function ParagraphDisplay({ paragraphs }) {
  return (
    <div
      className={
        "bg-white shadow mb-2 scrollbar mx-auto mt-2 w-full md:max-w-screen-sm lg:max-w-screen-md 2xl:max-w-screen-lg grow-[2] overflow-y-scroll outline outline-1 outline-gray-300 rounded-lg p-5"
      }
    >
      {paragraphs.map((line, index) => {
        return (
          <p key={index} className={"mb-4"}>
            {Array.isArray(line)
              ? line.map((x, j) => (
                  <Fragment key={j}>
                    <a>{x}</a>
                    <br />
                  </Fragment>
                ))
              : line}
          </p>
        );
      })}
      {paragraphs.length <= 0 && (
        <p className={"text-gray-400"}>Paragraphs you type will show up here</p>
      )}
    </div>
  );
}

export default ParagraphDisplay;
