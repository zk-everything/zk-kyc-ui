import { url } from "inspector";
import React, { FC, ReactNode, useContext } from "react";
import { setTheme } from "../../state/actions/global";
import { GlobalContext } from "../../state/contexts/GlobalContext";
import background from "../../public/background.svg";
import Logo from "./Logo";
import Image from "next/image";

type ContainerProps = {
  children: ReactNode;
};

const Container: FC<ContainerProps> = ({ children }) => {
  const {
    state: { darkMode },
    dispatch,
  } = useContext(GlobalContext);

  return (
    <div className="relative flex flex-col items-center w-screen h-screen font-rubik">
      <div className="flex flex-col items-center w-full min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default Container;
