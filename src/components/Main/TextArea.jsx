/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import axios from "axios";
const TextArea = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  // const [obj, setObj] = useState(() =>
  //   JSON.parse(localStorage.getItem("DataObject") || "{}")
  // );

  const handleDraft = async () => {
    // setObj((pre) => ({ ...pre, [props.handleCommon.common]: props.areaValue }));
    try {
      console.log(props.identity);
      await axios.put("http://localhost:700/note", {
        username: props.identity,
        body: props.areaValue,
        heading: props.handleCommon.common,
      });
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   localStorage.setItem("DataObject", JSON.stringify(obj));
  // }, [obj]);

  useEffect(() => {
    const key = props?.handleCommon?.common;

    if (!key || key.trim() === "") {
      console.warn("🚫 Heading is empty, skipping request");
      console.log(key);
      return;
    }

    const ChangeArea = async () => {
      try {
        const storedData = await axios.post("http://localhost:700/note", {
          heading: key,
        });
        if (storedData.data.msg == "new") {
          props.setAreaValue("");
          return;
        }
        console.log("✅ Got note data:", storedData.data);
        props.setAreaValue(storedData.data.body);
      } catch (error) {
        console.error(
          "❌ text area m gaddbad h:",
          error.response?.data || error.message
        );
      }
    };

    ChangeArea();
  }, [props?.handleCommon?.common]);

  return (
    <div className="col-span-3 h-[80vh] mt-[1rem] relative order-3">
      <textarea
        className="bg-[#1a1a1a] h-[100%] w-[100%] text-xl focus:outline-none pl-[1rem] pt-[1rem] "
        value={props.areaValue}
        onChange={(e) => props.setAreaValue(e.target.value)}
        placeholder="Start Writing ..."
      ></textarea>

      <div className="absolute top-2 right-2 group">
        <button
          className="text-xl text-blue-400 relative z-10"
          onClick={handleDraft}
        >
          <FaRegSave />
        </button>
        <div className="absolute -top-8 right-1 scale-0 group-hover:scale-100 transition-all duration-300 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
          Save
        </div>
      </div>

      {showPopup && (
        <div className="absolute top-10 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-xl transition-all duration-500 animate-fade-in z-20">
          Saved Successfully!
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TextArea;
