import logo from "./logo.svg";
// import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateQuizPage from "./components/Home/UpdateQuiz/UpdateQuizPage";
import HomePage from "./components/Home/HomePage";
import DeleteQuizPage from "./components/Home/DeleteQuiz/DeleteQuizPage";
import AddQuizPage from "./components/Home/AddQuiz/AddQuizPage";
import AddNewLanguage from "./components/Language/AddnewLanguage/AddNewLanguage";
import TopicPage from "./components/Topic/TopicPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/updateQuiz/:mcqId" element={<UpdateQuizPage />} />
          <Route path="/deleteQuiz" element={<DeleteQuizPage />} />
          <Route path="/addQuiz" element={<AddQuizPage />} />
          <Route path="/language/:mcqId" element={<AddNewLanguage />} />
          <Route path="/topic/:languageId" element={<TopicPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
