import React from "react";
import Title from "./Title";
import Description from "./Description";
import logoSrc from '../assets/logo-vinantic.webp';

const Header = () => (
  <div className="bg-stone-200">
    <div className="py-10">
      <Title />
    </div>

    <div className="flex justify-center">
      <img
        src={logoSrc}
        alt={'image-logo'}
        className="w-80 border rounded-full transition duration-1000 ease-in-out transform hover:scale-125"
      />
    </div>

    <div className="py-14 px-[15vw] border-b-2">
      <Description />
    </div>
  </div>
);

export default Header;
