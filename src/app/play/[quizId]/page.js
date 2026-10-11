"use client";

import { supabaseClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Play = () => {
  const supabase = supabaseClient();
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("quiz_questions")
        .select("*, question_answers(*)")
        .eq("quizId", params.quizId);

      console.log("data", data);
      console.log("error", error);
      if (data) setData(data);
      setLoading(false);
    };
    getData();
  }, [params.quizId]);

  const handleSelect = (questionId, answerId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center space-y-1">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Play Quiz
          </h1>
          <p className="text-sm text-slate-500">
            Answer the questions below to test your knowledge.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-sm text-slate-400">
            Loading questions...
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm text-sm text-slate-400">
            No questions found for this quiz.
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((each, qIndex) => (
              <div
                key={each.id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                    Question {qIndex + 1}
                  </span>
                  {each.point !== undefined && (
                    <span className="text-xs font-semibold text-slate-500">
                      {each.point} {each.point === 1 ? "pt" : "pts"}
                    </span>
                  )}
                </div>

                <h2 className="text-base font-semibold text-slate-900">
                  {each.question}
                </h2>

                <div className="space-y-2 pt-2">
                  {each.question_answers?.map((answer, aIndex) => {
                    const isChecked = selectedAnswers[each.id] === answer.id;
                    return (
                      <label
                        key={answer.id || aIndex}
                        className={`flex items-center gap-3 border p-3 rounded-xl transition-all cursor-pointer ${
                          isChecked
                            ? "bg-indigo-50/60 border-indigo-300"
                            : "bg-slate-50/50 hover:bg-indigo-50/40 border-slate-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${each.id}`}
                          checked={isChecked}
                          onChange={() => handleSelect(each.id, answer.id)}
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                        <span className="text-sm text-slate-800 font-medium">
                          {answer.answer}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all shadow-sm">
          Submit answers
        </button>
      </div>
    </div>
  );
};

export default Play;
