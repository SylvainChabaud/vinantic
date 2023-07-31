import React from "react";
import Title from "./Title";
import Description from "./Description";

const Header = () => (
  <div className="bg-stone-100">
    <div className="py-10">
      <Title />
    </div>

    <div className="pb-14 px-15vw border-b-2">
      <Description />
    </div>
  </div>
);

export default Header;
