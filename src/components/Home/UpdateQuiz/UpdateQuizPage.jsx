import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import "../AddQuiz/addQuizStyle.css";
function UpdateQuizPage({ onClose, updateMcqId }) {
  // const { mcqId } = data;
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  // const [existingQuizTitle, setExistingQuizTitle] = useState(props.mcqName);
  const [newQuizTitle, setNewQuizTitle] = useState();
  const submitFunction = async (e) => {
    e.preventDefault();

    try {
      console.log("newQuizTitle ", newQuizTitle);
      console.log("parseInt(mcqId)", updateMcqId);
      if (newQuizTitle) {
        const response = await axios.patch(
          "http://127.0.0.1:8000/mcq/quiz_update_delete/",

          { mcqId: updateMcqId, newMcqName: newQuizTitle }
        );
        setNewQuizTitle("");
        if (response?.data?.data === "mcq updated successfully") {
          onClose();
        } else if (response?.data?.data === "MCQ not found") {
          toast.info("Quiz not exists");
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
        <div className="addQuizContainerTitle">Update Quiz</div>
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

export default UpdateQuizPage;
