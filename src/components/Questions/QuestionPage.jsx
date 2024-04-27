import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./questionStyle.css";
import MyContext from "../../MyContext";
import AddQuestion from "./AddQuestions/AddQuestion";
import UpdateQuestion from "./AddQuestions/UpdateQuestion";
function QuestionPage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [questionsList, setQuestionsList] = useState([]);
  const { topicId } = useParams();
  const { language, topicName, assignLanguage, assignTopicName } =
    useContext(MyContext);

  const [addQuestionPopUp, setAddQuestionPopUp] = useState(false);
  const [updateQuestionPopUp, setUpdateQuestionPopUp] = useState(false);
  const [updateQuestionId, setUpdateQuestionId] = useState();
  const [updateQuestion, setUpdateQuestion] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          apiUrl + `questions_list_update/${topicId}/`
        );

        if (response?.data?.data) {
          console.log(response?.data?.data);
          setQuestionsList(response?.data?.data);
        }
      } catch (error) {}
    };
    fetchData(); // Call the async function immediately
  }, [topicId, addQuestionPopUp, updateQuestionPopUp]);

  // delete dialog box
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [questionId, setQuestionId] = useState(null);

  // Function to handle deletion confirmation dialog opening
  const handleDeleteConfirmation = (questionIdValue) => {
    setQuestionId(questionIdValue);
    setOpenDeleteDialog(true);
  };

  // Function to handle deletion confirmation dialog closing
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setQuestionId(null);
  };

  // Function to handle actual deletion of quiz
  const handleDeleteQuiz = async () => {
    // Implement your logic to delete the quiz with deleteQuizId
    // After successful deletion, close the dialog

    try {
      if (questionId) {
        const response = await axios.delete(
          apiUrl + `questions_list_update/${topicId}/`,
          {
            data: { id: parseInt(questionId) },
          }
        );

        // Remove the deleted quiz from the state without updating it
        setQuestionsList((previousList) =>
          previousList.filter((item) => item.id !== questionId)
        );
        if (response?.data?.data) {
          console.log(response?.data?.data);
        }
      } else {
        toast.info("fill quiz field");
      }
    } catch (error) {
      console.log("error", error);
    }
    handleCloseDeleteDialog();
  };

  return (
    <section className="questionPage_container">
      <div className="questionPage_title">{topicName}</div>
      <div className="questionPage_body">
        {questionsList.map((item, index) => {
          return (
            <div className="each_question_container" key={index}>
              <div className="questionOnly">
                <div className="questionName">
                  Q{index + 1}:{item.question}
                </div>
                {item.code && (
                  <div className="questionCode">
                    <SyntaxHighlighter
                      language={language.languageName}
                      style={darcula}
                    >
                      {item.code}
                    </SyntaxHighlighter>
                  </div>
                )}

                <ul className="questionOption">
                  {item.option.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </ul>
                <div className="questionsAnswer">
                  <span>Answer: </span>
                  {item.answer}
                </div>
              </div>
              <button
                className="element"
                onClick={() => {
                  setUpdateQuestionPopUp(!updateQuestionPopUp);
                  setUpdateQuestionId(item.id);
                  setUpdateQuestion(item);
                }}
              >
                Edit
              </button>
              {updateQuestionPopUp && (
                <div className="popupOverlay">
                  <UpdateQuestion
                    onClose={() => setUpdateQuestionPopUp(false)}
                    questionId={updateQuestionId}
                    updateQuestion={updateQuestion}
                    topicId={topicId}
                  />
                </div>
              )}

              <button
                className="element"
                onClick={() => handleDeleteConfirmation(item.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
        <div
          className="element plusBtn"
          onClick={() => {
            setAddQuestionPopUp(!addQuestionPopUp);
          }}
        >
          +
        </div>
        {addQuestionPopUp && (
          <div className="popupOverlay">
            <AddQuestion
              onClose={() => setAddQuestionPopUp(false)}
              topicId={topicId}
            />
          </div>
        )}
      </div>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Quiz"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this question ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteQuiz} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}

export default QuestionPage;

{
  /* <div className="each_question_container">
          <div className="questionOnly">
            <div className="questionName">
              Who developed Python Programming Language?
            </div>
            <div className="questionCode">
              <SyntaxHighlighter
                language="java"
                style={darcula}
              ></SyntaxHighlighter>
            </div>
            <ul className="questionOption">
              <li>Wick van Rossum</li>
              <li>Rasmus Lerdorf</li>
              <li>Guido van Rossum</li>
              <li>Niene Stom</li>
            </ul>
            <div className="questionsAnswer">
              <span>Answer: </span>Guido van Rossum{" "}
            </div>
          </div>
          <button className="element">Edit</button>
          <button className="element">Delete</button>
        </div> */
}
