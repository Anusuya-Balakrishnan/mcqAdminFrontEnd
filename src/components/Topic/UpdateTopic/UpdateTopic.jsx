import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

import "../../Home/AddQuiz/addQuizStyle.css";
function UpdateTopic({ onClose, languageId, updateTopicId }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [newTopicName, setnewTopicName] = useState("");
  const submitFunction = async (e) => {
    e.preventDefault();
    try {
      if (newTopicName) {
        console.log(newTopicName);
        const response = await axios.patch(
          apiUrl + `topic_list_update/${languageId}/`,
          {
            languageId: languageId,
            topicName: newTopicName,
            id: updateTopicId,
          }
        );
        setnewTopicName("");
        console.log(response?.data?.message);
        if (response?.data?.message === "Language added successfully") {
          toast.info("Successfully added new Language");
        } else if (response?.data?.message === "Language already exists") {
          toast.info("Language already exists");
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
        <div className="addQuizContainerTitle">Edit Topic</div>
        <form onSubmit={submitFunction} className="addQuizForm">
          <input
            type="text"
            placeholder="Enter Topic Name"
            className="textInput"
            onChange={(e) => {
              setnewTopicName(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              );
            }}
            value={newTopicName}
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

export default UpdateTopic;
