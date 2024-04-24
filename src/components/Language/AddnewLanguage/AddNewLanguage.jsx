import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./addLanguageStyle.css";
import AddLanguage from "./AddLanguage/AddLanguage";
import UpdateLanguage from "../UpdateLanguage/UpdateLanguage";
import { useNavigate } from "react-router-dom";
function AddNewLanguage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { mcqId } = useParams();
  const [languageList, setLanguageList] = useState([]);
  const navigate = useNavigate();

  const [addnewLanugagePopUp, setAddnewLanugagePopUp] = useState(false);
  const [updateLanugagePopUp, setupdateLanugagePopUp] = useState(false);
  const [languageId, setLanguageId] = useState();
  // getting data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          apiUrl + `languages_list_update/${mcqId}/`
        );
        if (response?.data?.languages) {
          setLanguageList(response?.data?.languages);
        }
      } catch (error) {}
    };

    fetchData(); // Call the async function immediately
  }, [addnewLanugagePopUp, languageList]);

  // delete dialog box
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteLanguageId, setDeleteLanguageId] = useState(null);

  // Function to handle deletion confirmation dialog opening
  const handleDeleteConfirmation = (languageId) => {
    setDeleteLanguageId(languageId);
    setOpenDeleteDialog(true);
  };

  // Function to handle deletion confirmation dialog closing
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteLanguageId(null);
  };

  // Function to handle actual deletion of quiz
  const handleDeleteQuiz = async () => {
    // Implement your logic to delete the quiz with deleteQuizId
    // After successful deletion, close the dialog
    try {
      if (deleteLanguageId) {
        const response = await axios.delete(
          apiUrl + `languages_list_update/${mcqId}/`,
          {
            data: { id: parseInt(deleteLanguageId), mcqId: mcqId },
          }
        );

        // Remove the deleted quiz from the state without updating it
        setLanguageList((previousList) =>
          previousList.filter((item) => item.id !== deleteLanguageId)
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
    <div className="languageBox">
      <div className="languagePageTitle">Add New Language</div>
      <div className="languageContainer">
        {languageList.map((item, index) => {
          return (
            <div key={index} className="eachLanguage">
              <p
                className="contentElement element"
                onClick={() => {
                  navigate(`/topic/${item.id}`);
                }}
              >
                {item.languageName}
              </p>
              <button
                className="element"
                onClick={() => {
                  setupdateLanugagePopUp(!addnewLanugagePopUp);
                  setLanguageId(item.id);
                }}
              >
                Edit
              </button>
              {updateLanugagePopUp && (
                <div className="popupOverlay">
                  <UpdateLanguage
                    onClose={() => setupdateLanugagePopUp(false)}
                    mcqId={mcqId}
                    updateLanguageId={languageId}
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
      </div>
      <div
        className="element plusBtn"
        onClick={() => {
          setAddnewLanugagePopUp(!addnewLanugagePopUp);
        }}
      >
        +
      </div>
      {addnewLanugagePopUp && (
        <div className="popupOverlay">
          <AddLanguage
            onClose={() => setAddnewLanugagePopUp(false)}
            mcqId={mcqId}
          />
        </div>
      )}

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
    </div>
  );
}

export default AddNewLanguage;
