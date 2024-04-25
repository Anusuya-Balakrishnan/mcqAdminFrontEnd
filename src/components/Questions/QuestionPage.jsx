import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./questionStyle.css";
import MyContext from "../../MyContext";
function QuestionPage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [questionsList, setQuestionsList] = useState([]);
  const { topicId } = useParams();
  const { languageName, topicName, setLanguageName, setTopicName } =
    useContext(MyContext);
  console.log(languageName);
  console.log(topicName);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          apiUrl + `questions_list_update/${topicId}/`
        );

        if (response?.data?.data) {
          setQuestionsList(Object.values(response?.data?.data));
        }
      } catch (error) {}
    };

    fetchData(); // Call the async function immediately
  }, [topicId]);
  console.log(questionsList);
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
                    <SyntaxHighlighter language="java" style={darcula}>
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
              <button className="element">Edit</button>
              <button className="element">Delete</button>
            </div>
          );
        })}
      </div>
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
