import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";

import UpBar from "./UpBar";
import TextArea from "./TextArea";
import SideList from "./SIdeList";
import { useEffect } from "react";

const Main = ({ identity, setDisplay }) => {
  const [tittle, setTittle] = useState("  ");
  const [common, setCommon] = useState("  ");

  const [areaValue, setAreaValue] = useState("");

  return (
    <div className="grid grid-cols-4 max-sd:flex flex-col m-[1rem] gap-[1rem]">
      <UpBar tittle={tittle} setTittle={setTittle} setDisplay={setDisplay} />
      <SideList
        tittle={tittle}
        setTittle={setTittle}
        handleCommon={{ common, setCommon }}
        setAreaValue={setAreaValue}
        identity={identity}
      />
      <TextArea
        handleCommon={{ common, setCommon }}
        areaValue={areaValue}
        setAreaValue={setAreaValue}
        identity={identity}
      />
    </div>
  );
};

export default Main;
