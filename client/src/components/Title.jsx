import React from "react";

const Title = ({
  title1,
  title2,
  titleStyles,
  title1Styles,
  paraStyles,
  para,
}) => {
  return (
    <div className={`${titleStyles} flexCenter flex-col`}>
      <h3 className={`${title1Styles} uppercase`}>
        {title1}
        <span className="font-light text-solidTwo"> {title2}</span>
      </h3>
      <p className={`${paraStyles} max-w-lg mt-2 text-center`}>
        {para ? para : "Discover fresh foods that delight your taste, nourish your body, and bring joy to every meal."}
      </p>
    </div>
  );
};

export default Title;
