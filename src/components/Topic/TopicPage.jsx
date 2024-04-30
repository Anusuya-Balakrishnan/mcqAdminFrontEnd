import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./topicStyle.css";
import AddTopic from "./AddTopic/AddTopic";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import UpdateTopic from "./UpdateTopic/UpdateTopic";
import MyContext from "../../MyContext";
function TopicPage(props) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { assignTopicName } = useContext(MyContext);
  const { languageId } = useParams();
  const [topicList, setTopicList] = useState([]);
  const navigate = useNavigate();

  const [updateTopicPopUp, setUpdateTopicPopUp] = useState(false);
  const [addTopicPopUp, setAddTopicPopUp] = useState(false);

  const [updateTopicId, setUpdateTopicId] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          apiUrl + `topic_list_update/${languageId}/`
        );

        if (response?.data?.data) {
          setTopicList(response?.data?.data);
        }
      } catch (error) {}
    };

    fetchData(); // Call the async function immediately
  }, [topicList]);

  // delete dialog box
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteTopicId, setDeleteTopicId] = useState(null);

  // Function to handle deletion confirmation dialog opening
  const handleDeleteConfirmation = (topicId) => {
    setDeleteTopicId(topicId);
    setOpenDeleteDialog(true);
  };

  // Function to handle deletion confirmation dialog closing
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteTopicId(null);
  };

  // Function to handle actual deletion of quiz
  const handleDeleteTopic = async () => {
    // Implement your logic to delete the quiz with deleteTopicId
    // After successful deletion, close the dialog
    console.log("deleteTopicId", deleteTopicId);
    console.log("languageId", languageId);
    try {
      if (deleteTopicId) {
        const response = await axios.delete(
          apiUrl + `topic_list_update/${languageId}/`,
          {
            data: { id: deleteTopicId, languageId: languageId },
          }
        );

        // Remove the deleted quiz from the state without updating it
        setTopicList((prevTopicList) =>
          prevTopicList.filter((topic) => topic.id !== deleteTopicId)
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
    <div className="topicContainer">
      <div className="topicContainer_Title">
        Topic Management: Adding, Updating, and Removing
      </div>
      <div className="totalTopicContainer">
        {topicList.map((item, index) => {
          return (
            <div className="eachTopicContainer" key={index}>
              <div
                className="contentElement element"
                onClick={() => {
                  assignTopicName(item.topicName);
                  navigate(`/questions/${item.id}`);
                }}
              >
                {item.topicName}
              </div>
              <button
                className="element"
                onClick={() => {
                  setUpdateTopicPopUp((prevState) => !prevState);
                  setUpdateTopicId(item.id);
                }}
              >
                Edit
              </button>
              {updateTopicPopUp && (
                <div className="popupOverlay">
                  <UpdateTopic
                    onClose={() => setUpdateTopicPopUp(false)}
                    languageId={languageId}
                    updateTopicId={updateTopicId}
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
            setAddTopicPopUp(!addTopicPopUp);
          }}
        >
          +
        </button>
        {addTopicPopUp && (
          <div className="popupOverlay">
            <AddTopic
              onClose={() => setAddTopicPopUp(false)}
              languageId={languageId}
            />
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
            Are you sure you want to delete this topic ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteTopic} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TopicPage;
