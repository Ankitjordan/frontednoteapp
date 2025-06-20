import React, { useState, useEffect } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import axios from "axios";

const SideList = (props) => {
  const [active, setActive] = useState(null);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const info = await axios.post("http://localhost:700/noteX", {
          username: props.identity,
        });
        console.log(info.data);
        const headings = info.data.map((x) => x.heading);
        console.log("this is heading", headings);
        setArr(headings);
      } catch (error) {
        console.log(error.message);
        return;
      }
    };
    getInfo();
  }, []);

  useEffect(() => {
    const cleanTitle = props.tittle?.trim();
    if (!cleanTitle) return;

    setArr((prev) => {
      if (prev.includes(cleanTitle)) return prev;
      return [...prev, cleanTitle];
    });
  }, [props.tittle]);

  const handleDelete = async (event, name) => {
    event.stopPropagation();
    // for handling text area ;

    setArr((prev) => prev.filter((x) => x != name));
    props.setAreaValue("");
    try {
      const deleteResult = await axios.delete("http://localhost:700/notes", {
        data: { heading: name },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleConnection = (name, index) => {
    setActive(index);
    props.handleCommon.setCommon(name);
  };

  return (
    <div className="flex flex-col col-span-1 h-[80vh] bg-[#1a1a1a] overflow-y-auto items-start rounded-2xl mt-[1rem] custom-scroll overflow-x-hidden order-2 max-sd:grid grid-cols-3 max-sd:rounded-none max-sd:h-[40vh] max-sd:gap-2 max-sd:m-0 max-sd:pt-2">
      {arr.length != 0 &&
        arr.map((name, index) => (
          <button
            key={index}
            className={`p-4 text-center text-xl rounded-[8px] text-white list-none w-full  transition-all duration-300 shadow-md  border border-[#333]  relative ml-2 mb-2 ${
              active == index ? "bg-[#2c2c2c]" : "bg-[#1f1f1f]"
            } `}
            onClick={() => handleConnection(name, index)}
          >
            {name}
            <span
              className="absolute right-1 top-0 h-6 w-6 text-red-500  max-sm:w-3 max-sm:h-3"
              onClick={(event) => handleDelete(event, name)}
            >
              <IoTrashBinOutline />
            </span>
          </button>
        ))}
    </div>
  );
};

export default SideList;
