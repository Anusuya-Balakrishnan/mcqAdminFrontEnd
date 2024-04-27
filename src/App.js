import logo from "./logo.svg";
// import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateQuizPage from "./components/Home/UpdateQuiz/UpdateQuizPage";
import HomePage from "./components/Home/HomePage";
import DeleteQuizPage from "./components/Home/DeleteQuiz/DeleteQuizPage";
import AddQuizPage from "./components/Home/AddQuiz/AddQuizPage";
import AddNewLanguage from "./components/Language/AddnewLanguage/AddNewLanguage";
import TopicPage from "./components/Topic/TopicPage";
import QuestionPage from "./components/Questions/QuestionPage";
import MyContext from "./MyContext";
import Navbar from "./components/Navbar/Navbar";
function App() {
  const [language, setLanguage] = useState({});
  const [topicName, setTopicName] = useState("");
  const [langId, setLangId] = useState();

  function assignLanguage(value) {
    setLanguage(value);
  }
  function assignTopicName(value) {
    setTopicName(value);
  }

  return (
    <div className="App">
      <Navbar />
      <MyContext.Provider
        value={{
          language,
          topicName,
          assignLanguage,
          assignTopicName,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/updateQuiz/:mcqId" element={<UpdateQuizPage />} />
            <Route path="/deleteQuiz" element={<DeleteQuizPage />} />
            <Route path="/addQuiz" element={<AddQuizPage />} />
            <Route path="/language/:mcqId" element={<AddNewLanguage />} />
            <Route path="/topic/:languageId" element={<TopicPage />} />
            <Route path="/questions/:topicId" element={<QuestionPage />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </div>
  );
}

export default App;
