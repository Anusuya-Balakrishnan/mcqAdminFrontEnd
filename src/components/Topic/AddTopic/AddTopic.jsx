import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

import "../../Home/AddQuiz/addQuizStyle.css";
function AddTopic({ onClose, languageId }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [newTopicName, setNewTopicName] = useState("");

  const submitFunction = async (e) => {
    e.preventDefault();
    try {
      if (newTopicName) {
        console.log(languageId);
        const response = await axios.post(
          apiUrl + `topic_list_update/${languageId}/`,
          {
            languageId: languageId,
            topicName: newTopicName,
          }
        );
        setNewTopicName("");
        console.log(response?.data?.message);
        if (response?.data?.message === "topic added successfully") {
          toast.info("Successfully added new Language");
        } else if (response?.data?.message === "topic already created") {
          toast.info("Language already exists");
        }
        onClose();
      } else {
        toast.info("fill quiz field");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="addQuizPage">
      <div className="addQuizContainer">
        <div className="closeBtn" onClick={() => onClose()}>
          <IoMdClose />
        </div>
        <div className="addQuizContainerTitle">Add New Topic</div>
        <form onSubmit={submitFunction} className="addQuizForm">
          <input
            type="text"
            placeholder="Enter new Topic"
            className="textInput"
            onChange={(e) => {
              setNewTopicName(
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

export default AddTopic;
