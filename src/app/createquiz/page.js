"use client";

import { supabaseClient } from "@/lib/supabase/client.js";
import { useState } from "react";

const CreateQuizPage = () => {
  const supabase = supabaseClient();
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", answers: ["", "", "", ""], correctIndex: 0, points: 0 },
    { question: "", answers: ["", "", "", ""], correctIndex: 0, points: 0 },
  ]);

  const saveQuiz = async () => {
    if (
      questions[0] === "" ||
      questions[1] === "" ||
      questions[2] === "" ||
      questions[3] === ""
    ) {
      alert("fill all the inputs");
      return;
    }
    const { data, error } = await supabase
      .from("quiz")
      .insert({ quizTitle: quizTitle })
      .select("*");

    const quizId = data[0].id;

    for (let i = 0; i < questions.length; i++) {
      const { data: quizData, error: quizError } = await supabase
        .from("quiz_questions")
        .insert({
          question: questions[i].question,
          quizId: quizId,
          point: questions[i].points,
        })
        .select("*");

      const questionId = quizData[0].id;

      for (let j = 0; j < questions[i].answers.length; j++) {
        const { data: answerData, error: answerError } = await supabase
          .from("question_answers")
          .insert({
            questionId: questionId,
            answer: questions[i].answers[j],
            isCorrect: questions[i].correctIndex === j,
          });
      }
    }
    alert("success");
  };

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

  const handleAnswers = (questionIndex, answerIndex, value) => {
    const updatedQuestions = questions.map((question, qIndex) => {
      if (qIndex === questionIndex) {
        return {
          ...question,
          answers: question.answers.map((answer, aIndex) => {
            if (aIndex === answerIndex) {
              return value;
            } else {
              return answer;
            }
          }),
        };
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        answers: ["", "", "", ""],
        correctIndex: 0,
        points: 0,
      },
    ]);
  };

  console.log(questions);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <input
            placeholder="Quiz Title"
            onChange={(event) => setQuizTitle(event.target.value)}
            value={quizTitle}
            className="w-full sm:w-auto flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          />
          <button
            onClick={saveQuiz}
            className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all shadow-sm"
          >
            Create Quiz
          </button>
        </div>

        <div className="space-y-6">
          {questions.map((question, questionIndex) => {
            return (
              <div
                key={questionIndex}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                    Question {questionIndex + 1}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <input
                    placeholder="question..."
                    value={question.question}
                    onChange={(event) =>
                      handleQuestions(
                        event.target.value,
                        "question",
                        questionIndex,
                      )
                    }
                    className="sm:col-span-3 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    className="px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  {question.answers.map((answer, answerIndex) => {
                    return (
                      <div
                        key={answerIndex}
                        className="flex items-center gap-3 bg-slate-50/50 border border-slate-200 p-2.5 rounded-xl"
                      >
                        <input
                          type="radio"
                          name={`question-${questionIndex}`}
                          checked={question.correctIndex === answerIndex}
                          onChange={() =>
                            handleQuestions(
                              answerIndex,
                              "correctIndex",
                              questionIndex,
                            )
                          }
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                        <input
                          placeholder={"answer " + (Number(answerIndex) + 1)}
                          onChange={(event) => {
                            handleAnswers(
                              questionIndex,
                              answerIndex,
                              event.target.value,
                            );
                          }}
                          className="w-full bg-transparent text-sm text-slate-800 focus:outline-none"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={addQuestion}
          className="w-full py-3.5 border-2 border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/50 text-slate-600 hover:text-indigo-600 font-medium rounded-2xl transition-all flex items-center justify-center gap-2"
        >
          + Add question
        </button>
      </div>
    </div>
  );
};

export default CreateQuizPage;
