"use client";

import { supabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const supabase = supabaseClient();
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getQuiz = async () => {
      const { data, error } = await supabase.from("quiz").select("*");
      console.log("data", data);
      console.log("error", error);
      if (data) {
        setQuiz(data);
      }
      setLoading(false);
    };
    getQuiz();
  }, []);

  const PlayInterface = (id) => {
    router.push(`/play/${id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Available Quizzes
          </h1>
          <p className="text-sm text-slate-500">
            Select a quiz to get started or view details.
          </p>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-6 text-sm text-slate-400">
              Loading quizzes...
            </div>
          ) : quiz.length === 0 ? (
            <div className="text-center py-6 text-sm text-slate-400">
              No quizzes found.
            </div>
          ) : (
            quiz.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-1">
                  <h3 className="font-semibold text-slate-900 text-base line-clamp-2">
                    {item.quizTitle}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {item.created_at}
                  </p>
                </div>
                <button
                  onClick={() => PlayInterface(item.id)}
                  className="w-full py-2.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-sm font-medium rounded-xl border border-slate-200 transition-all hover:cursor-pointer"
                >
                  View Quiz
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
