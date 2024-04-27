import React, { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./addQuestionStyle.css";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import TextField from "@material-ui/core/TextField";
import { ToastContainer, toast, Bounce } from "react-toastify";
import MyContext from "../../../MyContext";
function UpdateQuestion({ onClose, questionId, updateQuestion, topicId }) {
  const { language, topicName, assignLanguage, assignTopicName } =
    useContext(MyContext);

  const apiUrl = process.env.REACT_APP_API_URL;

  const textareaRef = useRef(null);
  const [question, setQuestion] = useState(updateQuestion.question);
  const [code, setCode] = useState(updateQuestion.code);
  const [option1, setOption1] = useState(updateQuestion.option[0]);
  const [option2, setOption2] = useState(updateQuestion.option[1]);
  const [option3, setOption3] = useState(updateQuestion.option[2]);
  const [option4, setOption4] = useState(updateQuestion.option[3]);
  const [answer, setAnswer] = useState(updateQuestion.answer);
  const submitFunction = async (e) => {
    e.preventDefault();
    try {
      if (question && option1 && option2 && option3 && option4 && answer) {
        const addData = {
          id: questionId,
          questions: {
            question: question,
            code: code,
            option: [option1, option2, option3, option4],
            answer: answer,
          },
        };
        console.log("addData", addData);
        const response = await axios.patch(
          apiUrl + `questions_list_update/${topicId}/`,
          addData
        );
        setQuestion("");
        setCode("");
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
        setAnswer("");
        console.log(response?.data?.message);
        if (response?.data?.message === "question updated successfully") {
          toast.info("question updated successfully");
        } else if (response?.data?.message === "question not found") {
          toast.info("question not found");
        }
        onClose();
      } else {
        toast.info("fill quiz field");
      }
    } catch (error) {}
  };

  return (
    <section className="addQuestionContainer">
      <div className="addQuestionChild">
        <div className="closeBtn" onClick={() => onClose()}>
          <IoMdClose />
        </div>
        <div className="addQuestion_title">Edit Question</div>

        <form onSubmit={submitFunction} className="addQuestion_body">
          <input
            type="text"
            placeholder="Enter Question"
            className="inputField questionName"
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
            value={question}
          />
          <textarea
            type="text"
            placeholder="Enter code"
            className="inputField"
            onChange={(e) => {
              setCode(e.target.value);
            }}
            value={code}
            style={{ height: `${code ? "180px" : "auto"}` }}
          />
          <input
            type="text"
            placeholder="Enter option1"
            className="inputField"
            onChange={(e) => {
              setOption1(e.target.value);
            }}
            value={option1}
          />
          <input
            type="text"
            placeholder="Enter option2"
            className="inputField"
            onChange={(e) => {
              setOption2(e.target.value);
            }}
            value={option2}
          />
          <input
            type="text"
            placeholder="Enter option3"
            className="inputField"
            onChange={(e) => {
              setOption3(e.target.value);
            }}
            value={option3}
          />
          <input
            type="text"
            placeholder="Enter option4"
            className="inputField"
            onChange={(e) => {
              setOption4(e.target.value);
            }}
            value={option4}
          />
          <input
            type="text"
            placeholder="Enter Answer"
            className="inputField"
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            value={answer}
          />
          <button className="element">Update</button>
        </form>
      </div>
    </section>
  );
}

export default UpdateQuestion;
