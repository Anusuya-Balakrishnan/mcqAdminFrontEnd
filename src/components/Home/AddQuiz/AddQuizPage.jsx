import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

import "./addQuizStyle.css";
function AddQuizPage({ onClose }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const submitFunction = async (e) => {
    e.preventDefault();
    try {
      if (newQuizTitle) {
        const response = await axios.post(apiUrl + "quiz_list/", {
          mcqName: newQuizTitle,
        });
        setNewQuizTitle("");
        if (response?.data?.data === "mcq added successfully") {
          toast.info("Successfully added new Quiz");
        } else if (response?.data?.data === "MCQ already created") {
          toast.info("Quiz already exists");
        }
        onClose();
      } else {
        toast.info("fill quiz field");
      }
    } catch (error) {}
  };
  return (
    <section className="addQuizPage">
      <div className="addQuizContainer">
        <div className="closeBtn" onClick={() => onClose()}>
          <IoMdClose />
        </div>
        <div className="addQuizContainerTitle">Add new Quiz</div>
        <form onSubmit={submitFunction} className="addQuizForm">
          <input
            type="text"
            placeholder="Enter new Quiz Name"
            className="textInput"
            onChange={(e) => {
              setNewQuizTitle(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              );
            }}
            value={newQuizTitle}
          />
          <input type="submit" className="element" />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce} // Corrected syntax
          />
        </form>
      </div>
    </section>
  );
}

export default AddQuizPage;
