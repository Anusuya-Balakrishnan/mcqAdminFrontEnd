import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import home from "./home.css";
import UpdateQuiz from "./UpdateQuiz/UpdateQuizPage.jsx";
import DeleteQuizPage from "./DeleteQuiz/DeleteQuizPage.jsx";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar.jsx";
import { useNavigate, useParams } from "react-router-dom";
import AddQuizPage from "./AddQuiz/AddQuizPage.jsx";
import UpdateQuizPage from "./UpdateQuiz/UpdateQuizPage.jsx";
function HomePage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [quiz_list, setQuiz_list] = useState([]);
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [addQuizPopUp, setAddQuizPopUp] = useState(false);
  const [updateQuizPopUp, setUpdateQuizPopUp] = useState(false);
  const [mcqId, setMcqId] = useState(0);
  const [updateMcqId, setUpdateMcqId] = useState(0);

  const navigate = useNavigate();
  // Use apiUrl in your code

  // getting data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + "quiz_list/");
        if (response?.data?.data) {
          setQuiz_list(response?.data?.data);
        }
      } catch (error) {}
    };

    fetchData(); // Call the async function immediately
  }, [addQuizPopUp, updateQuizPopUp]);

  // delete dialog box
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteQuizId, setDeleteQuizId] = useState(null);

  // Function to handle deletion confirmation dialog opening
  const handleDeleteConfirmation = (quizId) => {
    setDeleteQuizId(quizId);
    setOpenDeleteDialog(true);
  };

  // Function to handle deletion confirmation dialog closing
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteQuizId(null);
  };

  // Function to handle actual deletion of quiz
  const handleDeleteQuiz = async () => {
    // Implement your logic to delete the quiz with deleteQuizId
    // After successful deletion, close the dialog
    try {
      if (deleteQuizId) {
        const response = await axios.delete(apiUrl + "quiz_update_delete/", {
          data: { mcqId: parseInt(deleteQuizId) },
        });

        // Remove the deleted quiz from the state without updating it
        setQuiz_list((prevQuizList) =>
          prevQuizList.filter((quiz) => quiz.id !== deleteQuizId)
        );
        if (response?.data?.data) {
          console.log(response?.data?.data);
        }
      } else {
        toast.info("fill quiz field");
      }
    } catch (error) {
      console.log("error");
    }
    handleCloseDeleteDialog();
  };

  return (
    <>
      {/* <Navbar /> */}
      <section className="adminHomePage">
        <div className="homePage_title">
          Managing Quizzes: Adding, Updating, and Deleting
        </div>
        <div className="homePage_existing_quiz_list">
          {quiz_list.map((item, index) => {
            return (
              <div key={index} className="homePage_quiz">
                <p
                  className="contentElement element"
                  onClick={() => {
                    console.log(`/language/${item}`);

                    navigate(`/language/${item.id}`);
                  }}
                >
                  {item.mcqName} Quizzes
                </p>
                <button
                  className="element"
                  onClick={() => {
                    setUpdateQuizPopUp((prevState) => !prevState);
                    setUpdateMcqId(item.id);
                  }}
                >
                  Edit
                </button>
                {updateQuizPopUp && (
                  <div className="popupOverlay" key={index}>
                    <UpdateQuizPage
                      key={item.id}
                      onClose={() => setUpdateQuizPopUp(false)}
                      updateMcqId={updateMcqId}
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
          <button
            className="contentElement plusBtn"
            onClick={() => {
              setAddQuizPopUp(!addQuizPopUp);
            }}
          >
            +
          </button>

          {addQuizPopUp && (
            <div className="popupOverlay">
              <AddQuizPage onClose={() => setAddQuizPopUp(false)} />
            </div>
          )}
        </div>

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
              Are you sure you want to delete this quiz ?
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
    </>
  );
}

export default HomePage;
