"use client";

import { supabaseClient } from "@/lib/supabase/client.js";
import { useState } from "react";

const CreateQuizPage = () => {
  const supabase = supabaseClient();
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", answers: ["", "", "", ""], correctIndex: 0, points: 0 },
  ]);

  const handleQuestions = (value, field, bigIndex) => {
    const updatedQuestion = questions.map((question, index) => {
      if (index === bigIndex) {
        if (field === "answers") {
          return { ...question, [question.answers[value]]: value };
        } else {
          return { ...question, [field]: value };
        }
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestion);
  };

  const addQuestion = () => {};
  console.log(questions);
  return (
    <div>
      <input
        placeholder="Quiz Title"
        onChange={(event) => setQuizTitle(event.target.value)}
        value={quizTitle}
      />
      <button>create quiz</button>
      {questions.map((question, questionIndex) => {
        return (
          <div key={questionIndex}>
            <input
              placeholder=" question..."
              value={question.question}
              onChange={(event) =>
                handleQuestions(event.target.value, "question", questionIndex)
              }
            />
            <input
              placeholder="point..."
              type="number"
              min={0}
              onChange={(event) =>
                handleQuestions(
                  Number(event.target.value),
                  "points",
                  questionIndex,
                )
              }
            />
            {question.answers.map((answer, answerIndex) => {
              return (
                <div key={answerIndex} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    onChange={(event) =>
                      handleQuestions(
                        answerIndex,
                        "correctIndex",
                        questionIndex,
                      )
                    }
                  />
                  <input
                    placeholder={"answer " + (Number(answerIndex) + 1)}
                    onChange={(event) => {
                      handleQuestions(
                        event.target.value,
                        "answers",
                        answerIndex,
                      );
                    }}
                  />
                </div>
              );
            })}
            <button>Add question</button>
          </div>
        );
      })}
    </div>
  );
};

export default CreateQuizPage;
