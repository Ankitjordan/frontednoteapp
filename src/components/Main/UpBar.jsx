import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";

const UpBar = ({ setTittle, setDisplay }) => {
  const [add, setAdd] = useState(false);

  const handleAdd = () => {
    setAdd(!add);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setTittle(e.target.Adder.value);
    e.target.Adder.value = "";
    setAdd(false);
  };

  const handleHome = () => {
    setTimeout(() => {
      setDisplay("intro");
    }, 300);
  };

  return (
    <div className="flex w-full h-20 justify-around items-center border-b-2 border-amber-500 col-span-4 order-1 relative ">
      <button
        className="bg-orange-400 text-white text-lg absolute left-[2rem] rounded-[10px] pr-4 pl-4 pt-2 pb-2 max-sm:p-2 max-sm:text-sm max-sm:left-[8px] "
        onClick={handleHome}
      >
        Esc
      </button>
      {add && (
        <form
          className="flex gap-[0.6rem] w-[80%] lg:gap-[2rem] max-sd:ml-[2rem]"
          onSubmit={handleFormSubmit}
        >
          <input
            placeholder="Enter Heading"
            required
            className="text-xl bg-[#1a1a1a] rounded-[5px] pl-[1rem]  w-[60%] pt-2 pb-2 focus:outline-none focus:border-yellow-600 focus:border-2 max-sm:text-sm"
            name="Adder"
            autoComplete="off"
          ></input>
          <button className="text-yellow-400 transition-all hover:scale-110 duration-300 ease-in-out text-xl max-sm:text-sm ">
            Create
          </button>
        </form>
      )}
      <button onClick={handleAdd} className="absolute right-[2rem] text-xl">
        <IoAdd className=" transition-all hover:scale-150 duration-300 ease-in-out" />
      </button>
    </div>
  );
};

export default UpBar;
