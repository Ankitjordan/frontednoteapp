import React, { useState } from "react";
import { LuMessageCircleQuestion } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import Login from "../auth/login.jsx";
import Registration from "../auth/registation.jsx";
import Main from "../Main/Main.jsx";

const Introduction = ({ setDisplay, setIdentity }) => {
  const [showHelp, setShowHelp] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeComponent, setActiveComponent] = useState("intro");
  const [userName, setUserName] = useState("");

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex flex-col">
      {/* Navbar */}
      <div className="w-full px-6 py-4 flex items-center justify-between bg-white shadow-md sticky top-0 z-10">
        <h1 className="text-3xl font-bold text-amber-600">VNotes</h1>
        <div className="space-x-4 hidden sm:flex">
          <button
            onClick={() => setActiveComponent("intro")}
            className="text-blue-600 hover:underline"
          >
            Home
          </button>
          <button
            onClick={() => setActiveComponent("login")}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
          <button
            onClick={() => setActiveComponent("register")}
            className="text-blue-600 hover:underline"
          >
            Register
          </button>
          {activeComponent === "intro" && (
            <button
              onClick={() => setShowHelp(true)}
              className="text-blue-600 flex items-center gap-1 hover:underline"
            >
              Help <LuMessageCircleQuestion />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="sm:hidden text-blue-600 text-2xl"
        >
          <RxHamburgerMenu />
        </button>
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <div className="fixed top-0 right-0 w-2/3 h-full bg-white shadow-lg z-30 flex flex-col items-start p-6 space-y-6 sm:hidden transition-all duration-300">
          <button
            onClick={() => setShowSidebar(false)}
            className="self-end text-2xl text-gray-600 hover:text-red-500"
          >
            <IoMdClose />
          </button>
          <button
            onClick={() => {
              setActiveComponent("intro");
              setShowSidebar(false);
            }}
            className="text-blue-600 hover:underline text-lg"
          >
            Home
          </button>
          <button
            onClick={() => {
              setActiveComponent("login");
              setShowSidebar(false);
            }}
            className="text-blue-600 hover:underline text-lg"
          >
            Login
          </button>
          <button
            onClick={() => {
              setActiveComponent("register");
              setShowSidebar(false);
            }}
            className="text-blue-600 hover:underline text-lg"
          >
            Register
          </button>
          {activeComponent === "intro" && (
            <button
              onClick={() => {
                setShowHelp(true);
                setShowSidebar(false);
              }}
              className="text-blue-600 flex items-center gap-1 hover:underline text-lg"
            >
              Help <LuMessageCircleQuestion />
            </button>
          )}
        </div>
      )}

      {/* Component Rendering */}
      {activeComponent === "login" && (
        <Login
          setUserName={setUserName}
          setDisplay={setDisplay}
          setIdentity={setIdentity}
          setActiveComponent={setActiveComponent}
        />
      )}
      {activeComponent === "register" && (
        <Registration
          setActiveComponent={setActiveComponent}
          setDisplay={setDisplay}
        />
      )}
      {activeComponent === "main" && (
        <Main userName={userName} setIdentity={setIdentity} />
      )}
      {activeComponent === "intro" && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 text-center">
          <p className="max-w-3xl text-4xl text-orange-500 font-medium leading-relaxed mb-8 sm:text-2xl">
            Welcome to VNotes – your minimalist and lightning-fast companion for
            capturing ideas, thoughts, and tasks. Designed with simplicity and
            speed in mind, VNotes helps you stay organized without distractions.
            Whether you're jotting down quick notes or planning big projects,
            VNotes keeps everything at your fingertips, beautifully synced and
            always accessible.
          </p>
          <button
            className="bg-amber-600 hover:bg-amber-700 text-white text-xl font-semibold px-8 py-3 rounded-xl transition-all duration-300"
            onClick={() => setTimeout(() => setActiveComponent("login"), 500)}
          >
            Start Making Notes
          </button>
        </div>
      )}

      {/* Help Overlay */}
      {showHelp && activeComponent === "intro" && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/50 z-20 flex items-center justify-center max-sm:overflow-auto max-sm:pt-2">
          <div className="bg-white w-[95%] max-w-5xl rounded-2xl shadow-2xl p-10 relative max-sm:p-4 max-sc:pt-12 max-sm:width-[80%]">
            <button
              onClick={() => setShowHelp(false)}
              className="absolute top-4 right-4 text-gray-600 text-3xl hover:text-red-500 max-sc:top-8"
            >
              <IoMdClose />
            </button>
            <ul className="space-y-4 mt-6 text-gray-700 text-left text-lg list-disc pl-6 max-sm:mt-3 max-sc:space-y-1">
              <li>You must first login to access the VNotes software.</li>
              <li>
                Click the "Start Making Notes" button below to access the VNotes
                software interface.
              </li>
              <li>You'll see three icons: Save, Add (+), and Delete.</li>
              <li>
                Click the Save icon to input the name of your note file. Once
                entered, a note with that name will be created.
              </li>
              <li>Use the text area to write your notes freely.</li>
              <li>
                After writing, make sure to press the Save icon again on the
                rightmost corner to save your notes. <strong>Warning:</strong>{" "}
                If you don’t press Save, your file will not be stored.
              </li>
              <li>
                To delete a note, click the red Delete icon at the top-right
                corner of the named note box.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Introduction;
