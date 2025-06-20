import React from "react";
import UpBar from "./components/Main/UpBar";
import Main from "./components/Main/Main";
import { useState } from "react";
import Introduction from "./components/intro/introduction";
import Login from "./components/auth/login.jsx";
import Registration from "./components/auth/registation.jsx";

const App = () => {
  const [display, setDisplay] = useState("intro");
  const [identity, setIdentity] = useState("");

  console.log("Current identity:", identity);

  const computed = {
    login: <Login setDisplay={setDisplay} setIdentity={setIdentity} />,
    register: <Registration setDisplay={setDisplay} />,
    intro: <Introduction setDisplay={setDisplay} setIdentity={setIdentity} />,
    main: <Main setDisplay={setDisplay} identity={identity} />,
  };

  return (
    <div className="grid grid-cols-1 w-full min-h-screen items-start gap-[2rem] justify-center relative ">
      {computed[display]}
    </div>
  );
};

export default App;
